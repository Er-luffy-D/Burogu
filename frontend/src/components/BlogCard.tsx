import { Link } from "react-router-dom";

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
  return (
    <Link to={`/blog/${id}`}>
      <div className="border-b-2 border-slate-200 p-2 w-screen max-w-screen-md cursor-pointer">
        <div className="flex align-middle ">
          <Avatar name={authorName} />
          <div className="font-normal pl-2">{authorName}</div>
          <div className="flex items-center px-2">
            <Circle />
          </div>
          <div className=" font-extralight text-slate-600">
            {publishedDate.split("T")[0]}
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
