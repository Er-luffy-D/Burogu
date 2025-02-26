import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "./BlogCard";
import { useRecoilValue } from "recoil";
import { infoAtom } from "../store/atom/Information";
import { useState, useEffect } from "react";

export const Appbar = () => {
  const user = useRecoilValue(infoAtom);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".menu-button") && !target.closest(".menu-content")) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="border-b flex justify-between px-2 md:px-10 py-4">
      <div className="flex flex-col justify-center font-extrabold text-lg md:text-xl">
        <Link to={"/blogs"}>BUROGU</Link>
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
        <div className="relative">
          <button title="User" onClick={toggleMenu} className="menu-button">
            <Avatar size={"big"} name={user.name || user.email} />
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border rounded shadow-lg menu-content">
              <Link
                to="/profile"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                onClick={closeMenu}
              >
                Profile
              </Link>
              <Link
                to="/MyBlogs"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                onClick={closeMenu}
              >
                My Blogs
              </Link>
              <button
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("user_info");
                  closeMenu();
                  navigate("/signin");
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
