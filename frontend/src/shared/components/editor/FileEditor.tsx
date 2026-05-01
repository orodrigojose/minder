import { Crepe } from "@milkdown/crepe";
import { Milkdown, MilkdownProvider, useEditor } from "@milkdown/react";
import { getMarkdown, replaceAll } from "@milkdown/utils";
import { getNodeContent, updateFile } from "../../utils/api";
import { editorViewOptionsCtx } from "@milkdown/kit/core";
import { useState, useEffect, useRef } from "react";

import { math } from "@milkdown/plugin-math";
import { diagram } from "@milkdown/plugin-diagram";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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

export const FileEditor = ({
  id,
  setLoading,
  backgroundColor,
}: {
  id: string;
  loading?: boolean;
  backgroundColor: string;
  setLoading: (state: boolean) => void;
}) => {
  const [data, setData] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getNodeContent(id);

      if (response.status != 200) {
        toast.error(response.message);
        navigate("/");
      } else {
        setData(response.data);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSave = async (content: string) => {
    await updateFile(id, content ? content : "");
  };

  return (
    <div className="w-full h-full" style={{ backgroundColor }}>
      <MilkdownProvider>
        <div
          className="
            w-full h-full overflow-y-auto overflow-x-hidden
            [&::-webkit-scrollbar]:w-2
            [&::-webkit-scrollbar-track]:rounded-none
          [&::-webkit-scrollbar-track]:bg-gray-100
            [&::-webkit-scrollbar-thumb]:rounded-xl
            [&::-webkit-scrollbar-thumb]:cursor-grab
            [&::-webkit-scrollbar-thumb]:hover:bg-neutral-500/90
          [&::-webkit-scrollbar-thumb]:bg-gray-300
          dark:[&::-webkit-scrollbar-track]:bg-neutral-700/30
          dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500/50
          "
          style={{ backgroundColor }}
        >
          <CrepeEditor initialContent={data} onSave={handleSave} />
        </div>
      </MilkdownProvider>
    </div>
  );
};

export default FileEditor;
