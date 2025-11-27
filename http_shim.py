"""
HTTP shim for the multimodel-mcp project.

This small FastAPI app exposes simple HTTP endpoints that internally call
the existing weather and file-system logic so the Next.js frontend can
talk to them over HTTP.

Run with:
    uv run python http_shim.py

The app listens on http://localhost:8003 by default.
"""

from __future__ import annotations

from pathlib import Path
from typing import Literal, Optional
import importlib.util
import sys

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

from server import get_alerts, get_forecast
from dotenv import load_dotenv
import os
from langchain_google_genai import ChatGoogleGenerativeAI
from mcp_use import MCPAgent, MCPClient

# Load the file-system MCP server module from its filename with a hyphen.
_fs_path = Path(__file__).with_name("file-system-mcp-server.py")
_fs_spec = importlib.util.spec_from_file_location("file_system_mcp_server", _fs_path)
if _fs_spec is None or _fs_spec.loader is None:
    raise RuntimeError(f"Unable to load file-system MCP server from {_fs_path}")
_fs_module = importlib.util.module_from_spec(_fs_spec)
sys.modules["file_system_mcp_server"] = _fs_module
_fs_spec.loader.exec_module(_fs_module)

validate_path = _fs_module.validate_path
fs_read_file = _fs_module.read_file
fs_write_file = _fs_module.write_file


app = FastAPI(title="Multimodel MCP HTTP Shim")

# Global Gemini + MCP agent reused across requests
_agent: Optional[MCPAgent] = None


@app.on_event("startup")
async def startup_event() -> None:
  """
  Initialize the Gemini + MCPAgent stack once when the HTTP shim starts.
  This uses the same configuration as gemini-client.py but exposes it over HTTP.
  """
  global _agent

  load_dotenv() 
  api_key = os.getenv("GOOGLE_API_KEY")
  if not api_key:
    # Fail fast so it's obvious in the shim logs.
    raise RuntimeError(
      "GOOGLE_API_KEY is not set. Create a .env file with GOOGLE_API_KEY=your_key."
    )

  config_file = "./config.json"
  client = MCPClient.from_config_file(config_file)
  llm = ChatGoogleGenerativeAI(model="gemini-2.5-pro")

  _agent = MCPAgent(
    llm=llm,
    client=client,
    max_steps=15,
    memory_enabled=True,
  )


class AlertsRequest(BaseModel):
  state: str


class ForecastRequest(BaseModel):
  latitude: float
  longitude: float


class ListRequest(BaseModel):
  path: str = "."


class DirectoryEntry(BaseModel):
  name: str
  type: Literal["file", "directory"]
  size: int


class ReadRequest(BaseModel):
  path: str


class WriteRequest(BaseModel):
  path: str
  content: str
  createDirs: bool | None = False


class ChatRequest(BaseModel):
  message: str
  reset: bool | None = False


@app.post("/chat")
async def chat(req: ChatRequest):
  """
  Chat endpoint backed by Gemini + MCPAgent.

  - If reset=True, clears the conversation history before handling the message.
  - The agent decides when/how to call MCP tools based on the natural-language prompt.
  """
  if _agent is None:
    raise HTTPException(status_code=500, detail="MCP agent not initialized.")

  if req.reset:
    _agent.clear_conversation_history()

  try:
    reply = await _agent.run(req.message)
  except Exception as exc:  # pragma: no cover - defensive logging
    raise HTTPException(status_code=500, detail=f"Agent error: {exc}") from exc

  return {"reply": str(reply)}


@app.post("/weather/alerts")
async def weather_alerts(req: AlertsRequest):
  """Call the weather get_alerts(state) tool and return its raw string."""
  state = req.state.strip().upper()
  if len(state) != 2:
    raise HTTPException(status_code=400, detail="state must be a 2-letter US code, e.g. CA")

  result = await get_alerts(state)
  return {"raw": result}


@app.post("/weather/forecast")
async def weather_forecast(req: ForecastRequest):
  """Call the weather get_forecast(latitude, longitude) tool."""
  result = await get_forecast(req.latitude, req.longitude)
  return {"raw": result}


@app.post("/fs/list")
async def fs_list(req: ListRequest):
  """
  List directory contents using the same validation rules as the
  file-system MCP server, but return structured JSON suitable for the
  frontend table UI.
  """
  try:
    path = validate_path(req.path)
  except ValueError as e:
    raise HTTPException(status_code=400, detail=str(e))

  if not path.exists():
    raise HTTPException(status_code=404, detail=f"Directory '{req.path}' does not exist")
  if not path.is_dir():
    raise HTTPException(status_code=400, detail=f"'{req.path}' is not a directory")

  entries: list[DirectoryEntry] = []
  for item in path.iterdir():
    # Mimic original behavior: hide dotfiles by default
    if item.name.startswith("."):
      continue
    item_type: Literal["file", "directory"] = "directory" if item.is_dir() else "file"
    size = item.stat().st_size if item.is_file() else 0
    entries.append(
      DirectoryEntry(
        name=item.name,
        type=item_type,
        size=size,
      )
    )

  # Directories first, then alphabetical
  entries.sort(key=lambda x: (x.type != "directory", x.name.lower()))
  return {"entries": entries}


@app.post("/fs/read")
async def fs_read(req: ReadRequest):
  """Call the file-system read_file(path) tool and return its message."""
  # The underlying tool returns a human-friendly string. We pass it through.
  result = await fs_read_file(req.path)
  return {"content": result}


@app.post("/fs/write")
async def fs_write(req: WriteRequest):
  """Call the file-system write_file(path, content, create_dirs)."""
  create_dirs = bool(req.createDirs)
  result = await fs_write_file(req.path, req.content, create_dirs)
  return {"message": result}


if __name__ == "__main__":
  import uvicorn

  uvicorn.run(app, host="127.0.0.1", port=8003)


