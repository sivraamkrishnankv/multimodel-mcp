import { NextRequest, NextResponse } from "next/server";

type ReadResult = {
  content: string;
};

const SHIM_BASE_URL = "http://127.0.0.1:8003";

/**
 * File-system read_file API.
 *
 * Proxies to the Python HTTP shim, which calls the file-system MCP
 * server's read_file(path) tool.
 */
export async function POST(req: NextRequest) {
  const { path } = (await req.json()) as { path: string };

  try {
    const res = await fetch(`${SHIM_BASE_URL}/fs/read`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path }),
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        {
          content: `Error from backend: ${res.status} ${text}`,
        } satisfies ReadResult,
        { status: res.status }
      );
    }

    const data = (await res.json()) as ReadResult;
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error calling fs read shim:", error);
    return NextResponse.json(
      {
        content:
          "Failed to reach file-system backend. Make sure http_shim.py is running on port 8003.",
      } satisfies ReadResult,
      { status: 500 }
    );
  }
}

