import { Outlet } from "react-router-dom";

import Sidebar from "../components/sidebar/Sidebar.tsx";
import SettingsContextProvider from "../contexts/SettingsContext.tsx";

import { Toaster } from "react-hot-toast";
import { toastOptions } from "../utils/toastOptions.ts";

const Layout = () => {
  return (
    <SettingsContextProvider>
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
    </SettingsContextProvider>
  );
};

export default Layout;
