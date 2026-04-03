import { Crepe } from "@milkdown/crepe";
import { Milkdown, MilkdownProvider, useEditor } from "@milkdown/react";
import { getMarkdown, replaceAll } from "@milkdown/utils";
import { getNodeContent, updateFile } from "../utils/api";
import { editorViewOptionsCtx } from "@milkdown/kit/core";
import { useState, useEffect, useRef } from "react";

interface CrepeEditorProps {
  initialContent: string;
  onSave: (content: string) => void;
}

const CrepeEditor = ({ initialContent, onSave }: CrepeEditorProps) => {
  const crepeRef = useRef<Crepe | null>(null);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEditor((root) => {
    const crepe = new Crepe({ root, defaultValue: initialContent });

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

export const FileEditor = ({
  id,
  setLoading,
}: {
  id: string;
  loading?: boolean;
  setLoading: (state: boolean) => void;
}) => {
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getNodeContent(id);
      setData(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleSave = async (content: string) => await updateFile(id, content);

  return (
    <div className="w-full h-full bg-[#1a1a1a]">
      <MilkdownProvider>
        <div className="w-full h-full px-10 py-4 overflow-y-auto">
          <CrepeEditor initialContent={data} onSave={handleSave} />
        </div>
      </MilkdownProvider>
    </div>
  );
};

export default FileEditor;
