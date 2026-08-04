"use client";

import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState("yellow");

  useEffect(() => {
    // Read after mount, not via a lazy useState initializer: localStorage is
    // unavailable during SSR, so reading it here (not at render time) is what
    // keeps the server-rendered markup and the first client render in sync.
    const saved = localStorage.getItem("pizaasta-theme");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved) setTheme(saved);
  }, []);

  function handleChange(value: string) {
    setTheme(value);
    document.documentElement.setAttribute("data-theme", value);
    localStorage.setItem("pizaasta-theme", value);
  }

  return (
    <div className="theme-switcher">
      <label htmlFor="themeSelect" className="sr-only">Color theme</label>
      <select id="themeSelect" value={theme} onChange={(e) => handleChange(e.target.value)}>
        <option value="yellow">🟡 Classic Yellow</option>
        <option value="red">🔴 Vibrant Red</option>
        <option value="minimal">⚫ Minimal Mono</option>
      </select>
    </div>
  );
}
