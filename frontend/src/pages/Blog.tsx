import { useParams } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { Avatar } from "../components/BlogCard";
import { useFetchBlog } from "../hooks";
import { Loading_Screen } from "../components/loader";

export const Blog = () => {
  const { id } = useParams();
  return (
    <div>
      <Appbar />
      <Blogpost id={id} />
    </div>
  );
};

const Blogpost = ({ id }: { id: string | undefined }) => {
  const { loading, blog } = useFetchBlog(id);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading_Screen />;
      </div>
    );
  }

  return (
    <div className="flex justify-center w-full">
      <div className="grid grid-rows-7 grid-cols-1 md:grid-cols-12 max-w-screen-xl px-10 w-full h-full md:grid-rows-1 pt-10">
        <div className="row-span-5 md:col-span-8 md:row-start-1">
          <div className="text-3xl sm:text-5xl font-extrabold">
            {/* title */}
            {blog.title || "Title 404 Not Found"}
          </div>
          <div className="text-slate-500 pt-4">
            {/* date */}
            Post on {blog.date}
          </div>
          <div className="pt-4 text-lg text-slate-700">
            {/* content */}
            <ContentHtml text={blog.content} />
          </div>
        </div>
        <div className="row-span-2 md:pl-8 md:col-span-4 md:row-start-1">
          <div className="text-gray-600 text-lg">Author</div>
          <div className="flex justify-items-start pl-4 pt-4">
            <div className="flex flex-col justify-center">
              <Avatar name={blog.author.name || "Unknown"} size="big" />
            </div>
            <div className="flex flex-col justify-center pl-4">
              <div className="text-xl font-bold">
                {/* Name */}
                {blog.author.name || "Author Name"}
              </div>
              <div className="text-slate-600">
                {/* Bio */}
                {blog.author.fun_fact || "No Fun Fact"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContentHtml = ({ text }: { text: string }) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: text || "Nothing Just Content is Empty Just Like Something 😑",
      }}
    />
  );
};
