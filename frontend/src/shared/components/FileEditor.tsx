import { Crepe } from "@milkdown/crepe";
import { Milkdown, MilkdownProvider, useEditor } from "@milkdown/react";
import { replaceAll } from "@milkdown/utils";
import { useState, useEffect, useRef } from "react";
import { getNodeContent } from "../utils/api";

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

export const FileEditor = ({ id }: { id: string }) => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getNodeContent(id);
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
