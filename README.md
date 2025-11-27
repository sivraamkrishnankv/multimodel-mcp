# 🤖 Multimodel MCP - Full-Stack AI Assistant

A comprehensive **full-stack application** featuring **Gemini AI** integration with **Model Context Protocol (MCP)** servers for multimodal interactions. Combines natural language processing with real-time weather data and secure file system operations through both **web interface** and **CLI client**.

## 🌟 Key Highlights

- **🤖 Gemini AI Integration** - Powered by Google's Gemini 2.5 Pro
- **🌤️ Real-time Weather** - National Weather Service API integration
- **📁 Secure File Operations** - Path-validated file system management
- **🌐 Web Interface** - Modern Next.js React application
- **💻 CLI Client** - Direct terminal-based interaction
- **🔄 MCP Protocol** - Industry-standard tool calling architecture
- **⚡ FastAPI Bridge** - HTTP shim connecting web frontend to MCP servers
- **🎨 Modern UI** - Tailwind CSS + TypeScript + React components

## 🏗️ Architecture Overview

### System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                          🌐 Web Frontend                             │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │  Next.js React App (Port 3000)                                │ │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐              │ │
│  │  │  Chat Page  │ │ Weather Page│ │ Files Page │              │ │
│  │  └─────────────┘ └─────────────┘ └─────────────┘              │ │
│  └─────────────────────────────────────────────────────────────────┘ │
└─────────────────────┬───────────────────────────────────────────────┘
                      │ HTTP API Calls (REST)
                      ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        ⚡ HTTP Shim (Port 8003)                      │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │  FastAPI Bridge Application                                   │ │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐              │ │
│  │  │ /api/chat   │ │ /api/weather│ │ /api/fs     │              │ │
│  │  └─────────────┘ └─────────────┘ └─────────────┘              │ │
│  └─────────────────────────────────────────────────────────────────┘ │
└─────────────────────┬───────────────────────────────────────────────┘
                      │ MCP Protocol
           ┌──────────┴──────────┐
           │                     │
           ▼                     ▼
┌─────────────────────┐ ┌─────────────────────┐
│   🌤️ Weather       │ │   📁 File System    │
│   MCP Server        │ │   MCP Server        │
│  (Port 8001)        │ │  (Port 8002)        │
│                     │ │                     │
│  ┌─────────────┐    │ │  ┌─────────────┐    │
│  │ NWS API     │    │ │  │ Local FS    │    │
│  │ weather.gov │    │ │  │ Operations  │    │
│  └─────────────┘    │ │  └─────────────┘    │
└─────────────────────┘ └─────────────────────┘
           │                     │
           └──────────┬──────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        🧠 Gemini AI Agent                           │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │  Natural Language Processing                                  │ │
│  │  Tool Calling & Orchestration                                 │ │
│  │  Multi-step Task Execution                                    │ │
│  └─────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
```

### Data Flow Example

**User Request**: *"Check California weather and save today's forecast to a file"*

```
1. User → Web Frontend (React Component)
2. Frontend → HTTP API (/api/chat)
3. API Route → HTTP Shim (FastAPI)
4. HTTP Shim → Gemini AI Agent (via MCP)
5. Agent → Weather Server (get_alerts)
6. Agent → File Server (write_file)
7. Results → HTTP Shim → Frontend → User
```

### Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | Next.js, React, TypeScript, Tailwind CSS | Modern web interface |
| **API Bridge** | FastAPI, Python | HTTP-to-MCP protocol translation |
| **AI Agent** | Gemini 2.5 Pro, LangChain | Natural language processing & tool orchestration |
| **MCP Servers** | FastMCP, Python | Domain-specific tool implementations |
| **Data Sources** | NWS API, Local Filesystem | External data and file operations |

- [Key Highlights](#-key-highlights)
- [Architecture Overview](#-architecture-overview)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [Usage Guide](#-usage-guide)
- [Web Interface](#-web-interface)
- [CLI Interface](#-cli-interface)
- [API Reference](#-api-reference)
- [Development](#-development)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)

## ✨ Core Features

### 🤖 Advanced AI Integration
- **Gemini 2.5 Pro**: State-of-the-art multimodal language model
- **Natural Language Processing**: Understand complex requests and intent
- **Tool Calling Architecture**: MCP protocol for reliable function execution
- **Conversation Memory**: Context-aware multi-turn conversations
- **Intelligent Planning**: Break down complex tasks into executable steps

### 🌐 Dual Interface Options

#### Web Interface (Recommended)
- **Modern UI**: Next.js 16 + React 19 + TypeScript
- **Responsive Design**: Tailwind CSS styling
- **Real-time Chat**: Streaming responses with loading states
- **Dedicated Pages**: Separate interfaces for chat, weather, and file management
- **API Integration**: RESTful endpoints connecting to MCP backend

#### CLI Interface
- **Terminal Access**: Direct command-line interaction
- **Script Automation**: Easy integration with other tools
- **Background Processing**: Run long-running tasks
- **Debugging Support**: Detailed logging and error reporting

### 🛠️ MCP Server Ecosystem
- **Weather Server**: Real-time NWS API integration (50 states)
- **File System Server**: Secure local file operations with path validation
- **HTTP Shim**: FastAPI bridge connecting web frontend to MCP servers
- **Concurrent Execution**: Multiple servers running simultaneously
- **Protocol Compliance**: Full MCP specification adherence

### 🔒 Security & Reliability
- **Path Security**: File operations blocked from system directories (`/etc`, `/usr`, `C:\Windows`)
- **Input Validation**: All user inputs validated and sanitized
- **Error Boundaries**: Comprehensive error handling and user feedback
- **API Protection**: Rate limiting and quota management
- **Safe Operations**: Controlled access to sensitive resources

### 📊 Rich Data Integration
- **Weather Intelligence**: Official NWS data with alerts, forecasts, and conditions
- **File Metadata**: Complete file information (size, permissions, timestamps)
- **Structured Output**: Consistent JSON responses across all operations
- **Real-time Updates**: Live data from external APIs and local filesystem
- **Cross-Platform**: Works on Windows, macOS, and Linux

## 🔄 System Architecture & Workflow

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    🤖 User Interaction Layer                     │
│  "Check California weather and save today's forecast to file"   │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                🧠 Gemini AI Agent (mcp-use)                     │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  Natural Language Processing                           │    │
│  │  Task Planning & Decomposition                         │    │
│  │  Multi-step Execution Orchestration                    │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────┬───────────────────────────────────────────┘
                      │
           ┌──────────┴──────────┐
           │                     │
           ▼                     ▼
┌─────────────────────┐ ┌─────────────────────┐
│   🌤️ Weather       │ │   📁 File System    │
│   MCP Server        │ │   MCP Server        │
│  (Port 8001)        │ │  (Port 8002)        │
│                     │ │                     │
│  ┌─────────────┐    │ │  ┌─────────────┐    │
│  │ NWS API     │    │ │  │ File Ops    │    │
│  │ weather.gov │    │ │  │ Local FS    │    │
│  └─────────────┘    │ │  └─────────────┘    │
└─────────────────────┘ └─────────────────────┘
           │                     │
           └──────────┬──────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                    📊 Results & Responses                       │
│  "Weather data saved to california_forecast.txt"               │
└─────────────────────────────────────────────────────────────────┘
```

### Workflow Sequence

```
1. User Query → 2. Gemini Processing → 3. Task Planning → 4. MCP Tool Calls
      ↓              ↓                      ↓                      ↓
   "What's the    "I need to:         "First get weather,     "Call get_alerts('CA')
    weather in     1. Query weather     then save to file"     and write_file(...)"
    California?    2. Save results
    Save it to a   to file"
    file"
```

### Data Flow Example

```
User: "Get California weather alerts and save them to alerts.txt"

Gemini AI: Analyzes request → Plans: weather query + file write

MCP Tools Execution:
├── Weather Server: get_alerts("CA") → Returns alert data
└── File Server: write_file("alerts.txt", alert_data) → Saves file

Response: "California weather alerts have been saved to alerts.txt"
```

## 🏗️ Project Structure

```
multimodel-mcp/
├── 🔧 Backend (Python/FastAPI)
│   ├── 🧠 gemini-client.py          # CLI Gemini AI chat interface
│   ├── 🌤️ server.py                 # Weather MCP server (NWS API)
│   ├── 📁 file-system-mcp-server.py # File system MCP server (CRUD ops)
│   ├── 🌐 http_shim.py              # HTTP bridge for web frontend
│   ├── ⚙️ config.json               # MCP server configuration
│   ├── 📋 pyproject.toml            # Python dependencies & config
│   └── 🔒 uv.lock                   # Python dependency lock file
│
├── 🌐 Frontend (Next.js/React)
│   ├── src/app/
│   │   ├── page.tsx                # Home (redirects to chat)
│   │   ├── chat/page.tsx           # Main chat interface
│   │   ├── weather/page.tsx        # Weather dashboard
│   │   ├── files/page.tsx          # File management
│   │   └── api/                    # REST API routes
│   │       ├── chat/route.ts        # Chat endpoint
│   │       ├── weather/             # Weather API routes
│   │       └── fs/                  # File system API routes
│   ├── package.json                # Node.js dependencies
│   ├── tailwind.config.*           # CSS framework config
│   └── tsconfig.json               # TypeScript configuration
│
└── 📚 Configuration & Docs
    ├── 📖 README.md                 # This documentation
    ├── 🔐 .env.example              # Environment variables template
    ├── 🎯 .gitignore                # Git ignore rules
    ├── 🐍 .python-version          # Python version specification
    └── 📄 LICENSE                   # Project license
```

### Component Architecture

| Component | Purpose | Technology Stack | Port |
|-----------|---------|------------------|------|
| **Gemini CLI Client** | Direct terminal AI chat | Python + mcp-use + Gemini | - |
| **Weather MCP Server** | Weather data & alerts | FastMCP + NWS API | 8001 |
| **File System MCP Server** | Secure file operations | FastMCP + pathlib | 8002 |
| **HTTP Shim** | Web API bridge | FastAPI + MCP integration | 8003 |
| **Web Frontend** | User interface | Next.js + React + TypeScript | 3000 |
| **MCP Configuration** | Server orchestration | JSON + MCP protocol | - |

## 🚀 Installation

### Prerequisites
- **Python 3.11+** with **uv package manager**
- **Node.js 18+** with **npm/yarn**
- **Google AI API Key** ([Get one here](https://makersuite.google.com/app/apikey))

### Backend Setup (Python/FastAPI)
```bash
# Install uv (if not already installed)
curl -LsSf https://astral.sh/uv/install.sh | sh

# Clone and enter project
git clone <your-repo-url>
cd multimodel-mcp

# Install Python dependencies
uv sync

# Setup environment variables
cp .env.example .env
# Edit .env and add: GOOGLE_API_KEY=your_actual_api_key_here
```

### Frontend Setup (Next.js/React)
```bash
# Navigate to frontend directory
cd frontend

# Install Node.js dependencies
npm install
# or
yarn install
```

## 🚀 Quick Start

### Option 1: Web Interface (Recommended)
```bash
# Terminal 1: Start the backend HTTP shim
uv run python http_shim.py

# Terminal 2: Start the frontend
cd frontend && npm run dev

# Open http://localhost:3000 in your browser
```

### Option 2: CLI Interface
```bash
# Start the CLI client directly
uv run python gemini-client.py
```

### Try These Multimodal Examples
```
🌤️ Weather Operations:
"What weather alerts are there for California?"
"Get the 5-day forecast for New York City"

📁 File Operations:
"List all files in the current directory"
"Read the README.md file and summarize it"
"Create a new file called notes.txt with meeting notes"

🔄 Combined Operations:
"Check California weather and save the results to weather_report.txt"
"Read all Python files and check for TODO comments"
"Create a weather summary for Seattle and store it in reports/"
```

### Available Commands (CLI)
- `help` - Show available operations and examples
- `clear` - Clear conversation history
- `exit` or `quit` - End session

## 🌐 Web Interface

### Starting the Web Application
```bash
# Terminal 1: Start HTTP shim (backend API)
uv run python http_shim.py

# Terminal 2: Start Next.js frontend
cd frontend && npm run dev
```

### Available Pages

#### Chat Page (`/chat`) - Main Interface
- **Real-time AI chat** with Gemini 2.5 Pro
- **Message history** with persistent conversations
- **Loading states** and error handling
- **Responsive design** for all screen sizes

#### Weather Page (`/weather`) - Weather Dashboard
- **Interactive weather queries** via REST API
- **Real-time data** from NWS API
- **State selection** and location-based forecasts
- **Alert monitoring** and forecast visualization

#### Files Page (`/files`) - File Management
- **Directory browsing** with security validation
- **File operations** (read, write, delete)
- **Metadata display** (size, permissions, dates)
- **Safe operations** with path restrictions

### API Endpoints
- `GET/POST /api/chat` - AI conversation interface
- `GET/POST /api/weather/alerts` - Weather alerts by state
- `GET/POST /api/weather/forecast` - Location-based forecasts
- `GET/POST /api/fs/list` - Directory listing
- `GET/POST /api/fs/read` - File reading
- `GET/POST /api/fs/write` - File writing

## 💻 CLI Interface

### Direct Terminal Access
```bash
# Start interactive CLI session
uv run python gemini-client.py
```

### CLI Features
- **Persistent sessions** with conversation memory
- **Background processing** for long-running tasks
- **Detailed logging** for debugging
- **Script integration** capabilities
- **No web browser required**

### CLI Commands
```
help     - Display available operations and examples
clear    - Reset conversation history
exit     - End the session gracefully
quit     - Same as exit
```

## 💡 Example Conversations

### Weather & File Operations Combined
```
You: "What's the weather like in Florida and save today's forecast to a file"

Assistant: I'll check the weather in Florida and save the forecast to a file.

[Gets Florida weather alerts and forecast]
[Creates and writes to florida_weather.txt]

Weather information has been saved to florida_weather.txt
```

### Complex Multi-Step Tasks
```
You: "Read the project README, understand what this does, then create a summary file"

Assistant: I'll read the README file, analyze the project, and create a summary.

[Reads README.md]
[Analyzes content]
[Creates project_summary.txt with key points]

Project summary has been created in project_summary.txt
```

## 🎯 Multimodal AI Capabilities

### How Gemini AI Powers Multimodal Interactions

The system uses **Google's Gemini 2.5 Pro** AI model integrated via the **mcp-use** library to provide intelligent orchestration between weather data and file system operations. Gemini doesn't just execute commands - it understands context, plans multi-step operations, and provides natural responses.

### 🌤️ Weather Intelligence Examples

#### Basic Weather Queries
```
"Show me weather alerts for California"
"Get the 5-day forecast for New York City"
"What's the weather like in Miami right now?"
"Are there any severe weather warnings in Texas?"
```

#### Advanced Weather Analysis
```
"Compare weather between San Francisco and Seattle"
"Find the best day for outdoor activities in Denver this week"
"Summarize all active weather alerts across the US"
```

### 📁 File System Operations

#### File Management
```
"Read the contents of README.md"
"Show me all Python files in this directory"
"Create a backup directory and copy all .py files there"
"Find the largest file in the current directory"
```

#### Content Operations
```
"Create a new file called 'notes.txt' with today's date and meeting notes"
"Read the project configuration and show me the dependencies"
"Search for all files containing the word 'weather'"
"Generate a summary of all text files in the docs folder"
```

### 🔄 Cross-Domain Workflows

#### Weather + File Operations
```
"Check California weather and save the results to california_weather.txt"
"Get today's forecast for Seattle and append it to my weather_log.txt"
"Monitor weather alerts and create a daily report file"
```

#### Data Analysis Tasks
```
"Read the weather data file, analyze trends, and create a summary report"
"Compare weather patterns from multiple cities and save analysis to file"
"Collect weather data for a week and generate statistical reports"
```

#### Project Management
```
"Review all project files, check for TODOs, and create a task summary"
"Analyze code files, check weather API usage, and document findings"
"Create documentation for the weather and file system APIs"
```

### 🧠 AI-Powered Features

#### Natural Language Understanding
- **Context Awareness**: Understands "today's weather" vs "this week's forecast"
- **Location Intelligence**: Recognizes city names, coordinates, and state codes
- **File Type Recognition**: Knows how to handle different file formats

#### Intelligent Task Planning
- **Multi-Step Operations**: Breaks complex requests into sequential actions
- **Error Recovery**: Handles API failures and file permission issues gracefully
- **Data Validation**: Ensures weather data accuracy and file operation safety

#### Memory & Continuity
- **Conversation History**: Remembers previous interactions within a session
- **Context Preservation**: Maintains state across related operations
- **Progressive Refinement**: Learns from user feedback to improve responses

## 📖 Usage Guide

### 🎯 Primary Interface: Multimodal Gemini Chat

The main way to interact with the system is through the **Gemini AI chat client**, which provides a natural language interface to both weather and file system capabilities.

#### Starting the Chat Interface
```bash
uv run python gemini-client.py
```

#### Interactive Commands
- **`help`** - Display available operations and examples
- **`clear`** - Reset conversation history
- **`exit`** or **`quit`** - End the session

### 🛠️ Individual MCP Servers

While the primary interface is the multimodal chat, you can also run individual servers for specific use cases:

#### Weather MCP Server (`server.py`)
**Purpose**: Dedicated weather data server using National Weather Service API.

**Available Tools:**
- `get_alerts(state)` - Get weather alerts for US states
- `get_forecast(lat, lon)` - Get 5-day weather forecast

```bash
# Start weather server
uv run python server.py

# Test with MCP inspector
uv run mcp-inspector python server.py
```

#### File System MCP Server (`file-system-mcp-server.py`)
**Purpose**: Dedicated file system operations server with security controls.

**Available Tools:**
- `read_file(path)` - Read text file contents
- `write_file(path, content)` - Write content to files
- `list_directory(path)` - List directory contents
- `create_directory(path)` - Create new directories
- `delete_file(path)` - Delete files safely
- `get_file_info(path)` - Get detailed file metadata

```bash
# Start file system server
uv run python file-system-mcp-server.py

# Test with MCP inspector
uv run mcp-inspector python file-system-mcp-server.py
```

### 🔧 Configuration (`config.json`)

The system uses a JSON configuration file to orchestrate multiple MCP servers:

```json
{
  "mcpServers": {
    "weather": {
      "command": "uv",
      "args": ["run", "--with", "mcp[cli]", "mcp", "run", "E:\\MCP\\multimodel-mcp\\server.py"]
    },
    "filesystem": {
      "command": "uv",
      "args": ["run", "--with", "mcp[cli]", "mcp", "run", "E:\\MCP\\multimodel-mcp\\file-system-mcp-server.py"]
    }
  }
}
```

This configuration enables the Gemini AI agent to simultaneously access both servers through the mcp-use library.

## 🔌 Integration Examples

### Cursor IDE Integration
Add to your Cursor MCP configuration:
```json
{
  "mcpServers": {
    "multimodal": {
      "command": "uv",
      "args": ["run", "--project", "E:\\MCP\\multimodel-mcp", "python", "gemini-client.py"],
      "cwd": "E:\\MCP\\multimodel-mcp"
    }
  }
}
```

### Claude Desktop Integration
Add to your `claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "multimodal": {
      "command": "uv",
      "args": ["run", "python", "gemini-client.py"],
      "cwd": "path/to/multimodel-mcp"
    }
  }
}
```

#### Running with SSE Transport (Default)
```bash
cd mcpserver
uv run python server.py
# Server starts on http://localhost:8001
```

#### Running with Stdio Transport
```python
# Edit server.py line 100:
transport = "stdio"  # Change from "sse"

# Then run:
uv run python server.py
```

#### Available Tools
- **`get_alerts(state: str)`**: Weather alerts (same as basic server)
- **`get_forecast(latitude: float, longitude: float)`**: 5-day weather forecast

#### Example Usage
```python
# Weather alerts
get_alerts("FL")

# Location forecast (Miami, FL coordinates)
get_forecast(25.7617, -80.1918)
```


## 🔌 Integration Examples

### Cursor IDE Integration

1. **Locate MCP Configuration**:
   - Windows: `%APPDATA%\Cursor\User\globalStorage\cursor.mcp.json`
   - macOS: `~/Library/Application Support/Cursor/User/globalStorage/cursor.mcp.json`
   - Linux: `~/.config/Cursor/User/globalStorage/cursor.mcp.json`

2. **Add Weather Server Configuration**:
   ```json
   {
     "mcpServers": {
       "weather": {
         "command": "uv",
         "args": ["run", "python", "server/weather.py"],
         "cwd": "E:\\MCP\\weather-retriever-mcp"
       }
     }
   }
   ```

3. **Restart Cursor** and use Agent Mode:
   ```
   "Get weather alerts for California"
   "What are the current warnings in Texas?"
   "Are there any active alerts in Florida?"
   ```

### Claude Desktop Integration

Add to your `claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "weather": {
      "command": "uv",
      "args": ["run", "--project", "E:\\MCP\\weather-retriever-mcp", "python", "server/weather.py"]
    }
  }
}
```

### Other MCP Clients

The server works with any MCP-compatible client by configuring it to run:
```bash
uv run python server/weather.py
```

## 🧪 Development & Testing

### Running Tests

#### 1. Test Stdio Transport
```bash
cd mcpserver
uv run python client-stdio.py
```

#### 2. Test SSE Transport
```bash
# Terminal 1: Start server
cd mcpserver
uv run python server.py

# Terminal 2: Run client
cd mcpserver
uv run python client-sse.py
```

#### 3. Test MCP Inspector
```bash
uv run mcp-inspector python server/weather.py
```

### Development Workflow

#### Adding New Weather Tools
1. Edit `server/weather.py` or `mcpserver/server.py`
2. Add new `@mcp.tool()` decorated functions
3. Test with MCP inspector
4. Update client configurations if needed

#### Modifying AI Client
1. Edit `server/client.py`
2. Change LLM model or parameters
3. Update environment variables
4. Test interactive functionality

## 🔧 API Reference

### REST API Endpoints (Web Interface)

#### Chat API
```
POST /api/chat
```
**Purpose**: Send messages to Gemini AI for multimodal processing
**Request**:
```json
{
  "message": "What weather alerts are there for California?",
  "history": [
    {"role": "user", "content": "Hello"},
    {"role": "assistant", "content": "Hi there!"}
  ]
}
```
**Response**:
```json
{"reply": "There are currently no active weather alerts for California..."}
```

#### Weather APIs
```
GET/POST /api/weather/alerts
POST /api/weather/forecast
```
**Weather Alerts**:
```json
{
  "state": "CA",
  "alerts": [
    {
      "event": "Special Weather Statement",
      "area": "Mountain Areas",
      "severity": "Minor",
      "description": "Gusty winds expected..."
    }
  ]
}
```

**Weather Forecast**:
```json
{
  "latitude": 37.7749,
  "longitude": -122.4194,
  "forecast": [
    {
      "period": "Today",
      "temperature": "68°F",
      "wind": "5 mph W",
      "conditions": "Sunny"
    }
  ]
}
```

#### File System APIs
```
GET/POST /api/fs/list
GET/POST /api/fs/read
POST /api/fs/write
```
**Directory Listing**:
```json
{
  "path": ".",
  "contents": [
    {"name": "README.md", "type": "file", "size": 2048},
    {"name": "src", "type": "directory", "size": 0}
  ]
}
```

**File Read/Write**:
```json
{
  "path": "notes.txt",
  "content": "Meeting notes content...",
  "success": true
}
```

### MCP Tool Reference

#### Weather MCP Server Tools
- **`get_alerts(state: str)`** - Get active weather alerts for US states
- **`get_forecast(latitude: float, longitude: float)`** - Get 5-day weather forecast

#### File System MCP Server Tools
- **`read_file(file_path: str)`** - Read text file contents
- **`write_file(file_path: str, content: str, create_dirs: bool)`** - Write content to files
- **`list_directory(dir_path: str, show_hidden: bool)`** - List directory contents
- **`create_directory(dir_path: str, create_parents: bool)`** - Create directories
- **`delete_file(file_path: str)`** - Delete files safely
- **`get_file_info(file_path: str)`** - Get detailed file metadata

### Configuration Files

#### MCP Server Configuration (`config.json`)
```json
{
  "mcpServers": {
    "weather": {
      "command": "uv",
      "args": ["run", "--with", "mcp[cli]", "mcp", "run", "server.py"]
    },
    "filesystem": {
      "command": "uv",
      "args": ["run", "--with", "mcp[cli]", "mcp", "run", "file-system-mcp-server.py"]
    }
  }
}
```

#### Environment Variables (`.env`)
```bash
GOOGLE_API_KEY=your_actual_google_ai_api_key_here
```

## 🛠️ Development

### Development Setup

#### Backend Development
```bash
# Install Python dependencies
uv sync

# Run individual MCP servers for testing
uv run python server.py                    # Weather server (port 8001)
uv run python file-system-mcp-server.py    # File server (port 8002)

# Run HTTP shim for web integration
uv run python http_shim.py                 # API bridge (port 8003)

# Test CLI client
uv run python gemini-client.py
```

#### Frontend Development
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev                                # Next.js dev server (port 3000)

# Build for production
npm run build
npm start                                  # Production server
```

### Project Structure Details

#### Backend Components
- **`server.py`**: FastMCP weather server with NWS API integration
- **`file-system-mcp-server.py`**: Secure file operations with path validation
- **`http_shim.py`**: FastAPI bridge connecting MCP servers to web frontend
- **`gemini-client.py`**: CLI interface using mcp-use library
- **`config.json`**: MCP server orchestration configuration

#### Frontend Components
- **`frontend/`**: Complete Next.js 16 + React 19 application
- **API Routes**: REST endpoints connecting to HTTP shim
- **Pages**: Chat, weather dashboard, and file management interfaces
- **Components**: Reusable UI components with TypeScript

### Adding New Features

#### New Weather Features
```python
# In server.py, add new MCP tool
@mcp.tool()
async def get_weather_history(state: str, days: int) -> str:
    """Get historical weather data."""
    # Implementation here
    pass
```

#### New File Operations
```python
# In file-system-mcp-server.py
@mcp.tool()
async def search_files(directory: str, pattern: str) -> str:
    """Search for files matching a pattern."""
    # Implementation here
    pass
```

#### New Web Pages
```typescript
// In frontend/src/app/new-feature/page.tsx
export default function NewFeaturePage() {
  // Implementation here
}
```

### Testing

#### Backend Testing
```bash
# Test MCP servers individually
uv run mcp-inspector python server.py
uv run mcp-inspector python file-system-mcp-server.py

# Test HTTP shim API
curl http://localhost:8003/docs  # FastAPI docs
```

#### Frontend Testing
```bash
cd frontend
npm run lint    # ESLint checking
npm run build   # Build verification
```

## 🐛 Troubleshooting

### Common Issues & Solutions

#### ❌ "API key not valid" Error
**Problem**: Gemini AI authentication failed
**Solution**:
```bash
# Get API key from https://makersuite.google.com/app/apikey
# Update .env file:
GOOGLE_API_KEY=your_actual_api_key_here
```

#### ❌ "Connection refused" / "Server not running"
**Problem**: Backend services not accessible
**Solution**:
```bash
# Start required services:
uv run python http_shim.py          # For web interface
# OR
uv run python gemini-client.py      # For CLI interface
```

#### ❌ "Module not found" Errors
**Problem**: Python dependencies missing
**Solution**:
```bash
uv sync  # Install/update all Python dependencies
```

#### ❌ Frontend Build Errors
**Problem**: Node.js dependencies or TypeScript issues
**Solution**:
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install  # Fresh installation
```

#### ❌ File Permission Errors
**Problem**: File system operations blocked
**Solution**: Server automatically restricts access to:
- System directories (`/etc`, `/usr`, `C:\Windows`)
- Sensitive paths and protected files
- Use relative paths within project directory

#### ❌ Weather API Errors
**Problem**: NWS API connectivity issues
**Solution**:
- Verify internet connection
- Check valid state codes (CA, NY, TX, FL, etc.)
- NWS API may have temporary outages

### 🔍 Debug Commands

```bash
# Backend diagnostics
uv run python -c "import server; print('Weather server: OK')"
uv run python -c "import http_shim; print('HTTP shim: OK')"
uv run python -c "from mcp_use import MCPClient; print('MCP client: OK')"

# Frontend diagnostics
cd frontend && npm run lint  # Check for errors
cd frontend && npm run build  # Test build process

# Network diagnostics
netstat -an | findstr "3000\|8001\|8002\|8003"  # Check port availability
curl http://localhost:8003/health  # Test HTTP shim
```

### 📊 Performance & Limits

- **Gemini API**: Free tier ~50 requests/minute, paid tiers higher
- **Weather API**: Real-time NWS data, occasional delays
- **File Operations**: Local filesystem, instant responses
- **Memory Usage**: ~100-200MB per running service
- **Concurrent Users**: Web interface supports multiple sessions

## 🤝 Contributing

### Getting Started
```bash
git clone <your-repo-url>
cd multimodel-mcp

# Backend setup
uv sync
cp .env.example .env  # Add your GOOGLE_API_KEY

# Frontend setup
cd frontend && npm install
```

### Development Workflow

#### Backend Contributions
1. **MCP Server Extensions**: Add new tools to `server.py` or `file-system-mcp-server.py`
2. **API Enhancements**: Extend `http_shim.py` with new endpoints
3. **CLI Improvements**: Enhance `gemini-client.py` features

#### Frontend Contributions
1. **UI Components**: Add new pages in `frontend/src/app/`
2. **API Integration**: Create new API routes for backend features
3. **UX Improvements**: Enhance user experience and responsiveness

#### Example: Adding a New Weather Feature
```python
# In server.py
@mcp.tool()
async def get_weather_trends(state: str, days: int = 7) -> str:
    """Analyze weather trends for the past N days."""
    # Implementation here
    return f"Weather trends for {state} over {days} days..."
```

#### Example: Adding a New File Operation
```python
# In file-system-mcp-server.py
@mcp.tool()
async def find_files_by_content(directory: str, search_text: str) -> str:
    """Find files containing specific text."""
    # Implementation with security validation
    return f"Files containing '{search_text}' in {directory}..."
```

### Testing Your Changes

#### Backend Testing
```bash
# Test MCP servers
uv run mcp-inspector python server.py
uv run mcp-inspector python file-system-mcp-server.py

# Test HTTP shim
uv run python http_shim.py
curl http://localhost:8003/docs
```

#### Frontend Testing
```bash
cd frontend
npm run lint
npm run build
npm run dev
```

### Code Guidelines

#### Python (Backend)
- **Type Hints**: Use full type annotations
- **Docstrings**: Comprehensive function documentation
- **Error Handling**: Proper exception management
- **Security**: Input validation and path security
- **Async/Await**: Use async patterns for I/O operations

#### TypeScript (Frontend)
- **Type Safety**: Strict TypeScript usage
- **Component Structure**: Reusable, well-structured components
- **Error Boundaries**: Proper error handling in React
- **API Integration**: Consistent API call patterns
- **Styling**: Tailwind CSS best practices

### Submitting Changes

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Areas for Contribution

- **🌤️ Weather Features**: Historical data, weather maps, severe weather tracking
- **📁 File Operations**: Search, compression, batch operations, file analysis
- **🤖 AI Enhancements**: Custom prompts, specialized workflows, multi-language support
- **🎨 UI/UX**: Better interfaces, mobile responsiveness, accessibility
- **📊 Analytics**: Usage tracking, performance monitoring, error reporting
- **🔒 Security**: Enhanced validation, audit logging, permission systems

## 📄 License

**MIT License** - See [LICENSE](LICENSE) file for full details.

This project is open source and available under the MIT License, allowing free use, modification, and distribution with proper attribution.

## 🙏 Acknowledgments

### Core Technologies
- **Google AI** - Gemini 2.5 Pro multimodal language model
- **National Weather Service** - Official weather.gov API
- **Model Context Protocol** - Industry-standard AI tool integration
- **FastMCP** - Lightweight MCP server framework
- **mcp-use** - Python MCP client library

### Web Technologies
- **Next.js 16** - React framework with App Router
- **React 19** - UI component library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **FastAPI** - Modern Python web framework

### Development Tools
- **uv** - Fast Python package manager
- **ESLint** - JavaScript/TypeScript linting
- **Prettier** - Code formatting

---

**Built with ❤️ for seamless human-AI collaboration**

*Have questions? Found a bug? Want to contribute? [Open an issue](https://github.com/your-repo/issues) or [start a discussion](https://github.com/your-repo/discussions)!*

---

**⭐ Star this repo if you find it useful!**