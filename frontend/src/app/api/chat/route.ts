import { NextRequest, NextResponse } from "next/server";

type HistoryMessage = {
  role: "user" | "assistant";
  content: string;
};

const SHIM_BASE_URL = "http://127.0.0.1:8003";

/**
 * Chat API route.
 *
 * Sends the user's message (and optional reset flag) to the Python HTTP shim,
 * which uses Gemini + MCPAgent to decide when to call MCP tools.
 */
export async function POST(req: NextRequest) {
  const { message, history } = (await req.json()) as {
    message: string;
    history?: HistoryMessage[];
  };

  const reset = !history || history.length === 0;

  try {
    const res = await fetch(`${SHIM_BASE_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, reset }),
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        {
          reply: `Backend error (${res.status}): ${text}`,
        },
        { status: res.status },
      );
    }

    const data = (await res.json()) as { reply: string };
    return NextResponse.json({ reply: data.reply });
  } catch (error) {
    console.error("chat shim error:", error);
    return NextResponse.json(
      {
        reply:
          "There was an error talking to the chat backend. Make sure http_shim.py is running and GOOGLE_API_KEY is set.",
      },
      { status: 500 },
    );
  }
}
