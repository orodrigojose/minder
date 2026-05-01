import { FaSave, FaUser } from "react-icons/fa";
import { MdRestore } from "react-icons/md";

const Settings = () => {
  return (
    <section className="bg-neutral-950/80 w-full h-full text-neutral-100 flex justify-center p-8">
      <main className="flex flex-col w-3/4 gap-8">
        <header className="flex items-center justify-between">
          <h2 className="text-neutral-200/90 font-semibold flex items-center gap-3 text-lg">
            <FaUser />
            User settings
          </h2>
          <div className="flex gap-3">
            <button className="px-4 py-1.5 bg-purple-600/90 hover:bg-purple-700 transition rounded-sm flex items-center gap-2 cursor-pointer text-white">
              <FaSave /> Save
            </button>
            <button className="px-4 py-1.5 bg-neutral-800/60 hover:bg-neutral-700 transition rounded-sm flex items-center gap-2 cursor-pointer text-white">
              <MdRestore /> Restore
            </button>
          </div>
        </header>

        <section className="flex flex-col gap-4 font-mono">
          <div className="w-full flex items-center justify-between bg-neutral-900/30 rounded p-3">
            <div>
              <label className="text-sm text-neutral-300">Font size</label>
              <div className="text-xs text-neutral-500">Controls editor text size (px)</div>
            </div>
            <input
              type="number"
              id="fontsize"
              min={10}
              max={40}
              defaultValue={16}
              className="w-24 px-2 py-1 rounded bg-neutral-800 text-white outline-none border border-neutral-700"
            />
          </div>

          <div className="w-full flex items-center justify-between bg-neutral-900/30 rounded p-3">
            <div>
              <label className="text-sm text-neutral-300">Theme</label>
              <div className="text-xs text-neutral-500">Editor visual theme</div>
            </div>
            <select
              id="theme"
              className="w-40 px-2 py-1 rounded bg-neutral-800 text-white outline-none border border-neutral-700"
            >
              <option value="classic">Classic</option>
              <option value="classic-dark">Classic Dark</option>
              <option value="frame">Frame</option>
              <option value="frame-dark">Frame Dark</option>
              <option value="nord">Nord</option>
              <option value="nord-dark">Nord Dark</option>
            </select>
          </div>

          <div className="w-full flex items-center justify-between bg-neutral-900/30 rounded p-3">
            <div>
              <label className="text-sm text-neutral-300">Slash menus</label>
              <div className="text-xs text-neutral-500">Enable slash menu suggestions</div>
            </div>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                defaultChecked
                className="accent-purple-500 h-4 w-4"
              />
            </label>
          </div>
        </section>
      </main>
    </section>
  );
};

export default Settings;
