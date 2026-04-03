import { FaRegStickyNote } from "react-icons/fa";
import type { INode } from "../types/types";
import {
  useState,
  useMemo,
  useRef,
  useEffect,
  type KeyboardEvent,
} from "react";
import Fuse from "fuse.js";

interface FileSearchProps {
  files: INode[];
  onSelect: (id: string) => void;
  onClose: () => void;
}

const FileSearch = ({ files, onSelect, onClose }: FileSearchProps) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);

  const fuse = useMemo(
    () =>
      new Fuse(files, {
        keys: ["file", "id"],
        threshold: 0.4,
      }),
    [files],
  );

  const results = useMemo(() => {
    if (!query.trim()) return files.slice(0, 8);
    return fuse.search(query).map((r) => r.item);
  }, [query, files, fuse]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (listRef.current && listRef.current.children[selectedIndex]) {
      const actived = listRef.current.children[selectedIndex] as HTMLElement;
      actived.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results.length > 0) {
        onSelect(results[selectedIndex].id);
        onClose();
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-[#1e1e1e] border border-white/10 rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center px-4 border-b border-white/10">
          <span className="text-gray-500">fzf:</span>
          <input
            autoFocus
            className="w-full p-4 bg-transparent text-white outline-none placeholder:text-gray-600"
            placeholder="Search files..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        <ul className="max-h-80 overflow-y-auto" ref={listRef}>
          {results.map((file, index) => {
            const isSelected = index === selectedIndex;

            return (
              <li
                key={file.id}
                onClick={() => {
                  onSelect(file.id);
                  onClose();
                }}
                onMouseEnter={() => setSelectedIndex(index)}
                className={`px-4 py-3 hover:bg-blue-600/20 text-gray-300 hover:text-white cursor-pointer flex items-center justify-baseline gap-3 transition-colors
                ${
                  isSelected
                    ? "bg-purple-600/20 text-white"
                    : "text-gray-300 hover:bg-blue-600/20 hover:text-white"
                }`}
              >
                <FaRegStickyNote className="opacity-65" />
                {file.file}
              </li>
            );
          })}
          {results.length === 0 && (
            <li className="p-4 text-gray-500 text-center">No files found.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default FileSearch;
