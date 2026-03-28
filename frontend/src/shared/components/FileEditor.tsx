import { Crepe } from "@milkdown/crepe";
import { Milkdown, MilkdownProvider, useEditor } from "@milkdown/react";
import { replaceAll } from "@milkdown/utils";
import { useState, useEffect, useRef } from "react";

const CrepeEditor = ({ initialContent }: { initialContent: string }) => {
  const crepeRef = useRef<Crepe | null>(null);

  const { get } = useEditor((root) => {
    const crepe = new Crepe({ root, defaultValue: initialContent });
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

export const FileEditor = ({ file, id }: { file: string; id: string }) => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:8080/node/file/${file}/${id}`,
      );
      const data = await response.text();
      setData(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading editor content...</div>;

  return (
    <div className="w-full h-screen bg-[#1a1a1a]">
      <MilkdownProvider>
        <div className="w-full h-screen px-10 py-4 overflow-y-auto">
          <CrepeEditor initialContent={data} />
        </div>
      </MilkdownProvider>
    </div>
  );
};

export default FileEditor;
