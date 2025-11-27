import { NextRequest, NextResponse } from "next/server";

type AlertsResult = {
  raw: string;
};

const SHIM_BASE_URL = "http://127.0.0.1:8003";

/**
 * Weather alerts API.
 *
 * Proxies to the Python HTTP shim, which in turn calls the weather MCP
 * server's get_alerts(state) tool.
 */
export async function POST(req: NextRequest) {
  const { state } = (await req.json()) as { state: string };

  try {
    const res = await fetch(`${SHIM_BASE_URL}/weather/alerts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ state }),
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { raw: `Error from backend: ${res.status} ${text}` },
        { status: res.status }
      );
    }

    const data = (await res.json()) as AlertsResult;
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error calling weather alerts shim:", error);
    return NextResponse.json(
      {
        raw: "Failed to reach weather backend. Make sure http_shim.py is running on port 8003.",
      },
      { status: 500 }
    );
  }
}

