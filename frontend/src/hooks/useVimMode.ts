import type { VimMode } from "../shared/types/types";
import { useState, useRef, type MutableRefObject } from "react";

interface UseVimModeReturn {
  vimMode: VimMode;
  setVimMode: (mode: VimMode) => void;
  vimModeRef: MutableRefObject<VimMode>;
}

export function useVimMode(): UseVimModeReturn {
  const [vimMode, setVimMode] = useState<VimMode>("NORMAL");
  const vimModeRef = useRef<VimMode>("NORMAL");

  return { vimMode, setVimMode, vimModeRef };
}
