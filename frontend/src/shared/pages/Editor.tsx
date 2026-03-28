import { useNavigate, useParams } from "react-router-dom";
import FileEditor from "../components/FileEditor";
import { useEffect } from "react";

const Editor = () => {
  const { file, id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (file == undefined || id == undefined) {
      navigate("/", { replace: true });
    }
  }, []);

  return (
    <main className="w-full h-full">
      <FileEditor file={file || ""} id={id || ""} />
    </main>
  );
};

export default Editor;
