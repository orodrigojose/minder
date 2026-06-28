import { useContext } from "react";
import { VimModeContext } from "../shared/contexts/VimModeContext";

export function useVimMode() {
  const context = useContext(VimModeContext);

  if (!context)
    throw new Error("useVimMode must be used within VimModeProvider");

  return context;
}
