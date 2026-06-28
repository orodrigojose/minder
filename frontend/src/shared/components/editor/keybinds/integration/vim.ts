import type { VimMode } from "../../../../types/types";
import { Selection } from "@milkdown/prose/state";
import type { MutableRefObject } from "react";
import type { VimRefs } from "../navigation";

export const VimHandleKeyDown = (
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
  const mode = vimModeRef.current;
  const { vimPendingRef, vimSearchRef, visualStartRef } = vimRefs;
  const commandBuffer = commandBufferRef.current;

  if (mode === "COMMAND") {
    if (event.key === "Escape") {
      event.preventDefault();
      setVimMode("NORMAL");
      setCommandBuffer("");
      return true;
    }
    if (event.key === "Backspace") {
      event.preventDefault();
      if (commandBuffer.length > 0) {
        const nextBuffer = commandBuffer.slice(0, -1);
        setCommandBuffer(nextBuffer);
      } else {
        setVimMode("NORMAL");
      }
      return true;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      const cmd = commandBuffer.trim();
      if (cmd === "w") {
        onSave();
      } else if (cmd === "q") {
        onExit();
      } else if (cmd === "wq") {
        onSave();
        onExit();
      } else {
        console.warn(`Unknown command: ${cmd}`);
      }
      setVimMode("NORMAL");
      setCommandBuffer("");
      return true;
    }
    if (event.key.length === 1) {
      event.preventDefault();
      setCommandBuffer(commandBuffer + event.key);
      return true;
    }
    return true;
  }

  if (event.key === "Escape") {
    if (mode !== "NORMAL") {
      event.preventDefault();
      setVimMode("NORMAL");
      visualStartRef.current = null;
      vimPendingRef.current = "";
      return true;
    }
    return false;
  }

  if (mode === "NORMAL") {
    if (event.key === ":") {
      event.preventDefault();
      setVimMode("COMMAND");
      setCommandBuffer("");
      return true;
    }
    if (event.key === "i") {
      event.preventDefault();
      setVimMode("INSERT");
      return true;
    }
    if (event.key === "a") {
      event.preventDefault();
      const pos = Math.min(
        view.state.selection.from + 1,
        view.state.doc.content.size,
      );
      const sel =
        Selection.findFrom(view.state.doc.resolve(pos), 1, true) ||
        view.state.selection;
      view.dispatch(view.state.tr.setSelection(sel));
      setVimMode("INSERT");
      return true;
    }
    if (event.key === "I") {
      console.log("insert mode");
      event.preventDefault();
      const { $from } = view.state.selection;
      const lineStart = view.state.doc.resolve($from.start()).pos;
      const sel =
        Selection.findFrom(view.state.doc.resolve(lineStart), 1, true) ||
        view.state.selection;
      view.dispatch(view.state.tr.setSelection(sel));
      setVimMode("INSERT");
      return true;
    }
    if (event.key === "A") {
      event.preventDefault();
      const { $from } = view.state.selection;
      const lineEnd = view.state.doc.resolve($from.end()).pos;
      const sel =
        Selection.findFrom(view.state.doc.resolve(lineEnd), -1, true) ||
        view.state.selection;
      view.dispatch(view.state.tr.setSelection(sel));
      setVimMode("INSERT");
      return true;
    }
    if (event.key === "o") {
      event.preventDefault();
      const { $from } = view.state.selection;
      const lineEnd = view.state.doc.resolve($from.end()).pos;
      view.dispatch(
        view.state.tr.insert(lineEnd, view.state.schema.text("\n")),
      );
      const sel =
        Selection.findFrom(view.state.doc.resolve(lineEnd + 1), 1, true) ||
        view.state.selection;
      view.dispatch(view.state.tr.setSelection(sel));
      setVimMode("INSERT");
      return true;
    }
    if (event.key === "O") {
      event.preventDefault();
      const { $from } = view.state.selection;
      const lineStart = view.state.doc.resolve($from.start()).pos;
      view.dispatch(
        view.state.tr.insert(lineStart, view.state.schema.text("\n")),
      );
      const sel =
        Selection.findFrom(view.state.doc.resolve(lineStart), 1, true) ||
        view.state.selection;
      view.dispatch(view.state.tr.setSelection(sel));
      setVimMode("INSERT");
      return true;
    }

    if (event.key === "h") {
      event.preventDefault();
      const resolved = view.state.doc.resolve(
        Math.max(0, view.state.selection.from - 1),
      );
      const sel =
        Selection.findFrom(resolved, -1, true) || view.state.selection;
      view.dispatch(view.state.tr.setSelection(sel));
      return true;
    }
    if (event.key === "l") {
      event.preventDefault();
      const resolved = view.state.doc.resolve(
        Math.min(view.state.selection.from + 1, view.state.doc.content.size),
      );
      const sel = Selection.findFrom(resolved, 1, true) || view.state.selection;
      view.dispatch(view.state.tr.setSelection(sel));
      return true;
    }

    // j - Move down one line
    if (event.key === "j") {
      event.preventDefault();
      try {
        const coords = view.coordsAtPos(view.state.selection.from);
        const newPosCoords = view.posAtCoords({
          left: coords.left,
          top: coords.bottom + 10,
        });
        if (newPosCoords) {
          const sel =
            Selection.findFrom(
              view.state.doc.resolve(newPosCoords.pos),
              1,
              true,
            ) || view.state.selection;
          view.dispatch(view.state.tr.setSelection(sel));
        } else {
          const resolved = view.state.doc.resolve(view.state.selection.from);
          const nextNodePos = resolved.after(resolved.depth);
          const sel =
            Selection.findFrom(view.state.doc.resolve(nextNodePos), 1, true) ||
            view.state.selection;
          view.dispatch(view.state.tr.setSelection(sel));
        }
      } catch (e) {
        console.warn("Error moving down:", e);
      }
      return true;
    }

    // k - Move up one line
    if (event.key === "k") {
      event.preventDefault();
      try {
        const coords = view.coordsAtPos(view.state.selection.from);
        const newPosCoords = view.posAtCoords({
          left: coords.left,
          top: coords.top - 10,
        });
        if (newPosCoords) {
          const sel =
            Selection.findFrom(
              view.state.doc.resolve(newPosCoords.pos),
              -1,
              true,
            ) || view.state.selection;
          view.dispatch(view.state.tr.setSelection(sel));
        } else {
          const resolved = view.state.doc.resolve(view.state.selection.from);
          const prevNodePos = Math.max(0, resolved.before(resolved.depth));
          const sel =
            Selection.findFrom(view.state.doc.resolve(prevNodePos), -1, true) ||
            view.state.selection;
          view.dispatch(view.state.tr.setSelection(sel));
        }
      } catch (e) {
        console.warn("Error moving up:", e);
      }
      return true;
    }

    // Word navigation: w b e
    if (event.key === "w") {
      event.preventDefault();
      const pos = view.state.selection.from;
      const text = view.state.doc.textBetween(
        pos,
        Math.min(pos + 50, view.state.doc.content.size),
      );
      const match = text.match(/\s+\S/);
      if (match) {
        const newPos = pos + match.index! + match[0].length - 1;
        const sel =
          Selection.findFrom(view.state.doc.resolve(newPos), 1, true) ||
          view.state.selection;
        view.dispatch(view.state.tr.setSelection(sel));
      }
      return true;
    }
    if (event.key === "b") {
      event.preventDefault();
      const pos = view.state.selection.from;
      const text = view.state.doc.textBetween(Math.max(0, pos - 50), pos);
      const matches = [...text.matchAll(/\S+/g)];
      if (matches.length > 0) {
        const lastMatch = matches[matches.length - 1];
        const newPos = pos - (text.length - lastMatch.index!);
        const sel =
          Selection.findFrom(view.state.doc.resolve(newPos), -1, true) ||
          view.state.selection;
        view.dispatch(view.state.tr.setSelection(sel));
      }
      return true;
    }
    if (event.key === "e") {
      event.preventDefault();
      const pos = view.state.selection.from;
      const text = view.state.doc.textBetween(
        pos,
        Math.min(pos + 50, view.state.doc.content.size),
      );
      const match = text.match(/\S+/);
      if (match) {
        const newPos = pos + match.index! + match[0].length - 1;
        const sel =
          Selection.findFrom(view.state.doc.resolve(newPos), 1, true) ||
          view.state.selection;
        view.dispatch(view.state.tr.setSelection(sel));
      }
      return true;
    }

    // Line navigation: 0 $
    if (event.key === "0") {
      event.preventDefault();
      const { $from } = view.state.selection;
      const lineStart = view.state.doc.resolve($from.start()).pos;
      const sel =
        Selection.findFrom(view.state.doc.resolve(lineStart), 1, true) ||
        view.state.selection;
      view.dispatch(view.state.tr.setSelection(sel));
      return true;
    }
    if (event.key === "$") {
      event.preventDefault();
      const { $from } = view.state.selection;
      const lineEnd = view.state.doc.resolve($from.end()).pos;
      const sel =
        Selection.findFrom(view.state.doc.resolve(lineEnd), -1, true) ||
        view.state.selection;
      view.dispatch(view.state.tr.setSelection(sel));
      return true;
    }

    // Document navigation: g G
    if (event.key === "g") {
      if (vimPendingRef.current === "g") {
        event.preventDefault();
        const sel =
          Selection.findFrom(view.state.doc.resolve(0), 1, true) ||
          view.state.selection;
        view.dispatch(view.state.tr.setSelection(sel));
        vimPendingRef.current = "";
        return true;
      }
      event.preventDefault();
      vimPendingRef.current = "g";
      setTimeout(() => {
        vimPendingRef.current = "";
      }, 1000);
      return true;
    }
    if (event.key === "G") {
      event.preventDefault();
      const sel =
        Selection.findFrom(
          view.state.doc.resolve(view.state.doc.content.size),
          -1,
          true,
        ) || view.state.selection;
      view.dispatch(view.state.tr.setSelection(sel));
      vimPendingRef.current = "";
      return true;
    }

    // Delete: x d
    if (event.key === "x") {
      event.preventDefault();
      const from = view.state.selection.from;
      const to = Math.min(from + 1, view.state.doc.content.size);
      if (from < to) {
        view.dispatch(view.state.tr.delete(from, to));
      }
      return true;
    }
    if (event.key === "d") {
      if (vimPendingRef.current === "d") {
        event.preventDefault();
        const { $from } = view.state.selection;
        const lineStart = view.state.doc.resolve($from.start()).pos;
        const lineEnd = view.state.doc.resolve($from.end()).pos;
        view.dispatch(
          view.state.tr.delete(
            lineStart,
            Math.min(lineEnd + 1, view.state.doc.content.size),
          ),
        );
        vimPendingRef.current = "";
        return true;
      }
      event.preventDefault();
      vimPendingRef.current = "d";
      setTimeout(() => {
        vimPendingRef.current = "";
      }, 1000);
      return true;
    }

    if (event.key === "v") {
      event.preventDefault();
      setVimMode("VISUAL");
      visualStartRef.current = view.state.selection.from;
      return true;
    }
    if (event.key === "V") {
      event.preventDefault();
      const { $from } = view.state.selection;
      const lineStart = view.state.doc.resolve($from.start()).pos;
      const lineEnd = view.state.doc.resolve($from.end()).pos;
      setVimMode("VISUAL");
      visualStartRef.current = lineStart;
      view.dispatch(
        view.state.tr.setSelection(
          view.state.selection.constructor.create(
            view.state.doc,
            lineStart,
            lineEnd,
          ),
        ),
      );
      return true;
    }

    if (event.key === "u") {
      event.preventDefault();
      view.dispatch(view.state.tr.undo());
      return true;
    }
    if (event.ctrlKey && event.key === "r") {
      event.preventDefault();
      view.dispatch(view.state.tr.redo());
      return true;
    }

    // Search: / ?
    if (event.key === "/") {
      event.preventDefault();
      const searchTerm = prompt("Search:", vimSearchRef.current);
      if (searchTerm) {
        vimSearchRef.current = searchTerm;
        const text = view.state.doc.textContent;
        const index = text.indexOf(searchTerm, view.state.selection.from);
        if (index !== -1) {
          view.dispatch(
            view.state.tr.setSelection(
              view.state.selection.constructor.create(
                view.state.doc,
                index,
                index + searchTerm.length,
              ),
            ),
          );
        }
      }
      return true;
    }
  }

  // VISUAL mode commands
  if (mode === "VISUAL") {
    const start = visualStartRef.current || view.state.selection.from;
    const current = view.state.selection.to;

    if (event.key === "h") {
      event.preventDefault();
      const newPos = Math.max(0, current - 1);
      view.dispatch(
        view.state.tr.setSelection(
          view.state.selection.constructor.create(
            view.state.doc,
            start,
            newPos,
          ),
        ),
      );
      return true;
    }
    if (event.key === "l") {
      event.preventDefault();
      const newPos = Math.min(view.state.doc.content.size, current + 1);
      view.dispatch(
        view.state.tr.setSelection(
          view.state.selection.constructor.create(
            view.state.doc,
            start,
            newPos,
          ),
        ),
      );
      return true;
    }
    if (event.key === "j") {
      event.preventDefault();
      try {
        const text = view.state.doc.textContent;

        let lineStart = 0;
        for (let i = current - 1; i >= 0; i--) {
          if (text[i] === "\n") {
            lineStart = i + 1;
            break;
          }
        }

        let lineEnd = text.length;
        for (let i = current; i < text.length; i++) {
          if (text[i] === "\n") {
            lineEnd = i;
            break;
          }
        }

        const offsetInLine = current - lineStart;

        let nextLineStart = lineEnd + 1;
        if (nextLineStart > text.length) {
          return true;
        }

        let nextLineEnd = text.length;
        for (let i = nextLineStart; i < text.length; i++) {
          if (text[i] === "\n") {
            nextLineEnd = i;
            break;
          }
        }

        const nextPos = Math.min(nextLineStart + offsetInLine, nextLineEnd);
        const newEnd = Math.min(nextPos + 1, view.state.doc.content.size);

        view.dispatch(
          view.state.tr.setSelection(
            view.state.selection.constructor.create(
              view.state.doc,
              start,
              newEnd,
            ),
          ),
        );
      } catch (e) {
        console.warn("Error in visual j:", e);
      }
      return true;
    }
    if (event.key === "k") {
      event.preventDefault();
      try {
        const text = view.state.doc.textContent;

        let lineStart = 0;
        for (let i = current - 1; i >= 0; i--) {
          if (text[i] === "\n") {
            lineStart = i + 1;
            break;
          }
        }

        if (lineStart === 0) {
          return true;
        }

        // Get offset in current line
        const offsetInLine = current - lineStart;

        // Find previous line
        let prevLineEnd = lineStart - 1;
        let prevLineStart = 0;

        for (let i = lineStart - 2; i >= 0; i--) {
          if (text[i] === "\n") {
            prevLineStart = i + 1;
            break;
          }
        }

        // Set selection end at same offset in previous line
        const prevPos = Math.min(prevLineStart + offsetInLine, prevLineEnd);
        const newEnd = Math.min(prevPos + 1, view.state.doc.content.size);

        view.dispatch(
          view.state.tr.setSelection(
            view.state.selection.constructor.create(
              view.state.doc,
              start,
              newEnd,
            ),
          ),
        );
      } catch (e) {
        console.warn("Error in visual k:", e);
      }
      return true;
    }

    // Delete selection: d x
    if (event.key === "d" || event.key === "x") {
      event.preventDefault();
      const { from, to } = view.state.selection;
      if (from < to) {
        view.dispatch(view.state.tr.delete(from, to));
      }
      setVimMode("NORMAL");
      visualStartRef.current = null;
      return true;
    }
  }

  return false;
};
