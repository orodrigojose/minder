import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar.tsx";
import { toastOptions } from "../utils/toastOptions.ts";

const Layout = () => {
  return (
    <section className="w-full h-full flex min-w-0 overflow-hidden">
      <Sidebar />
      <main className="w-full h-screen min-w-0 bg-neutral-900">
        <Toaster
          position="bottom-center"
          reverseOrder={false}
          toastOptions={toastOptions}
        />
        <Outlet />
      </main>
    </section>
  );
};

export default Layout;
