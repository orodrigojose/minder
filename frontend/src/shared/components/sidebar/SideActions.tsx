import { RiMindMap } from "react-icons/ri";
import { MdSettings, MdBookOnline } from "react-icons/md";
import { Link } from "react-router-dom";

const SideActions = () => {
  const actions = [
    { target: "/editor", icon: <MdBookOnline />, label: "editor" },
    { target: "/minder", icon: <RiMindMap />, label: "Mindmap" },
  ];
  return (
    <div className="flex flex-col items-center justify-between py-4 p-1 gap-4 text-2xl bg-neutral-900 text-gray-100 shadow-xl">
      <main className="flex flex-col items-center justify-center gap-4">
        {actions.map((action, key) => (
          <Link
            to={action.target}
            className="flex flex-col justify-center items-center gap-2 hover:brightness-110 hover:scale-105 transition-all"
            viewTransition
            key={key}
          >
            {action.icon}
            <span className="text-[8pt] font-mono px-2 text-pretty text-gray-300">
              {action.label}
            </span>
          </Link>
        ))}
      </main>
      <footer>
        <MdSettings />
      </footer>
    </div>
  );
};

export default SideActions;
