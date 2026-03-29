import { useNavigate, useParams } from "react-router-dom";
import FileEditor from "../components/FileEditor";
import { useEffect } from "react";

const Editor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id == undefined) {
      navigate("/", { replace: true });
    }
  }, []);

  return (
    <main className="w-full h-full">
      <FileEditor id={id || ""} />
    </main>
  );
};

export default Editor;
