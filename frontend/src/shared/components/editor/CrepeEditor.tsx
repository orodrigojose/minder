import { useContext, useEffect, useMemo, useRef } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";

import { Milkdown, useEditor } from "@milkdown/react";
import { Crepe, CrepeFeature } from "@milkdown/crepe";
import { editorViewOptionsCtx } from "@milkdown/kit/core";
import { getMarkdown, replaceAll } from "@milkdown/utils";

import { math } from "@milkdown/plugin-math";

import mermaid from "mermaid";
import { uploadImage } from "../../utils/api";
import { useVimMode } from "../../../hooks/useVimMode";
import { HandleKeyDown, type VimRefs } from "./keybinds/navigation";

mermaid.initialize({ startOnLoad: true });

interface CrepeEditorProps {
  initialContent: string;
  onSave: (content: string) => void;
}

const CrepeEditor = ({ initialContent, onSave }: CrepeEditorProps) => {
  const crepeRef = useRef<Crepe | null>(null);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { settings } = useContext(SettingsContext);
  const { vimMode, setVimMode, vimModeRef } = useVimMode();

  useEffect(() => {
    vimModeRef.current = vimMode;
  }, [vimMode]);

  const vimPendingRef = useRef<string>("");
  const vimSearchRef = useRef<string>("");
  const visualStartRef = useRef<number | null>(null);

  const vimRefs: VimRefs = useMemo(
    () => ({
      vimPendingRef,
      vimSearchRef,
      visualStartRef,
    }),
    [],
  );

  const handleEditorKeyDown = (view: any, event: KeyboardEvent): boolean => {
    return HandleKeyDown(settings.vim, view, event, setVimMode, vimModeRef, vimRefs);
  };

  useEditor((root) => {
    const editorLanguage =
      navigator.language || document.documentElement.lang || "en";

    const crepe = new Crepe({
      root,
      defaultValue: initialContent,
      features: {
        table: true,
        "block-edit": true,
        "link-tooltip": true,
        [CrepeFeature.Toolbar]: settings.toolBar,
        [CrepeFeature.TopBar]: settings.topBar,
        [CrepeFeature.Cursor]: true,
      },
      featureConfigs: {
        [CrepeFeature.Placeholder]: {
          text: settings.placeholder,
        },
        [CrepeFeature.ImageBlock]: {
          onUpload: uploadImage,
        },
        [CrepeFeature.CodeMirror]: {
          renderPreview: (language, content, applyPreview) => {
            if (language === "mermaid" && content) {
              const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

              mermaid
                .render(id, content)
                .then(({ svg }) => {
                  applyPreview(svg);
                })
                .catch((err) => {
                  applyPreview(`<pre style="color:red">${err.message}</pre>`);
                });
            }
            return null;
          },
        },
      },
    });

    crepe.editor.use(math as any);

    crepe.editor.config((ctx) => {
      ctx.update(editorViewOptionsCtx, (prev) => ({
        ...prev,
        attributes: {
          ...prev.attributes,
          spellcheck: "true",
          lang: editorLanguage,
          autocorrect: "on",
          autocapitalize: "sentences",
        },
        handleDOMEvents: {
          ...prev.handleDOMEvents,
          keydown: (view, event) => {
            if (handleEditorKeyDown(view, event)) return true;
            if ((event.ctrlKey || event.metaKey) && event.key === "s") {
              event.preventDefault();
              const markdown = getMarkdown()(ctx);

              onSave(markdown);
              return true;
            }
            return false;
          },
        },
      }));
    });

    crepe.on((listener) => {
      listener.markdownUpdated((_ctx, markdown) => {
        if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);

        saveTimeoutRef.current = setTimeout(() => {
          onSave(markdown);
        }, 3000);
      });
    });

    crepeRef.current = crepe;
    return crepe;
  });

  useEffect(() => {
    const editor = crepeRef.current?.editor;

    if (editor && initialContent) {
      editor.action((ctx) => {
        replaceAll(initialContent)(ctx);
      });
    }
  }, [initialContent]);

  return (
    <div className="relative h-full">
      <Milkdown />
    </div>
  );
};

export default CrepeEditor;
