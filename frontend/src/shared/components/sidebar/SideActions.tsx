import { Link, useLocation } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { PiKanban } from "react-icons/pi";
import { RiMindMap } from "react-icons/ri";
import { BiCalendar } from "react-icons/bi";
import { MdSettings, MdBookOnline } from "react-icons/md";

const SideActions = () => {
  const { pathname } = useLocation();
  const selectedStyle = "text-white scale-105 text-bold";

  const actions = [
    {
      target: "/",
      icon: <FaHome />,
      label: "home",
      enable: true,
    },
    {
      target: "/editor",
      icon: <MdBookOnline />,
      label: "editor",
      enable: true,
    },
    { target: "/minder", icon: <RiMindMap />, label: "Mindmap", enable: true },
    {
      target: "/calendar",
      icon: <BiCalendar />,
      label: "calendar",
      enable: false,
    },
    { target: "/kanban", icon: <PiKanban />, label: "Board", enable: false },
  ];
  return (
    <div className="flex flex-col items-center justify-between py-4 p-1 gap-4 text-2xl">
      <main className="flex flex-col items-center justify-center gap-4">
        {actions.map((action, key) => (
          <Link
            to={action.enable ? action.target : ""}
            className={`
              flex flex-col justify-center items-center gap-2 
              ${!action.enable ? "opacity-15 cursor-no-drop" : " hover:text-gray-300 hover:scale-105 transition-all"}
              ${action.target == `/${pathname.split("/")[1]}` ? selectedStyle : ""}
            `}
            viewTransition
            key={key}
          >
            {action.icon}
            <span className="text-[8pt] font-mono px-2 text-pretty text-gray-400/80">
              {action.label}
            </span>
          </Link>
        ))}
      </main>
      <footer>
        <Link
          to="/settings"
          className={`
            flex flex-col justify-center items-center gap-2
            text-gray-400
            hover:brightness-110 hover:scale-105 transition-all
              ${"/settings" === pathname ? selectedStyle : ""}`}
          viewTransition
        >
          <MdSettings />
        </Link>
      </footer>
    </div>
  );
};

export default SideActions;
