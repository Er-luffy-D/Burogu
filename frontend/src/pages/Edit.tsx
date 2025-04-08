import { useState, useCallback, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "../components/Button";
import { Appbar } from "../components/Appbar";
import { useFetchBlog, usePutBlog } from "../hooks";
import { useNavigate, useParams } from "react-router-dom";
import { Toasts } from "../components/Toasts";
import { Loading_Screen } from "../components/loader";
import { Bounce, toast } from "react-toastify";

export const Edit = () => {
  const { id } = useParams();
  const { loading, blog } = useFetchBlog(id);

  if (loading) {
    return (
      <div>
        <Appbar />
        <div className="flex justify-center items-center h-screen dark:bg-gradient-to-b dark:from-gray-800   dark:to-slate-950">
          <Loading_Screen />
        </div>
      </div>
    );
  }
  return (
    <>
      <Appbar />
      <div className="min-h-screen dark:bg-gray-800">
        <div className="flex justify-center w-full pt-10 ">
          <div className="max-w-screen-lg w-full">
            <div className="text-4xl font-bold text-center dark:text-neutral-300">
              Edit 📝
            </div>
          </div>
        </div>
        <div className="p-4">
          <EditPost
            title={blog.title}
            content={blog.content}
            id={id as string}
          />
        </div>
        <Toasts />
      </div>
    </>
  );
};

export const EditPost = ({
  title,
  content,
  id,
}: {
  title: string;
  content: string;
  id: string;
}) => {
  const [conte, setContent] = useState(content);
  const [titl, setTitle] = useState(title);
  const navigate = useNavigate();

  const { BlogPut, loading, status } = usePutBlog(titl, conte, id);

  const notify = useCallback(() => {
    if (status === "1") {
      toast.dismiss();
      toast.success("Post updated successfully!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } else if (status === "2") {
      toast.dismiss();
      toast.error("Failed to update post. Please try again.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  }, [status]);

  useEffect(() => {
    notify();
    if (status === "1") {
      const timer = setTimeout(() => {
        navigate("/blogs");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [status, navigate, notify]);

  return (
    <div>
      <div className="flex justify-center w-full my-6">
        <div className="max-w-screen-lg w-full">
          <div className="flex flex-col">
            <input
              type="text"
              value={titl}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4 dark:bg-zinc-900 dark:border-neutral-700 dark:text-white"
              placeholder="Title"
              required
            />
            <ReactQuill
              theme="snow"
              value={conte}
              onChange={setContent}
              placeholder="I'm Feeling Lucky"
              className="text-gray-900 text-sm rounded-lg block w-full mb-4 dark:bg-zinc-900 dark:text-white"
            />
            <div className="flex justify-center mt-2">
              <Button
                text="Update Post"
                onClick={BlogPut}
                variant="other"
                loading={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
