import Sidebar from "../components/sidebar/Sidebar.tsx";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <section className="w-full h-full flex">
      <Sidebar />
      <Toaster />
      <main className="w-full h-full">
        <Outlet />
      </main>
    </section>
  );
};

export default Layout;
