import axios from "axios";
import { Link } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { DEV_BACKEND_URL } from "../config";
interface BlogCardProps {
  id: string;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  edited: boolean;
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
  edited,
}: BlogCardProps) => {
  const requestDelete = async () => {
    try {
      const response = await axios.post(
        `${DEV_BACKEND_URL}/api/v1/blog/delete`,
        { id: id },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const handleDeleteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    toast.promise(
      requestDelete().then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }),
      {
        pending: "Deleting...",
        success: "Deleted",
        error: "Error",
      },
      {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      }
    );
  };

  return (
    <Link to={`/blog/${id}`}>
      <div className="border-b-2 border-slate-200 p-4 w-screen max-w-screen-md cursor-pointer">
        <div className="flex align-middle justify-between ">
          <div className="flex align-middle">
            <Avatar name={authorName} />
            <div className="font-normal pl-2">{authorName}</div>
            <div className="flex items-center px-2">
              <Circle />
            </div>
            <div className=" font-extralight text-slate-600">
              {publishedDate.split("T")[0]}
            </div>
          </div>
          <div className="flex align-middle">
            <button
              className="relative overflow-hidden rounded-md text-xs bg-neutral-950 px-4 py-1.5 text-white transition-all duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] active:-translate-y-1 active:scale-x-90 active:scale-y-110"
              onClick={handleDeleteClick}
            >
              Delete
            </button>
          </div>
        </div>
        <div className="text-xl font-bold pt-2">{title}</div>
        <div className="text-base font-thin ">
          {content.slice(0, 100) + "..."}
        </div>
        <div className="flex justify-between pt-4">
          <div className="text-slate-400 text-sm">{`${Math.ceil(
            content.length / 300
          )} min(s) read`}</div>

          {edited ? (
            <div className="text-sm text-slate-600 px-3 border-2 rounded-full bg-zinc-200 ">
              Edited
            </div>
          ) : undefined}
        </div>
      </div>
    </Link>
  );
};

function Circle() {
  return <div className="h-1 w-1 bg-slate-400 rounded-full"></div>;
}

export function Avatar({
  name = "U",
  size = "small",
}: {
  name?: string;
  size?: "big" | "small";
}) {
  return (
    <div className="flex flex-col justify-center">
      <div
        className={`relative inline-flex items-center justify-center ${
          size === "small" ? "w-5 h-5 " : "w-10 h-10"
        } overflow-hidden bg-gray-100 rounded-full dark:bg-blue-950 `}
      >
        <span
          className={`${
            size == "small" ? "text-sm font-light " : "text-xl font-semibold"
          } text-gray-600 dark:text-gray-300`}
        >
          {name[0].toUpperCase()}
        </span>
      </div>
    </div>
  );
}
