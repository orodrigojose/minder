import { BiNotepad } from "react-icons/bi";
import { MdBookOnline } from "react-icons/md";
import { RiMindMap } from "react-icons/ri";
import { Link } from "react-router-dom";

const Home = () => {
  const redirects = [
    { target: "/editor", icon: <MdBookOnline /> },
    { target: "/minder", icon: <RiMindMap /> },
  ];
  return (
    <section className="w-full h-full flex flex-col justify-center items-center gap-8 bg-mist-900 text-gray-200">
      <div className="flex justify-center items-center text-4xl">
        <BiNotepad />
        <h1>Minder</h1>
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <p>Welcome to the minder editor</p>
        <ul className="flex justify-center items-center gap-2">
          {redirects.map((action, key) => (
            <Link
              to={action.target}
              className="flex flex-col justify-center items-center gap-2 hover:brightness-110 hover:scale-105 transition-all border-3 rounded-lg border-neutral-200/40 p-4 text-2xl text-neutral-300"
              viewTransition
              key={key}
            >
              {action.icon}
            </Link>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Home;
