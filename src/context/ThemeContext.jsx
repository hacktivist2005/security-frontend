import { createContext, useContext, useEffect, useState, useCallback } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  // 1. Initial State with LocalStorage & System Preference Fallback
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") return true;

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }

    // Fallback to System/OS Theme preference if no saved setting
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // 2. Apply Theme to HTML Document & LocalStorage
  useEffect(() => {
    const root = document.documentElement;

    // Toggle 'dark' class on <html> tag for Tailwind CSS
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // Save user choice
    localStorage.setItem("theme", darkMode ? "dark" : "light");

    // Dynamic Mobile Browser Header Color Sync (Safari/Chrome Status Bar)
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", darkMode ? "#020617" : "#ffffff");
    }
  }, [darkMode]);

  // 3. Multi-Tab Realtime Synchronization (Cross-Tab Sync)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "theme") {
        setDarkMode(e.newValue === "dark");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // 4. Optimized Toggle Handler
  const toggleTheme = useCallback(() => {
    setDarkMode((prev) => !prev);
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        theme: darkMode ? "dark" : "light",
        toggleTheme,
        setDarkMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}