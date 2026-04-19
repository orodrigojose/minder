import Mindmap from "../components/mindmap/Mindmap";
import { ReactFlowProvider, useReactFlow } from "@xyflow/react";
import { useEffect, useState } from "react";
import FileSearch from "../components/ui/Fzf";
import { getNodes } from "../utils/api";

function MinderContent() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [fileList, setFileList] = useState([]);
  const { fitView } = useReactFlow();

  const handleFocus = (id: string) =>
    fitView({ nodes: [{ id }], duration: 800, padding: 0.5 });

  useEffect(() => {
    const fetchData = async () => {
      const response = await getNodes();
      setFileList(response.data);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "p") {
        e.preventDefault();
        setIsSearchOpen((prev: any) => !prev);
        fetchData();
      }
      if (e.key === "Escape") setIsSearchOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="h-screen w-full bg-neutral-200 flex flex-col">
      {isSearchOpen && (
        <FileSearch
          files={fileList}
          onSelect={(id) => handleFocus(id)}
          onClose={() => setIsSearchOpen(false)}
        />
      )}
      <Mindmap />
    </div>
  );
}

export default function Minder() {
  return (
    <ReactFlowProvider>
      <MinderContent />
    </ReactFlowProvider>
  );
}
