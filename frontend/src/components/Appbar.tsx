import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";
import { useRecoilValue } from "recoil";
import { infoAtom } from "../store/atom/Information";

export const Appbar = () => {
  const user = useRecoilValue(infoAtom);

  return (
    <div className="border-b flex justify-between px-10 py-4">
      <div className=" flex flex-col justify-center font-extrabold text-lg md:text-xl">
        BUROGU
      </div>
      <div className="flex">
        <Link to={"/publish"} className="flex flex-col justify-center">
          <button
            type="button"
            className="mr-4 text-white bg-green-600 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-semibold rounded-full text-sm px-5 py-2.5 text-center "
          >
            New
          </button>
        </Link>
        <Avatar size={"big"} name={user.email} />
      </div>
    </div>
  );
};
