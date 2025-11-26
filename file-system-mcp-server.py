import os
import json
from pathlib import Path
from typing import List, Dict, Any
from mcp.server.fastmcp import FastMCP

# Create an MCP server for file system operations
mcp = FastMCP(
    name="file-system",
    host="localhost",
    port=8002,  # Different port from weather server
)


def validate_path(path: str) -> Path:
    """Validate and resolve file path safely."""
    # Convert to absolute path and resolve any symlinks
    resolved_path = Path(path).resolve()

    # Basic security check - prevent access to system directories
    forbidden_paths = [
        "/etc", "/usr", "/bin", "/sbin", "/sys", "/proc", "/dev",
        "C:\\Windows", "C:\\Program Files", "C:\\Program Files (x86)"
    ]

    for forbidden in forbidden_paths:
        try:
            if str(resolved_path).startswith(forbidden):
                raise ValueError(f"Access to system path '{forbidden}' is not allowed")
        except:
            pass

    return resolved_path


@mcp.tool()
async def read_file(file_path: str) -> str:
    """Read the contents of a file.

    Args:
        file_path: Path to the file to read
    """
    try:
        path = validate_path(file_path)

        if not path.exists():
            return f"Error: File '{file_path}' does not exist"

        if not path.is_file():
            return f"Error: '{file_path}' is not a file"

        # Read file contents
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()

        return f"File '{file_path}' contents:\n{content}"

    except PermissionError:
        return f"Error: Permission denied reading file '{file_path}'"
    except UnicodeDecodeError:
        return f"Error: Cannot read binary file '{file_path}' as text"
    except Exception as e:
        return f"Error reading file '{file_path}': {str(e)}"


@mcp.tool()
async def write_file(file_path: str, content: str, create_dirs: bool = False) -> str:
    """Write content to a file.

    Args:
        file_path: Path to the file to write
        content: Content to write to the file
        create_dirs: Whether to create parent directories if they don't exist
    """
    try:
        path = validate_path(file_path)

        if create_dirs:
            path.parent.mkdir(parents=True, exist_ok=True)

        # Write file contents
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)

        return f"Successfully wrote to file '{file_path}'"

    except PermissionError:
        return f"Error: Permission denied writing to file '{file_path}'"
    except Exception as e:
        return f"Error writing to file '{file_path}': {str(e)}"


@mcp.tool()
async def list_directory(dir_path: str = ".", show_hidden: bool = False) -> str:
    """List contents of a directory.

    Args:
        dir_path: Path to the directory to list (defaults to current directory)
        show_hidden: Whether to show hidden files/directories
    """
    try:
        path = validate_path(dir_path)

        if not path.exists():
            return f"Error: Directory '{dir_path}' does not exist"

        if not path.is_dir():
            return f"Error: '{dir_path}' is not a directory"

        # Get directory contents
        items = []
        for item in path.iterdir():
            if not show_hidden and item.name.startswith('.'):
                continue

            item_type = "directory" if item.is_dir() else "file"
            size = item.stat().st_size if item.is_file() else 0
            items.append({
                "name": item.name,
                "type": item_type,
                "size": size
            })

        # Sort by type (directories first) then by name
        items.sort(key=lambda x: (x["type"] != "directory", x["name"]))

        # Format output
        result = f"Contents of directory '{dir_path}':\n"
        for item in items:
            if item["type"] == "directory":
                result += f"📁 {item['name']}/\n"
            else:
                size_kb = item["size"] / 1024
                result += f"📄 {item['name']} ({size_kb:.1f} KB)\n"

        return result

    except PermissionError:
        return f"Error: Permission denied reading directory '{dir_path}'"
    except Exception as e:
        return f"Error listing directory '{dir_path}': {str(e)}"


@mcp.tool()
async def create_directory(dir_path: str, create_parents: bool = True) -> str:
    """Create a new directory.

    Args:
        dir_path: Path of the directory to create
        create_parents: Whether to create parent directories if they don't exist
    """
    try:
        path = validate_path(dir_path)

        if path.exists():
            if path.is_dir():
                return f"Directory '{dir_path}' already exists"
            else:
                return f"Error: '{dir_path}' exists but is not a directory"

        path.mkdir(parents=create_parents, exist_ok=True)
        return f"Successfully created directory '{dir_path}'"

    except PermissionError:
        return f"Error: Permission denied creating directory '{dir_path}'"
    except Exception as e:
        return f"Error creating directory '{dir_path}': {str(e)}"


@mcp.tool()
async def delete_file(file_path: str) -> str:
    """Delete a file.

    Args:
        file_path: Path to the file to delete
    """
    try:
        path = validate_path(file_path)

        if not path.exists():
            return f"Error: File '{file_path}' does not exist"

        if not path.is_file():
            return f"Error: '{file_path}' is not a file"

        path.unlink()
        return f"Successfully deleted file '{file_path}'"

    except PermissionError:
        return f"Error: Permission denied deleting file '{file_path}'"
    except Exception as e:
        return f"Error deleting file '{file_path}': {str(e)}"


@mcp.tool()
async def get_file_info(file_path: str) -> str:
    """Get information about a file or directory.

    Args:
        file_path: Path to the file or directory
    """
    try:
        path = validate_path(file_path)

        if not path.exists():
            return f"Error: Path '{file_path}' does not exist"

        stat = path.stat()
        info = {
            "path": str(path),
            "absolute_path": str(path.absolute()),
            "exists": path.exists(),
            "is_file": path.is_file(),
            "is_directory": path.is_dir(),
            "size": stat.st_size,
            "modified": stat.st_mtime,
            "created": stat.st_ctime
        }

        return f"File information for '{file_path}':\n" + json.dumps(info, indent=2, default=str)

    except PermissionError:
        return f"Error: Permission denied accessing '{file_path}'"
    except Exception as e:
        return f"Error getting info for '{file_path}': {str(e)}"


# Run the server
if __name__ == "__main__":
    import sys

    transport = "sse"  # Default to SSE transport
    if len(sys.argv) > 1:
        transport = sys.argv[1]

    if transport == "stdio":
        print("Running file-system MCP server with stdio transport")
        mcp.run(transport="stdio")
    elif transport == "sse":
        print("Running file-system MCP server with SSE transport")
        mcp.run(transport="sse")
    else:
        raise ValueError(f"Unknown transport: {transport}")
