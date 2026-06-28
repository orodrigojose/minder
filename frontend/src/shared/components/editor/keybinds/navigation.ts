import { type MutableRefObject } from "react";
import { VimHandleKeyDown } from "./integration/vim";
import type { VimMode } from "../../../types/types";

export interface VimRefs {
  vimPendingRef: MutableRefObject<string>;
  vimSearchRef: MutableRefObject<string>;
  visualStartRef: MutableRefObject<number | null>;
}

export const HandleKeyDown = (
  vimIsActive: Boolean | undefined,
  view: any,
  event: KeyboardEvent,
  setVimMode: (mode: VimMode) => void,
  vimModeRef: MutableRefObject<VimMode>,
  vimRefs: VimRefs,
  commandBufferRef: MutableRefObject<string>,
  setCommandBuffer: (buf: string) => void,
  onSave: () => void,
  onExit: () => void,
): boolean => {
  if (vimIsActive) {
    return VimHandleKeyDown(
      view,
      event,
      setVimMode,
      vimModeRef,
      vimRefs,
      commandBufferRef,
      setCommandBuffer,
      onSave,
      onExit,
    );
  }


  return false;
};
