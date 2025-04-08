import { useNavigate, useParams } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { Avatar } from "../components/BlogCard";
import { useFetchBlog } from "../hooks";
import { Loading_Screen } from "../components/loader";
import { Reveal } from "../components/Animation";
import { Bounce, toast } from "react-toastify";
import { PROD_BACKEND_URL } from "../config";
import axios from "axios";
import { Toasts } from "../components/Toasts";
import { useRecoilValue } from "recoil";
import { infoAtom } from "../store/atom/Information";

export const Blog = () => {
  const { id } = useParams();
  return (
    <div>
      <Appbar />
      <Blogpost id={id} />
      <Toasts />
    </div>
  );
};
const Blogpost = ({ id }: { id: string | undefined }) => {
  const user = useRecoilValue(infoAtom);
  const requestDelete = async () => {
    try {
      const response = await axios.post(
        `${PROD_BACKEND_URL}/api/v1/blog/delete`,
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
  const { loading, blog } = useFetchBlog(id);
  const navigate = useNavigate();
  const handleDeleteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    toast.promise(
      requestDelete().then(() => {
        setTimeout(() => {
          navigate("/blogs");
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen dark:bg-gradient-to-b dark:from-gray-800   dark:to-slate-950">
        <Loading_Screen />
      </div>
    );
  }

  return (
    <div className="flex justify-center w-full dark:bg-gradient-to-b dark:from-gray-800   dark:to-slate-950 min-h-screen ">
      <div className="grid grid-rows-7 grid-cols-1 md:grid-cols-12 max-w-screen-xl px-10 w-full h-full md:grid-rows-1 pt-10 min-h-screen dark:bg-black/25  ">
        <div className="row-span-5 md:col-span-8 md:row-start-1 md:border-r-2 md:border-b-0 border-b-2  border-slate-300 dark:border-slate-700 md:pr-8 pr-0">
          <div className="text-3xl sm:text-5xl font-extrabold dark:text-slate-100">
            {/* title */}
            <Reveal>{blog.title || "Title 404 Not Found"}</Reveal>
          </div>
          <div className="text-slate-500 dark:text-slate-400 pt-4">
            {/* date */}
            <Reveal>Post on {blog.date}</Reveal>
          </div>
          <div className="pt-4 text-lg text-slate-700 dark:text-slate-200">
            {/* content */}
            <Reveal>
              <ContentHtml text={blog.content} />
            </Reveal>
          </div>
        </div>
        <div className="row-span-2 pl-0 md:pl-8 md:col-span-4 md:row-start-1 pt-8 md:pt-0">
          <div className="text-gray-600 text-lg dark:text-slate-300">
            <Reveal>Author</Reveal>
          </div>
          <div className="flex justify-items-start pl-4 pt-4">
            <div className="flex flex-col justify-center ">
              <Reveal>
                <Avatar name={blog.author.name || "Unknown"} size="big" />
              </Reveal>
            </div>
            <div className="flex flex-col justify-center pl-4">
              <div className="text-xl font-bold dark:text-slate-100">
                {/* Name */}
                <Reveal>{blog.author.name || "Author Name"}</Reveal>
              </div>
              <div className="text-slate-600 dark:text-slate-500">
                {/* Bio */}
                <Reveal>{blog.author.fun_fact || "No Fun Fact"}</Reveal>
              </div>
            </div>
          </div>
          {blog.author.id === user.id && (
            <Reveal>
              <div className="flex flex-wrap  align-middle mt-5 ml-3">
                <Reveal>
                  <button
                    className=" m-2 relative overflow-hidden rounded-md text-xs bg-red-500 dark:bg-red-800 px-4 py-1.5  text-white transition-all duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] active:-translate-y-1 active:scale-x-90 active:scale-y-110"
                    onClick={handleDeleteClick}
                  >
                    Delete
                  </button>
                </Reveal>
                <Reveal>
                  <button
                    className=" m-2 relative overflow-hidden rounded-md text-xs bg-slate-400 dark:bg-slate-300 px-4 py-1.5 text-black  transition-all duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] active:-translate-y-1 active:scale-x-90 active:scale-y-110"
                    onClick={() => navigate(`/edit/${id}`)}
                  >
                    Edit
                  </button>
                </Reveal>
              </div>
            </Reveal>
          )}
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
