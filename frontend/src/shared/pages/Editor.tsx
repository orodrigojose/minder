import { useNavigate, useParams } from "react-router-dom";
import FileEditor from "../components/editor/FileEditor";
import { useEffect, useState } from "react";
import Navbar from "../components/editor/Navbar";
import Loading from "../components/editor/Loading";
import toast from "react-hot-toast";
import { CiWarning } from "react-icons/ci";

const Editor = () => {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id == undefined) {
      toast("Cannot find node", {
        icon: <CiWarning />,
      });
      navigate("/", { replace: true });
    }
  }, []);

  return (
    <main className="flex flex-col w-full h-screen bg-[#1a1a1a] overflow-hidden">
      <Navbar />
      <div className="flex-1 relative overflow-hidden">
        {loading && <Loading />}
        <FileEditor id={id || ""} loading={loading} setLoading={setLoading} />
      </div>
    </main>
  );
};

export default Editor;
