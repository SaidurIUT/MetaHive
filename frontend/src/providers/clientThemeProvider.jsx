// src/components/providers/clientThemeProvider.jsx
"use client";

import { useEffect } from "react";
import { initializeTheme } from "../config/colorUtils";

export default function ClientThemeProvider({ children }) {
  useEffect(() => {
    initializeTheme();
  }, []);

  return <>{children}</>;
}
