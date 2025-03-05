import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "./BlogCard";
import { useRecoilValue } from "recoil";
import { infoAtom } from "../store/atom/Information";
import { useState, useEffect } from "react";
import add from "../assets/add.svg";
import sunIcon from "../assets/light.svg";
import sunIconHover from "../assets/light1.svg";
import moonIcon from "../assets/dark.svg";
import moonIconHover from "../assets/dark1.svg";

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
    <div className="border-b flex justify-between px-2 md:px-10 py-4 dark:bg-neutral-950 dark:border-gray-800">
      <div className="flex flex-col justify-center font-extrabold text-lg md:text-xl dark:text-white">
        <Link to={"/blogs"}>BUROGU</Link>
      </div>
      <div className="flex">
        <Darkmode />
        <Link to={"/publish"} className="mx-2 flex flex-col justify-center">
          <Addbutton />
        </Link>
        <div className="relative ">
          <button title="User" onClick={toggleMenu} className="menu-button">
            <Avatar size={"big"} name={user.name || user.email} />
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border rounded shadow-lg menu-content z-50">
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

const Addbutton = () => {
  return (
    <button
      className="group relative inline-flex h-10 w-10 items-center  justify-center overflow-hidden rounded-full bg-neutral-950 
      dark:bg-gray-200 font-medium text-neutral-200 dark:text-black transition-all duration-300 sm:hover:w-24
    hover:ring-offset-1 hover:ring-2 hover:ring-green-500  "
    >
      <div className="inline-flex whitespace-nowrap opacity-0 transition-all duration-200 sm:group-hover:-translate-x-3 sm:group-hover:opacity-100">
        New
      </div>
      <div className="absolute right-3.5">
        <img
          src={add}
          alt="add"
          className="h-7 relative left-1.5 filter dark:invert"
        />
      </div>
    </button>
  );
};

const Darkmode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className="flex items-center justify-center w-10 h-10 rounded-full bg-black dark:bg-white cursor-pointer border-2 border-gray-950"
      onClick={toggleDarkMode}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        boxShadow: isHovered
          ? isDarkMode
            ? "0 0 10px 2px orange"
            : "0 0 10px 2px blue"
          : "none",
      }}
    >
      <img
        src={
          isDarkMode
            ? isHovered
              ? sunIconHover
              : sunIcon
            : isHovered
            ? moonIconHover
            : moonIcon
        }
        alt="dark mode toggle"
        className="h-5 w-5 filter invert dark:invert-0"
      />
    </div>
  );
};
