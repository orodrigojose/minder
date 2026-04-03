import { useNavigate, useParams } from "react-router-dom";
import FileEditor from "../components/FileEditor";
import { useEffect, useState } from "react";
import Navbar from "../components/editor/Navbar";
import Loading from "../components/Loading";
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
    <main className="w-full h-full bg-[#1a1a1a]">
      <Navbar />
      {loading && <Loading />}
      <FileEditor id={id || ""} loading={loading} setLoading={setLoading} />
    </main>
  );
};

export default Editor;
