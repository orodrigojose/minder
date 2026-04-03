import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full justify-around text-gray-300 px-4 py-2 static shadow-xl/85 shadow-neutral-950 border-b-neutral-950/25 border-b-2">
      <Link
        to="/minder"
        className="text-2xl hover:text-gray-200 hover:scale-110 transition-all"
        viewTransition
      >
        <BiArrowBack />
      </Link>
    </nav>
  );
};

export default Navbar;
