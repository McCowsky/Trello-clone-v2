import { Link } from "@tanstack/react-location";
import { FaTrello } from "react-icons/Fa";

const Navbar: React.FC = () => {
  return (
    <div className="w-full flex h-11 items-center text-xl font-semibold gap-1 my-0 mx-auto bg-black/[.16] text-white">
      <Link
        to="/"
        className="flex items-center hover:bg-white/30 my-[6px] px-[6px] ml-8 gap-1 font-bold text-xl h-8"
      >
        <FaTrello className="text-base" />
        Trello
      </Link>
      <Link
        to="/Board "
        className=" flex items-center hover:bg-white/30 my-[6px] text-sm px-2 h-8"
      >
        Workspace
      </Link>
    </div>
  );
};

export default Navbar;
