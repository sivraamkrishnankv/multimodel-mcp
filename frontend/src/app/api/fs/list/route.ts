import { NextRequest, NextResponse } from "next/server";

type DirectoryEntry = {
  name: string;
  type: "file" | "directory";
  size?: number;
};

type ListResult = {
  entries: DirectoryEntry[];
};

const SHIM_BASE_URL = "http://127.0.0.1:8003";

/**
 * File-system list_directory API.
 *
 * Proxies to the Python HTTP shim, which uses the same validation rules as
 * the file-system MCP server and returns structured entries.
 */
export async function POST(req: NextRequest) {
  const { path } = (await req.json()) as { path: string };

  try {
    const res = await fetch(`${SHIM_BASE_URL}/fs/list`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path }),
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        {
          entries: [],
          error: `Error from backend: ${res.status} ${text}`,
        } as ListResult & { error: string },
        { status: res.status }
      );
    }

    const data = (await res.json()) as ListResult;
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error calling fs list shim:", error);
    return NextResponse.json(
      {
        entries: [],
        error: "Failed to reach file-system backend. Make sure http_shim.py is running on port 8003.",
      } as ListResult & { error: string },
      { status: 500 }
    );
  }
}

