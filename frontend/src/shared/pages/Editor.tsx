import { useNavigate, useParams } from "react-router-dom";
import FileEditor from "../components/editor/FileEditor";
import Loading from "../components/editor/Loading";
import Navbar from "../components/editor/Navbar";
import { useEffect, useState } from "react";
import { CiWarning } from "react-icons/ci";
import toast from "react-hot-toast";

import "@milkdown/crepe/theme/common/style.css";

type CrepeTheme =
  | "classic"
  | "classic-dark"
  | "nord"
  | "nord-dark"
  | "frame"
  | "frame-dark";

const theme: CrepeTheme = "frame-dark";

const themeStylesheets = {
  classic: () => import("@milkdown/crepe/theme/classic.css"),
  "classic-dark": () => import("@milkdown/crepe/theme/classic-dark.css"),
  nord: () => import("@milkdown/crepe/theme/nord.css"),
  "nord-dark": () => import("@milkdown/crepe/theme/nord-dark.css"),
  frame: () => import("@milkdown/crepe/theme/frame.css"),
  "frame-dark": () => import("@milkdown/crepe/theme/frame-dark.css"),
} as const;

const readThemeBackground = () => {
  const probe = document.createElement("div");
  probe.className = "milkdown";
  probe.style.position = "absolute";
  probe.style.left = "-9999px";
  probe.style.top = "-9999px";
  document.body.appendChild(probe);

  const backgroundColor = getComputedStyle(probe)
    .getPropertyValue("--crepe-color-background")
    .trim();

  probe.remove();

  return backgroundColor || "#1a1a1a";
};

const Editor = () => {
  const [loading, setLoading] = useState(true);
  const [showLoadingLayer, setShowLoadingLayer] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState("#1a1a1a");
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    void themeStylesheets[theme]().then(() => {
      setBackgroundColor(readThemeBackground());
    });
  }, []);

  useEffect(() => {
    if (id == undefined) {
      toast("Cannot find node", {
        icon: <CiWarning />,
      });

      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (loading) {
      setShowLoadingLayer(true);
      return;
    }

    const hideTimeout = setTimeout(() => {
      setShowLoadingLayer(false);
    }, 350);

    return () => clearTimeout(hideTimeout);
  }, [loading]);

  return (
    <main
      className="flex flex-col w-full h-screen overflow-hidden overflow-x-hidden"
      style={{ backgroundColor }}
    >
      <div
        className="flex-1 min-h-0 relative overflow-hidden"
        style={{ backgroundColor }}
      >
        <Navbar />
        <div
          className={`h-screen overflow-x-hidden transition-opacity duration-500 ease-out${
            loading ? "opacity-0" : "opacity-100"
          }`}
        >
          <FileEditor
            id={id || ""}
            loading={loading}
            setLoading={setLoading}
            backgroundColor={backgroundColor}
          />
        </div>

        {showLoadingLayer && (
          <div
            className={`absolute inset-0 z-10 transition-opacity duration-400 ease-out ${
              loading ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <Loading />
          </div>
        )}
      </div>
    </main>
  );
};

export default Editor;
