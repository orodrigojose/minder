import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteUploadedImage,
  getNodeContent,
  updateFile,
} from "../../utils/api";

import CrepeEditor from "./CrepeEditor";
import { MilkdownProvider } from "@milkdown/react";

import toast from "react-hot-toast";

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
  const lastSavedContentRef = useRef("");
  const navigate = useNavigate();

  const extractUploadedImageFiles = (content: string) => {
    const matches = content.match(/!\[[^\]]*\]\(([^)]+)\)/g) ?? [];

    return matches
      .map((match) => match.match(/!\[[^\]]*\]\(([^)]+)\)/)?.[1])
      .filter((url): url is string => Boolean(url))
      .map((url) => {
        try {
          const parsedUrl = new URL(url, window.location.origin);

          if (!parsedUrl.pathname.startsWith("/uploads/")) {
            return null;
          }

          return parsedUrl.pathname.split("/").pop() ?? null;
        } catch {
          return null;
        }
      })
      .filter((fileName): fileName is string => Boolean(fileName));
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getNodeContent(id);

      if (response.status != 200) {
        toast.error(response.message);
        navigate("/");
      } else {
        setData(response.data);
        lastSavedContentRef.current = response.data;
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSave = async (content: string) => {
    const previousContent = lastSavedContentRef.current;
    const nextContent = content ? content : "";

    await updateFile(id, nextContent);

    const previousUploads = new Set(extractUploadedImageFiles(previousContent));
    const nextUploads = new Set(extractUploadedImageFiles(nextContent));
    const removedUploads = [...previousUploads].filter(
      (fileName) => !nextUploads.has(fileName)
    );

    await Promise.all(
      removedUploads.map(async (fileName) => {
        try {
          await deleteUploadedImage(fileName);
        } catch (error) {
          console.error("Failed to delete uploaded image", fileName, error);
        }
      })
    );

    lastSavedContentRef.current = nextContent;
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
