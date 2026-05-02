import { useEffect, useRef } from "react";

import { Crepe } from "@milkdown/crepe";
import { math } from "@milkdown/plugin-math";
import { diagram } from "@milkdown/plugin-diagram";
import { Milkdown, useEditor } from "@milkdown/react";
import { editorViewOptionsCtx } from "@milkdown/kit/core";
import { getMarkdown, replaceAll } from "@milkdown/utils";

interface CrepeEditorProps {
  initialContent: string;
  onSave: (content: string) => void;
}

const CrepeEditor = ({ initialContent, onSave }: CrepeEditorProps) => {
  const crepeRef = useRef<Crepe | null>(null);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEditor((root) => {
    const crepe = new Crepe({
      root,
      defaultValue: initialContent,
      features: {
        "block-edit": true,
        table: true,
        "link-tooltip": true,
        [Crepe.Feature.Toolbar]: true,
        [Crepe.Feature.TopBar]: true,
        [Crepe.Feature.Cursor]: true,
      },
      featureConfigs: {
        [Crepe.Feature.Placeholder]: {
          text: "Please enter...",
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
