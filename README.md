# 🤖 Multimodel MCP - AI-Powered Weather & File System Operations

A comprehensive **Model Context Protocol (MCP)** implementation that enables **Gemini AI** to interact with both **weather data** and **file systems** through natural language conversations. This project creates a multimodal AI assistant capable of retrieving weather information, managing files, and performing complex tasks across multiple domains simultaneously.

## 📋 Table of Contents

- [Features](#-features)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [Usage Guide](#-usage-guide)
- [API Reference](#-api-reference)
- [Integration Examples](#-integration-examples)
- [Development & Testing](#-development--testing)
- [Docker Deployment](#-docker-deployment)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)

## ✨ Key Features

### 🤖 Multimodal AI Capabilities
- **Natural Language Interface**: Ask Gemini AI questions like *"What's the weather in California and create a summary file"*
- **Cross-Domain Operations**: Seamlessly combine weather queries with file operations in single conversations
- **Contextual Memory**: AI remembers conversation history for coherent multi-step tasks
- **Intelligent Task Planning**: Gemini can break down complex requests into sequential operations

### 🛠️ MCP Server Ecosystem
- **Weather Server**: Real-time weather alerts and 5-day forecasts from National Weather Service
- **File System Server**: Complete file and directory management with security controls
- **Dual Transport Support**: Both Stdio and Server-Sent Events (SSE) protocols
- **Concurrent Operation**: Both servers run simultaneously, accessible to AI agent

### 🔒 Enterprise-Ready Security
- **Path Validation**: File system operations restricted from system directories
- **Safe Operations**: Read-only access to sensitive areas, controlled write permissions
- **Error Handling**: Comprehensive error management with user-friendly messages
- **API Rate Limiting**: Built-in protection against API abuse

### 📊 Data Integration
- **Official Weather Data**: Direct connection to weather.gov API with 50-state coverage
- **File Metadata**: Detailed file information including size, permissions, timestamps
- **Structured Responses**: Consistent JSON-formatted data across all operations
- **Real-time Updates**: Live weather data with current conditions and forecasts

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
├── 🧠 gemini-client.py          # Main Gemini AI chat interface
├── 🌤️ server.py                 # Weather MCP server (NWS API integration)
├── 📁 file-system-mcp-server.py # File system MCP server (CRUD operations)
├── ⚙️ config.json               # MCP server configuration for mcp-use
├── 📋 pyproject.toml            # Project configuration & dependencies
├── 🔒 uv.lock                   # Dependency lock file
├── 📖 README.md                 # This documentation
├── 🔐 .env.example              # Environment variables template
├── 🎯 .gitignore                # Git ignore rules
└── 🐍 .python-version          # Python version specification
```

### Core Components

| Component | Purpose | Technology |
|-----------|---------|------------|
| **Gemini Client** | Natural language AI interface | mcp-use + LangChain + Gemini AI |
| **Weather Server** | Weather data & alerts | FastMCP + NWS API |
| **File System Server** | File operations | FastMCP + pathlib |
| **Configuration** | Server orchestration | JSON config + MCP protocol |

## 🚀 Installation

### Prerequisites

- **Python 3.11 or higher** (3.11 recommended)
- **[uv](https://github.com/astral-sh/uv)** package manager (recommended)
- **Google AI API key** (for Gemini AI multimodal interactions)

### Step-by-Step Installation

#### 1. Clone and Navigate
```bash
git clone <repository-url>
cd weather-retriever-mcp
```

#### 2. Install with uv (Recommended)
```bash
# Install uv if not already installed
curl -LsSf https://astral.sh/uv/install.sh | sh

# Sync dependencies
uv sync
```

#### 3. Alternative: Install with pip
```bash
pip install -e .
```

#### 4. Environment Setup
```bash
# Copy environment template
cp .env.example .env

# Edit .env and add your Google AI API key
echo "GOOGLE_API_KEY=your_google_api_key_here" > .env
```

## 🚀 Quick Start

### Prerequisites
- **Python 3.11+**
- **Google AI API Key** ([Get one here](https://makersuite.google.com/app/apikey))
- **uv package manager** ([Install here](https://github.com/astral-sh/uv))

### 1. Setup Environment
```bash
# Clone and enter project
git clone <your-repo-url>
cd multimodel-mcp

# Install dependencies
uv sync

# Setup API key
cp .env.example .env
# Edit .env and add your actual Google AI API key
```

### 2. Start Multimodal AI Chat
```bash
uv run python gemini-client.py
```

### 3. Try These Examples
```
You: What weather alerts are there for California?
You: List all files in the current directory
You: Read the README.md file and summarize it
You: Check Texas weather and save the results to weather_report.txt
You: Create a new directory called 'notes' and add a file with meeting notes
```

### 4. Available Commands
- `help` - Show available operations
- `clear` - Clear conversation history
- `exit` or `quit` - End session

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

### Multimodal Operations

The system exposes all operations through natural language via the Gemini AI interface. Here are the underlying MCP tools:

#### Weather Operations
- **`get_alerts(state)`** - Active weather alerts by state (CA, NY, TX, FL, etc.)
- **`get_forecast(lat, lon)`** - 5-day weather forecast for coordinates

#### File System Operations
- **`read_file(path)`** - Read text file contents
- **`write_file(path, content, create_dirs)`** - Write content to files
- **`list_directory(path, show_hidden)`** - List directory contents
- **`create_directory(path, create_parents)`** - Create directories
- **`delete_file(path)`** - Delete files safely
- **`get_file_info(path)`** - Get detailed file metadata

### Data Formats

#### Weather Data
```json
{
  "alerts": [
    {
      "event": "Special Weather Statement",
      "area": "Dalton Highway Summits",
      "severity": "Minor",
      "description": "Gusty winds and blowing snow expected..."
    }
  ],
  "forecast": [
    {
      "period": "Today",
      "temperature": "45°F",
      "wind": "10 mph NW",
      "conditions": "Partly cloudy"
    }
  ]
}
```

#### File System Data
```json
{
  "files": [
    {"name": "README.md", "type": "file", "size": 2048},
    {"name": "src", "type": "directory", "size": 0}
  ],
  "metadata": {
    "path": "/project/README.md",
    "permissions": "rw-r--r--",
    "modified": "2025-11-26T10:30:00Z"
  }
}
```

## 🐛 Troubleshooting

### Common Issues & Solutions

#### ❌ "API key not valid" Error
**Problem**: Gemini AI can't authenticate.
**Solution**:
```bash
# Get API key from https://makersuite.google.com/app/apikey
# Update .env file:
GOOGLE_API_KEY=your_actual_api_key_here
```

#### ❌ "Connection refused" Error
**Problem**: MCP servers not accessible.
**Solution**:
```bash
# Test individual servers:
uv run python server.py                    # Weather server
uv run python file-system-mcp-server.py    # File system server

# Check if ports 8001/8002 are available
netstat -an | findstr "8001 8002"
```

#### ❌ "Module not found" Errors
**Problem**: Dependencies not installed.
**Solution**:
```bash
uv sync  # Install all dependencies
uv pip list  # Verify installation
```

#### ❌ "Permission denied" for File Operations
**Problem**: File system access restricted.
**Solution**: The server automatically blocks access to system directories:
- `/etc`, `/usr`, `/bin`, `/sbin`
- `C:\Windows`, `C:\Program Files`
- Other sensitive system paths

#### ❌ Weather API Not Responding
**Problem**: NWS API issues.
**Solution**:
- Check internet connectivity
- Verify valid state codes (CA, NY, TX, FL, etc.)
- NWS API may have temporary outages

### 🔍 Debug Commands

```bash
# Test basic functionality
uv run python -c "import server, file_system_mcp_server; print('Servers import OK')"

# Test MCP configuration
uv run python -c "from mcp_use import MCPClient; client = MCPClient.from_config_file('config.json'); print('Config OK')"

# Check Gemini API key
uv run python -c "import os; from dotenv import load_dotenv; load_dotenv(); print('API Key:', bool(os.getenv('GOOGLE_API_KEY')))"

# Test server startup
uv run python server.py &
uv run python file-system-mcp-server.py &
```

### 📊 Performance Notes

- **Gemini API Rate Limits**: Free tier allows ~50 requests/minute
- **Weather API**: Real-time data, may have brief delays
- **File Operations**: Local filesystem, instant response
- **Memory Usage**: Each server uses ~50-100MB RAM

## 🤝 Contributing

### Development Setup
```bash
git clone <your-repo-url>
cd multimodel-mcp
uv sync
cp .env.example .env  # Add your API keys
```

### Adding New Capabilities

#### New Weather Features
```python
@mcp.tool()
async def get_weather_history(state: str, days: int) -> str:
    """Get historical weather data."""
    # Implementation here
```

#### New File Operations
```python
@mcp.tool()
async def search_files(directory: str, pattern: str) -> str:
    """Search for files matching a pattern."""
    # Implementation here
```

#### Custom AI Behaviors
Extend the Gemini client with specialized workflows or domain knowledge.

## 📄 License

MIT License - see project repository for details.

## 🙏 Acknowledgments

- **Google AI** - Gemini 2.5 Pro model
- **National Weather Service** - weather.gov API
- **MCP Community** - Model Context Protocol
- **FastMCP & mcp-use** - MCP implementation libraries

---

**Built with ❤️ for multimodal AI interactions**

*Questions? Open an issue or contribute to the project!*