import Sidebar from "../components/sidebar/Sidebar.tsx";
import { GiStabbedNote } from "react-icons/gi";
import { CgSpinner } from "react-icons/cg";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { MdError } from "react-icons/md";

const Layout = () => {
  return (
    <section className="w-full h-full flex">
      <Sidebar />
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          icon: <GiStabbedNote />,
          duration: 4000,
          style: {
            background: "#18181b", // Cinza Zinco muito escuro
            color: "#f4f4f5", // Branco acinzentado (menos cansaço visual)
            padding: "12px 16px",
            borderRadius: "10px",
            fontSize: "14px",
            fontWeight: "500",
            border: "1px solid #27272a",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.4)",
          },

          success: {
            icon: <FaCheck />,
            style: {
              border: "1px solid #10b981",
            },
            iconTheme: {
              primary: "#10b981",
              secondary: "#18181b",
            },
          },

          error: {
            icon: <MdError />,
            style: {
              border: "1px solid #ef4444",
            },
            iconTheme: {
              primary: "#ef4444",
              secondary: "#18181b",
            },
          },

          loading: {
            icon: <CgSpinner className="animate-spin" size={20} color="#3b82f6" />,
            style: {
              border: "1px solid #3b82f6",
            },
            iconTheme: {
              primary: "#3b82f6",
              secondary: "#18181b",
            },
          },

          blank: {
            style: {
              border: "1px solid #71717a",
            },
          },
        }}
      />
      <main className="w-full h-full">
        <Outlet />
      </main>
    </section>
  );
};

export default Layout;
