import { useContext } from "react";
import { MdBookOnline } from "react-icons/md";
import { RiMindMap } from "react-icons/ri";
import { Link } from "react-router-dom";
import { SettingsContext } from "../contexts/SettingsContext";

const Home = () => {
  const { settings } = useContext(SettingsContext);

  const redirects = [
    { target: "/editor", icon: <MdBookOnline />, label: "Editor" },
    { target: "/minder", icon: <RiMindMap />, label: "Mindmap" },
  ];

  return (
    <section className="minder-home w-full h-full flex items-center justify-center px-6 py-12">
      <div className="relative z-10 w-full max-w-3xl">
        <div className="flex flex-col items-start gap-4">
          <img
            src="/assets/logo.png"
            className="minder-logo h-28 w-28 object-contain opacity-95"
          />
          <div>
            <h1 className="text-4xl md:text-5xl font-mono font-semibold tracking-tight text-gray-100">
              {settings.titleText}
            </h1>
          </div>
        </div>

        <div className="mt-4 max-w-2xl text-sm md:text-base text-gray-400 leading-relaxed">
          {settings.welcomeText}
        </div>

        <div className="mt-8 border-t border-white/10 pt-5">
          <div className="flex flex-col gap-2">
            {redirects.map((action, key) => (
              <Link
                to={action.target}
                className="group flex items-center gap-3 text-sm text-gray-300 transition-colors hover:text-gray-50"
                viewTransition
                key={key}
              >
                <span className="text-gray-500 group-hover:text-gray-200 transition-colors">
                  {action.icon}
                </span>
                <span className="font-mono">{action.label}</span>
                <span className="text-gray-600">/</span>
                <span className="text-xs text-gray-500 group-hover:text-gray-300 transition-colors">
                  open
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
