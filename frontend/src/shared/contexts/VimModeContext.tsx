import { createContext, useState, useRef, useEffect, type ReactNode, type MutableRefObject } from "react";
import type { VimMode } from "../types/types";

export interface VimModeContextType {
  vimMode: VimMode;
  setVimMode: (mode: VimMode) => void;
  vimModeRef: MutableRefObject<VimMode>;
  commandBuffer: string;
  setCommandBuffer: (buf: string) => void;
  commandBufferRef: MutableRefObject<string>;
  cursorLine: number;
  cursorCol: number;
  setCursorLine: (line: number) => void;
  setCursorCol: (col: number) => void;
}

export const VimModeContext = createContext<VimModeContextType | null>(null);

export const VimModeProvider = ({ children }: { children: ReactNode }) => {
  const [vimMode, setVimMode] = useState<VimMode>("NORMAL");
  const vimModeRef = useRef<VimMode>("NORMAL");
  const [commandBuffer, setCommandBuffer] = useState<string>("");
  const commandBufferRef = useRef<string>("");
  const [cursorLine, setCursorLine] = useState<number>(1);
  const [cursorCol, setCursorCol] = useState<number>(1);

  useEffect(() => {
    vimModeRef.current = vimMode;
  }, [vimMode]);

  useEffect(() => {
    commandBufferRef.current = commandBuffer;
  }, [commandBuffer]);

  return (
    <VimModeContext.Provider
      value={{
        vimMode,
        setVimMode,
        vimModeRef,
        commandBuffer,
        setCommandBuffer,
        commandBufferRef,
        cursorLine,
        cursorCol,
        setCursorLine,
        setCursorCol,
      }}
    >
      {children}
    </VimModeContext.Provider>
  );
};
