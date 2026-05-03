import { useContext, useEffect, useRef } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";

import { Milkdown, useEditor } from "@milkdown/react";
import { Crepe, CrepeFeature } from "@milkdown/crepe";
import { editorViewOptionsCtx } from "@milkdown/kit/core";
import { getMarkdown, replaceAll } from "@milkdown/utils";

import { math } from "@milkdown/plugin-math";
import { diagram } from "@milkdown/plugin-diagram";

import { uploadImage } from "../../utils/api";

interface CrepeEditorProps {
  initialContent: string;
  onSave: (content: string) => void;
}

const CrepeEditor = ({ initialContent, onSave }: CrepeEditorProps) => {
  const crepeRef = useRef<Crepe | null>(null);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { settings } = useContext(SettingsContext);

  useEditor((root) => {
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
      },
    });

    crepe.editor.use(math as any).use(diagram as any);

    crepe.editor.config((ctx) => {
      ctx.update(editorViewOptionsCtx, (prev) => ({
        ...prev,
        handleDOMEvents: {
          ...prev.handleDOMEvents,
          keydown: (_view, event) => {
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

  return <Milkdown />;
};

export default CrepeEditor;
