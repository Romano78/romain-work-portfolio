"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({ theme: "light", setTheme: () => null });

export function ThemeProvider({
  children,
  attribute = "class",
  defaultTheme = "system",
  enableSystem = true,
  disableTransitionOnChange = false,
  ...props
}) {
  const [theme, setTheme] = useState(defaultTheme);
  
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove old attributes
    root.removeAttribute(attribute);
    
    // Set the attribute
    if (attribute === "class") {
      root.classList.add(theme);
    } else {
      root.setAttribute(attribute, theme);
    }
  }, [theme, attribute]);
  
  const value = {
    theme,
    setTheme: (newTheme) => {
      setTheme(newTheme);
      // Save to localStorage
      try {
        localStorage.setItem("theme", newTheme);
      } catch (e) {
        // Ignore errors
      }
    },
  };

  return (
    <ThemeContext.Provider value={value} {...props}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
