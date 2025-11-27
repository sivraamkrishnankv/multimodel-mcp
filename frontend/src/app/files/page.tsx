"use client";

import { FormEvent, useState } from "react";

type DirectoryEntry = {
  name: string;
  type: "file" | "directory";
  size?: number;
};

type ListResponse = {
  entries: DirectoryEntry[];
};

type ReadResponse = {
  content: string;
};

type WriteResponse = {
  message: string;
};

export default function FilesPage() {
  const [path, setPath] = useState(".");
  const [entries, setEntries] = useState<DirectoryEntry[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [writePath, setWritePath] = useState("notes.txt");
  const [writeContent, setWriteContent] = useState("Hello from Multimodel MCP");
  const [status, setStatus] = useState<string | null>(null);
  const [loadingList, setLoadingList] = useState(false);
  const [loadingRead, setLoadingRead] = useState(false);
  const [loadingWrite, setLoadingWrite] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleList = async (e: FormEvent) => {
    e.preventDefault();
    setLoadingList(true);
    setError(null);

    try {
      const res = await fetch("/api/fs/list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path }),
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data: ListResponse = await res.json();
      setEntries(data.entries);
      setSelectedFile(null);
      setFileContent(null);
    } catch (err) {
      console.error(err);
      setError(
        "Unable to list directory. Ensure the file-system MCP API/shim is running."
      );
    } finally {
      setLoadingList(false);
    }
  };

  const handleRead = async (fileName: string) => {
    setLoadingRead(true);
    setSelectedFile(fileName);
    setError(null);

    try {
      const fullPath = path === "." ? fileName : `${path}/${fileName}`;
      const res = await fetch("/api/fs/read", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: fullPath }),
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data: ReadResponse = await res.json();
      setFileContent(data.content);
    } catch (err) {
      console.error(err);
      setError(
        "Unable to read file. Ensure the file-system MCP API/shim is running."
      );
    } finally {
      setLoadingRead(false);
    }
  };

  const handleWrite = async (e: FormEvent) => {
    e.preventDefault();
    setLoadingWrite(true);
    setError(null);
    setStatus(null);

    try {
      const res = await fetch("/api/fs/write", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: writePath,
          content: writeContent,
          createDirs: true,
        }),
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data: WriteResponse = await res.json();
      setStatus(data.message);
    } catch (err) {
      console.error(err);
      setError(
        "Unable to write file. Ensure the file-system MCP API/shim is running."
      );
    } finally {
      setLoadingWrite(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-semibold">File System</h1>
        <p className="mt-1 text-sm text-slate-400">
          Explore and modify files through the file-system MCP server via
          Next.js API routes.
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-500/40 bg-red-950/40 px-3 py-2 text-sm text-red-200">
          {error}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-[2fr,3fr]">
        <div className="space-y-4">
          <form
            onSubmit={handleList}
            className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/40 p-4"
          >
            <h2 className="text-sm font-medium text-slate-100">
              List Directory
            </h2>
            <p className="text-xs text-slate-400">
              Uses the <code>list_directory(path)</code> MCP tool.
            </p>
            <label className="block text-xs text-slate-300">
              Path
              <input
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950/60 px-2 py-1 text-sm outline-none focus:border-sky-500"
                value={path}
                onChange={(e) => setPath(e.target.value)}
              />
            </label>
            <button
              type="submit"
              disabled={loadingList}
              className="rounded-lg bg-sky-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loadingList ? "Loading..." : "List Contents"}
            </button>
          </form>

          <form
            onSubmit={handleWrite}
            className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/40 p-4"
          >
            <h2 className="text-sm font-medium text-slate-100">Write File</h2>
            <p className="text-xs text-slate-400">
              Uses the <code>write_file(path, content, create_dirs)</code> MCP
              tool.
            </p>
            <label className="block text-xs text-slate-300">
              Path
              <input
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950/60 px-2 py-1 text-sm outline-none focus:border-sky-500"
                value={writePath}
                onChange={(e) => setWritePath(e.target.value)}
              />
            </label>
            <label className="block text-xs text-slate-300">
              Content
              <textarea
                className="mt-1 h-24 w-full rounded-lg border border-slate-700 bg-slate-950/60 px-2 py-1 text-sm outline-none focus:border-sky-500"
                value={writeContent}
                onChange={(e) => setWriteContent(e.target.value)}
              />
            </label>
            <button
              type="submit"
              disabled={loadingWrite}
              className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loadingWrite ? "Writing..." : "Write File"}
            </button>
            {status && (
              <p className="text-xs text-emerald-300" aria-live="polite">
                {status}
              </p>
            )}
          </form>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Directory Contents
            </h3>
            <div className="h-56 overflow-y-auto rounded-lg bg-slate-950/80 text-xs">
              {entries.length === 0 ? (
                <div className="p-3 text-slate-500">
                  Run a directory listing to see entries here.
                </div>
              ) : (
                <table className="min-w-full border-separate border-spacing-y-1">
                  <thead className="sticky top-0 bg-slate-950/90">
                    <tr className="text-left text-[11px] uppercase tracking-wide text-slate-400">
                      <th className="px-3 py-1">Name</th>
                      <th className="px-3 py-1">Type</th>
                      <th className="px-3 py-1 text-right">Size</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entries.map((entry) => (
                      <tr
                        key={entry.name}
                        className="cursor-pointer rounded-md hover:bg-slate-800/80"
                        onClick={() =>
                          entry.type === "file" ? void handleRead(entry.name) : undefined
                        }
                      >
                        <td className="px-3 py-1.5 text-slate-100">
                          {entry.name}
                        </td>
                        <td className="px-3 py-1.5 text-slate-300">
                          {entry.type}
                        </td>
                        <td className="px-3 py-1.5 text-right text-slate-400">
                          {entry.size ?? "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
              File Contents
            </h3>
            <div className="h-56 overflow-y-auto rounded-lg bg-slate-950/80 p-3 text-xs text-slate-200">
              {loadingRead ? (
                <span className="text-slate-500">Loading file...</span>
              ) : fileContent && selectedFile ? (
                <>
                  <div className="mb-2 text-[11px] font-medium text-slate-400">
                    {selectedFile}
                  </div>
                  <pre className="whitespace-pre-wrap">{fileContent}</pre>
                </>
              ) : (
                <span className="text-slate-500">
                  Click a file in the directory table to view its contents.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}




