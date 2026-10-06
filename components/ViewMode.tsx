"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import TerminalView from "./TerminalView";

type Mode = "standard" | "terminal";

const STORAGE_KEY = "view-mode";

const ViewModeContext = createContext<{
  mode: Mode;
  setMode: (mode: Mode) => void;
} | null>(null);

export function useViewMode() {
  const ctx = useContext(ViewModeContext);
  if (!ctx) throw new Error("useViewMode must be used inside ViewModeProvider");
  return ctx;
}

export function ViewModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<Mode>("standard");

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === "terminal") setModeState("terminal");
  }, []);

  const setMode = useCallback((next: Mode) => {
    setModeState(next);
    localStorage.setItem(STORAGE_KEY, next);
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <ViewModeContext.Provider value={{ mode, setMode }}>
      {mode === "terminal" ? <TerminalView /> : children}
    </ViewModeContext.Provider>
  );
}
