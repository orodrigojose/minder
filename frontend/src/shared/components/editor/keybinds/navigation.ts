import { type MutableRefObject } from "react";
import { VimHandleKeyDown } from "./integration/vim";
import type { VimMode } from "../../../types/types";

export interface VimRefs {
  vimPendingRef: MutableRefObject<string>;
  vimSearchRef: MutableRefObject<string>;
  visualStartRef: MutableRefObject<number | null>;
}

export const HandleKeyDown = (
  vimIsActive: Boolean,
  view: any,
  event: KeyboardEvent,
  setVimMode: (mode: VimMode) => void,
  vimModeRef: MutableRefObject<VimMode>,
  vimRefs: VimRefs,
): boolean => {
  if (vimIsActive)
    VimHandleKeyDown(view, event, setVimMode, vimModeRef, vimRefs);

  return false;
};
