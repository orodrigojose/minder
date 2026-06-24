import { useVimMode } from "../../../hooks/useVimMode";

export default function StatusBar() {
  const { vimModeRef } = useVimMode();

  const modeColors = {
    NORMAL: "bg-green-600 text-black",
    INSERT: "bg-blue-600 text-white",
    VISUAL: "bg-yellow-500 text-black",
    COMMAND: "bg-red-600 text-white",
  };

  const statusline = vimModeRef.current;

  const mode =
    statusline.toUpperCase() in modeColors
      ? statusline.toUpperCase()
      : "NORMAL";

  return (
    <div className="flex h-6 items-center justify-between font-mono text-xs border-t border-zinc-700 bg-zinc-900 text-zinc-200 w-full select-none">
      <div
        className={`px-3 h-full flex items-center font-bold ${
          modeColors[mode as keyof typeof modeColors]
        }`}
      >
        -- {mode} --
      </div>

      <div className="flex-1 px-3 truncate">notes.md</div>

      <div className="px-3 text-zinc-400">Ln 1, Col 1</div>
    </div>
  );
}
