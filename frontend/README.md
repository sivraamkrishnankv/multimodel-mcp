## Multimodel MCP Frontend

Next.js + React dashboard for the `multimodel-mcp` project (weather + file-system MCP servers).

### 1. Prerequisites

- Node.js 18+ and npm
- Python backend (in the project root `multimodel-mcp`) set up and working
  - `server.py` (weather MCP server)
  - `file-system-mcp-server.py` (file-system MCP server)

### 2. Install & Run Frontend

From the `frontend` folder:

```bash
npm install
npm run dev
```

Then open `http://localhost:3000` in your browser.

### 3. Views

- **Chat (`/chat`)**: Simple chat UI that posts to `POST /api/chat` and displays messages in bubbles.
- **Weather (`/weather`)**:
  - Alerts by state → `POST /api/weather/alerts`
  - Forecast by coordinates → `POST /api/weather/forecast`
- **Files (`/files`)**:
  - List directory → `POST /api/fs/list`
  - Read file → `POST /api/fs/read`
  - Write file → `POST /api/fs/write`

### 4. Backend Connectivity

The API routes under `src/app/api/**` are currently **stubbed** with placeholder data and clear `TODO` comments:

- `api/chat`
- `api/weather/alerts`
- `api/weather/forecast`
- `api/fs/list`
- `api/fs/read`
- `api/fs/write`

To fully wire them:

1. Create a small Python HTTP shim in the `multimodel-mcp` root that:
   - Uses `mcp_use.MCPClient.from_config_file("config.json")`
   - Exposes HTTP endpoints like:
     - `POST /weather/alerts` → calls `get_alerts(state)`
     - `POST /weather/forecast` → calls `get_forecast(latitude, longitude)`
     - `POST /fs/list` → calls `list_directory(path)`
     - `POST /fs/read` → calls `read_file(path)`
     - `POST /fs/write` → calls `write_file(path, content, create_dirs)`
2. Point the Next.js API routes to that shim using `fetch("http://localhost:<shim-port>/...")`.
3. Ensure the shim and the MCP servers are running before using the UI.

Once wired, the frontend will act as a thin, typed UI layer over your existing MCP capabilities.

