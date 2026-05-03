import { MdRestore } from "react-icons/md";
import { FiAlertCircle, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { FaSave, FaUser } from "react-icons/fa";

import {
  useContext,
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

import type { CrepeTheme } from "../types/types";
import { SettingsContext } from "../contexts/SettingsContext";

import toast from "react-hot-toast";
import { getDefaultSettings } from "../utils/api";

const Settings = () => {
  const { settings, setSettings, update } = useContext(SettingsContext);

  const minFontSize = 10;
  const maxFontSize = 40;

  const [theme, setTheme] = useState<CrepeTheme>(settings.theme as CrepeTheme);
  const [fontSize, setFontSize] = useState(settings.fontSize);
  const [placeholder, setPlaceholder] = useState(settings.placeholder);

  const [topBar, setTopBar] = useState(settings.topBar);
  const [toolBar, setToolBar] = useState(settings.toolBar);

  const [titleText, setTitleText] = useState(settings.titleText);
  const [welcomeText, setWelcomeText] = useState(settings.welcomeText);

  useEffect(() => {
    setTheme(settings.theme as CrepeTheme);
    setFontSize(settings.fontSize);
    setPlaceholder(settings.placeholder);

    setTopBar(settings.topBar);
    setToolBar(settings.toolBar);

    setTitleText(settings.titleText);
    setWelcomeText(settings.welcomeText);
  }, [settings]);

  const handleSettings = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await pushSettings();
  };

  const handleThemeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const newTheme = e.target.value as CrepeTheme;
    setTheme(newTheme);
  };

  const changeFontSize = (delta: number) => {
    setFontSize((current) => {
      const nextValue = (current ?? 16) + delta;
      return Math.min(maxFontSize, Math.max(minFontSize, nextValue));
    });
  };

  const pushSettings = async () => {
    const response: any = await update({
      id: "",
      theme,
      fontSize,
      placeholder:
        placeholder != ""
          ? placeholder
          : "Please type / to see the commands...",

      topBar,
      toolBar,

      titleText: titleText != "" ? titleText : "Minder",
      welcomeText:
        welcomeText != ""
          ? welcomeText
          : "Hello sir! Welcome to the Minder editor!",
    });

    toast.success(response.message);
  };

  return (
    <section className="bg-neutral-950/80 w-full h-full text-neutral-100 flex justify-center p-8">
      <form className="flex flex-col w-3/4 gap-8" onSubmit={handleSettings}>
        <header className="flex items-center justify-between">
          <h2 className="text-neutral-200/90 font-semibold flex items-center gap-3 text-lg">
            <FaUser />
            User settings
          </h2>
          <div className="flex gap-3">
            <button
              className="px-4 py-1.5 bg-blue-500 hover:bg-blue-700 transition rounded-sm flex items-center gap-2 cursor-pointer text-white"
              type="submit"
            >
              <FaSave /> Save
            </button>
            <button
              type="button"
              className="px-4 py-1.5 bg-neutral-800/60 hover:bg-neutral-700 transition rounded-sm flex items-center gap-2 cursor-pointer text-white"
              onClick={async () => {
                const response = await getDefaultSettings();

                setSettings(response.data ?? response);
                toast.success(response.message);
              }}
            >
              <MdRestore /> Restore
            </button>
          </div>
        </header>

        <section className="flex flex-col gap-4 font-mono">
          <div className="w-full flex items-center justify-between bg-neutral-700/25 rounded p-3">
            <div>
              <label className="text-sm text-neutral-300">Font size</label>
              <div className="text-xs text-neutral-500 flex gap-1 justify-center items-center">
                <FiAlertCircle />
                Controls editor text size (px)
              </div>
            </div>
            <div className="flex items-stretch overflow-hidden rounded border border-neutral-700 bg-neutral-800 text-white">
              <button
                type="button"
                aria-label="Decrease font size"
                onClick={() => changeFontSize(-1)}
                className="flex h-8 w-8 items-center justify-center border-r border-neutral-700 bg-neutral-900/60 transition hover:bg-neutral-700/80 active:bg-neutral-600"
              >
                <FiChevronDown />
              </button>
              <input
                type="number"
                id="fontsize"
                min={minFontSize}
                max={maxFontSize}
                value={fontSize ?? 16}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-10 h-8 bg-transparent text-center outline-none appearance-none [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <button
                type="button"
                aria-label="Increase font size"
                onClick={() => changeFontSize(1)}
                className="flex h-8 w-8 items-center justify-center border-l border-neutral-700 bg-neutral-900/60 transition hover:bg-neutral-700/80 active:bg-neutral-600"
              >
                <FiChevronUp />
              </button>
            </div>
          </div>

          <div className="w-full flex items-center justify-between bg-neutral-700/25 rounded p-3">
            <div>
              <label className="text-sm text-neutral-300">Theme</label>
              <div className="text-xs text-neutral-500 flex gap-1 justify-center items-center">
                <FiAlertCircle />
                Editor visual theme
              </div>
            </div>
            <select
              id="theme"
              className="px-4 text-sm py-1 rounded bg-neutral-800 text-white outline-none border border-neutral-700"
              onChange={handleThemeSelect}
              value={theme}
            >
              <option value="classic">Classic</option>
              <option value="classic-dark">Classic Dark</option>
              <option value="frame">Frame</option>
              <option value="frame-dark">Frame Dark</option>
              <option value="nord">Nord</option>
              <option value="nord-dark">Nord Dark</option>
            </select>
          </div>

          <div className="w-full flex items-center justify-between bg-neutral-700/25 rounded p-3">
            <div>
              <label className="text-sm text-neutral-300">ToolBar</label>
              <div className="text-xs text-neutral-500 flex gap-1 justify-center items-center">
                <FiAlertCircle />
                Enable/Deactive ToolBar
              </div>
            </div>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={toolBar}
                onChange={() => setToolBar(!toolBar)}
                className="accent-blue-500 h-4 w-4 cursor-pointer"
              />
            </label>
          </div>

          <div className="w-full flex items-center justify-between bg-neutral-700/25 rounded p-3">
            <div>
              <label className="text-sm text-neutral-300">TopBar</label>
              <div className="text-xs text-neutral-500 flex gap-1 justify-center items-center">
                <FiAlertCircle />
                Enable/Deactive rich text TopBar
              </div>
            </div>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={topBar}
                onChange={() => setTopBar(!topBar)}
                className="accent-blue-500 h-4 w-4 cursor-pointer"
              />
            </label>
          </div>

          <div className="w-full flex items-center justify-between bg-neutral-700/25 rounded p-3">
            <div>
              <label className="text-sm text-neutral-300">Title text</label>
              <div className="text-xs text-neutral-500 flex gap-1 justify-center items-center">
                <FiAlertCircle />
                Change Homepage title text.
              </div>
            </div>
            <input
              type="text"
              value={titleText}
              onChange={(e) => setTitleText(e.target.value)}
              placeholder="Minder"
              className="px-4 text-sm py-1 rounded bg-neutral-800 text-neutral-500 outline-none border border-neutral-700"
            />
          </div>

          <div className="w-full flex items-center justify-between bg-neutral-700/25 rounded p-3">
            <div>
              <label className="text-sm text-neutral-300">Welcome text</label>
              <div className="text-xs text-neutral-500 flex gap-1 justify-center items-center">
                <FiAlertCircle />
                Change Homepage welcome subtitle text.
              </div>
            </div>
            <input
              type="text"
              value={welcomeText}
              placeholder="Hello sir! Welcome to the Minder editor!"
              onChange={(e) => setWelcomeText(e.target.value)}
              className="px-4 text-sm py-1 rounded bg-neutral-800 text-neutral-500 outline-none border border-neutral-700"
            />
          </div>

          <div className="w-full flex items-center justify-between bg-neutral-700/25 rounded p-3">
            <div>
              <label className="text-sm text-neutral-300">Placeholder</label>
              <div className="text-xs text-neutral-500 flex gap-1 justify-center items-center">
                <FiAlertCircle />
                Change placeholder editor
              </div>
            </div>
            <input
              type="text"
              value={placeholder}
              placeholder="Type / to see comands..."
              onChange={(e) => setPlaceholder(e.target.value)}
              className="px-4 text-sm py-1 rounded bg-neutral-800 text-neutral-500 outline-none border border-neutral-700"
            />
          </div>
        </section>
      </form>
    </section>
  );
};

export default Settings;
