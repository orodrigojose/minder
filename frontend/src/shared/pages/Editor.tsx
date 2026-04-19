import { useNavigate, useParams } from "react-router-dom";
import FileEditor from "../components/editor/FileEditor";
import { useEffect, useState } from "react";
import Navbar from "../components/editor/Navbar";
import Loading from "../components/editor/Loading";
import toast from "react-hot-toast";
import { CiWarning } from "react-icons/ci";

const Editor = () => {
  const [loading, setLoading] = useState(true);
  const [showLoadingLayer, setShowLoadingLayer] = useState(true);
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (id == undefined) {
      toast("Cannot find node", {
        icon: <CiWarning />,
      });

      navigate("/minder");
    }
  }, []);

  useEffect(() => {
    if (loading) {
      setShowLoadingLayer(true);
      return;
    }

    const hideTimeout = setTimeout(() => {
      setShowLoadingLayer(false);
    }, 350);

    return () => clearTimeout(hideTimeout);
  }, [loading]);

  return (
    <main className="flex flex-col w-full h-screen bg-[#1a1a1a] overflow-hidden">
      <Navbar />
      <div className="flex-1 relative overflow-hidden">
        <div
          className={`h-full w-full transition-opacity duration-500 ease-out ${
            loading ? "opacity-0" : "opacity-100"
          }`}
        >
          <FileEditor id={id || ""} loading={loading} setLoading={setLoading} />
        </div>

        {showLoadingLayer && (
          <div
            className={`absolute inset-0 z-10 transition-opacity duration-400 ease-out ${
              loading ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <Loading />
          </div>
        )}
      </div>
    </main>
  );
};

export default Editor;
