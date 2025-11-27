"use client";

import { FormEvent, useState } from "react";

type WeatherResponse = {
  raw: string;
};

export default function WeatherPage() {
  const [stateCode, setStateCode] = useState("CA");
  const [lat, setLat] = useState("37.7749");
  const [lon, setLon] = useState("-122.4194");
  const [alerts, setAlerts] = useState<WeatherResponse | null>(null);
  const [forecast, setForecast] = useState<WeatherResponse | null>(null);
  const [loadingAlerts, setLoadingAlerts] = useState(false);
  const [loadingForecast, setLoadingForecast] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAlerts = async (e: FormEvent) => {
    e.preventDefault();
    setLoadingAlerts(true);
    setError(null);

    try {
      const res = await fetch("/api/weather/alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ state: stateCode }),
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data: WeatherResponse = await res.json();
      setAlerts(data);
    } catch (err) {
      console.error(err);
      setError(
        "Unable to load alerts. Ensure the backend weather API/shim is running."
      );
    } finally {
      setLoadingAlerts(false);
    }
  };

  const handleForecast = async (e: FormEvent) => {
    e.preventDefault();
    setLoadingForecast(true);
    setError(null);

    try {
      const res = await fetch("/api/weather/forecast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          latitude: parseFloat(lat),
          longitude: parseFloat(lon),
        }),
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data: WeatherResponse = await res.json();
      setForecast(data);
    } catch (err) {
      console.error(err);
      setError(
        "Unable to load forecast. Ensure the backend weather API/shim is running."
      );
    } finally {
      setLoadingForecast(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-semibold">Weather</h1>
        <p className="mt-1 text-sm text-slate-400">
          Query the weather MCP server for alerts and 5-day forecasts via
          Next.js API routes.
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-500/40 bg-red-950/40 px-3 py-2 text-sm text-red-200">
          {error}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <form
          onSubmit={handleAlerts}
          className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/40 p-4"
        >
          <h2 className="text-sm font-medium text-slate-100">
            Alerts by State
          </h2>
          <p className="text-xs text-slate-400">
            Uses the <code>get_alerts(state)</code> MCP tool.
          </p>
          <label className="block text-xs text-slate-300">
            US State Code
            <input
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950/60 px-2 py-1 text-sm outline-none focus:border-sky-500"
              value={stateCode}
              onChange={(e) => setStateCode(e.target.value.toUpperCase())}
              maxLength={2}
            />
          </label>
          <button
            type="submit"
            disabled={loadingAlerts}
            className="rounded-lg bg-sky-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loadingAlerts ? "Loading..." : "Get Alerts"}
          </button>
        </form>

        <form
          onSubmit={handleForecast}
          className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/40 p-4"
        >
          <h2 className="text-sm font-medium text-slate-100">
            Forecast by Coordinates
          </h2>
          <p className="text-xs text-slate-400">
            Uses the <code>get_forecast(latitude, longitude)</code> MCP tool.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <label className="block text-xs text-slate-300">
              Latitude
              <input
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950/60 px-2 py-1 text-sm outline-none focus:border-sky-500"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
              />
            </label>
            <label className="block text-xs text-slate-300">
              Longitude
              <input
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950/60 px-2 py-1 text-sm outline-none focus:border-sky-500"
                value={lon}
                onChange={(e) => setLon(e.target.value)}
              />
            </label>
          </div>
          <button
            type="submit"
            disabled={loadingForecast}
            className="rounded-lg bg-sky-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loadingForecast ? "Loading..." : "Get Forecast"}
          </button>
        </form>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Alerts Result
          </h3>
          <div className="h-64 overflow-y-auto rounded-lg bg-slate-950/80 p-3 text-xs text-slate-200">
            {alerts ? (
              <pre className="whitespace-pre-wrap">{alerts.raw}</pre>
            ) : (
              <span className="text-slate-500">
                Run an alerts query to see results here.
              </span>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Forecast Result
          </h3>
          <div className="h-64 overflow-y-auto rounded-lg bg-slate-950/80 p-3 text-xs text-slate-200">
            {forecast ? (
              <pre className="whitespace-pre-wrap">{forecast.raw}</pre>
            ) : (
              <span className="text-slate-500">
                Run a forecast query to see results here.
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


