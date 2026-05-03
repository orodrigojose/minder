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
    <section className="w-full h-full flex flex-col justify-center items-center gap-8 bg-neutral-950 text-gray-200">
      <div className="flex items-center ">
        <div className="transition-all w-54 flex items-center jusitfy-center">
          <img src="/assets/logo.png" className="" />
        </div>
        <h1 className="text-8xl font-mono">{settings.titleText}</h1>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 text-gray-400">
        <p className="font-medium p-2">{settings.welcomeText}</p>
        <ul className="flex flex-col justify-center  items-start">
          {redirects.map((action, key) => (
            <Link
              to={action.target}
              className="flex justify-center items-center gap-2 p-1 font-mono hover:text-gray-50 hover:scale-110 transition-all cursor-pointer"
              viewTransition
              key={key}
            >
              {action.icon} <p>{action.label}</p>
            </Link>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Home;
