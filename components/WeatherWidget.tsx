"use client";

import { useEffect, useState } from "react";

type Weather = {
  temperature: number;
  high: number;
  low: number;
  condition: string;
};

const weatherLabels: Record<number, string> = {
  0: "Clear",
  1: "Mostly clear",
  2: "Partly cloudy",
  3: "Cloudy",
  45: "Foggy",
  48: "Foggy",
  51: "Light drizzle",
  53: "Drizzle",
  55: "Heavy drizzle",
  61: "Light rain",
  63: "Rain",
  65: "Heavy rain",
  71: "Light snow",
  73: "Snow",
  75: "Heavy snow",
  80: "Rain showers",
  81: "Rain showers",
  82: "Heavy showers",
  95: "Thunderstorms",
};

export default function WeatherWidget({
  compact = false,
  className = "",
}: {
  compact?: boolean;
  className?: string;
}) {
  const [weather, setWeather] = useState<Weather | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadWeather() {
      try {
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=35.2271&longitude=-80.8431&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&timezone=America%2FNew_York",
        );
        if (!response.ok) return;

        const data = await response.json();
        if (cancelled) return;

        setWeather({
          temperature: Math.round(data.current.temperature_2m),
          high: Math.round(data.daily.temperature_2m_max[0]),
          low: Math.round(data.daily.temperature_2m_min[0]),
          condition: weatherLabels[data.current.weather_code] ?? "Charlotte weather",
        });
      } catch {
        // Keep the hero clean if weather data is temporarily unavailable.
      }
    }

    loadWeather();
    const refresh = window.setInterval(loadWeather, 30 * 60 * 1000);

    return () => {
      cancelled = true;
      window.clearInterval(refresh);
    };
  }, []);

  if (!weather) return null;

  if (compact) {
    return (
      <span
        aria-label={`Charlotte weather: ${weather.condition}, ${weather.temperature} degrees Fahrenheit`}
        className={`inline-flex items-center rounded-full border border-white/25 bg-white/10 px-2 py-1 align-middle font-sans text-xs font-semibold tracking-normal text-white backdrop-blur-sm ${className}`}
      >
        {weather.temperature}°
      </span>
    );
  }

  return (
    <aside
      aria-label="Charlotte weather"
      className={`rounded-card border border-white/20 bg-white/10 px-4 py-3 text-white backdrop-blur-sm ${className}`}
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/65">
        Charlotte weather
      </p>
      <p className="mt-1 font-display text-2xl font-semibold">
        {weather.temperature}°
      </p>
      <p className="mt-0.5 text-xs text-white/80">
        {weather.condition} · H {weather.high}° / L {weather.low}°
      </p>
    </aside>
  );
}
