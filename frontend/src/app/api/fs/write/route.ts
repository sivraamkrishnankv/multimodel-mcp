import { NextRequest, NextResponse } from "next/server";

type WriteResult = {
  message: string;
};

const SHIM_BASE_URL = "http://127.0.0.1:8003";

/**
 * File-system write_file API.
 *
 * Proxies to the Python HTTP shim, which calls the file-system MCP
 * server's write_file(path, content, create_dirs) tool.
 */
export async function POST(req: NextRequest) {
  const { path, content, createDirs } = (await req.json()) as {
    path: string;
    content: string;
    createDirs?: boolean;
  };

  try {
    const res = await fetch(`${SHIM_BASE_URL}/fs/write`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path, content, createDirs }),
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        {
          message: `Error from backend: ${res.status} ${text}`,
        } satisfies WriteResult,
        { status: res.status }
      );
    }

    const data = (await res.json()) as WriteResult;
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error calling fs write shim:", error);
    return NextResponse.json(
      {
        message:
          "Failed to reach file-system backend. Make sure http_shim.py is running on port 8003.",
      } satisfies WriteResult,
      { status: 500 }
    );
  }
}

