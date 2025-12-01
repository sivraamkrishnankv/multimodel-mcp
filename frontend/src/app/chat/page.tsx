"use client";

import { useState } from "react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: messages,
        }),
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data: { reply: string } = await res.json();

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.reply,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error(err);
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          "There was a problem talking to the backend. Please ensure the API routes and MCP servers are running.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void handleSend();
    }
  };

  return (
    <div className="flex h-[calc(100vh-4.5rem)] flex-col rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
      <h1 className="mb-2 text-lg font-semibold">Chat</h1>
      <p className="mb-4 text-sm text-slate-400">
        Talk to the Multimodel MCP assistant. This UI will route weather and
        file-system questions to the appropriate tools via backend API routes.
      </p>

      <div className="flex-1 space-y-3 overflow-y-auto rounded-xl bg-slate-950/40 p-3">
        {messages.length === 0 && (
          <div className="text-sm text-slate-500">
            Ask things like:
            <ul className="mt-1 list-disc pl-5">
              <li>“What weather alerts are there for California?”</li>
              <li>“List the files in the current directory.”</li>
              <li>“Read README.md and summarize it.”</li>
            </ul>
          </div>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm ${
                msg.role === "user"
                  ? "bg-sky-600 text-white"
                  : "bg-slate-800 text-slate-50"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-end gap-2">
        <textarea
          className="min-h-[3rem] flex-1 resize-none rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none focus:border-sky-500"
          placeholder="Type a message and press Enter to send. Shift+Enter for new line."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          onClick={() => void handleSend()}
          disabled={loading}
          className="inline-flex items-center justify-center rounded-xl bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}






