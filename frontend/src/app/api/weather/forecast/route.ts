import { NextRequest, NextResponse } from "next/server";

type ForecastResult = {
  raw: string;
};

const SHIM_BASE_URL = "http://127.0.0.1:8003";

/**
 * Weather forecast API.
 *
 * Proxies to the Python HTTP shim, which in turn calls the weather MCP
 * server's get_forecast(latitude, longitude) tool.
 */
export async function POST(req: NextRequest) {
  const { latitude, longitude } = (await req.json()) as {
    latitude: number;
    longitude: number;
  };

  try {
    const res = await fetch(`${SHIM_BASE_URL}/weather/forecast`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ latitude, longitude }),
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { raw: `Error from backend: ${res.status} ${text}` },
        { status: res.status }
      );
    }

    const data = (await res.json()) as ForecastResult;
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error calling weather forecast shim:", error);
    return NextResponse.json(
      {
        raw: "Failed to reach weather backend. Make sure http_shim.py is running on port 8003.",
      },
      { status: 500 }
    );
  }
}

