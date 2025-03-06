import { useState, useCallback, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "../components/Button";
import { Appbar } from "../components/Appbar";
import { usePostBlog } from "../hooks";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Toasts } from "../components/Toasts";

export const Publish = () => {
  return (
    <>
      <Appbar />
      <div className="min-h-screen dark:bg-gray-800">
        <div className="flex justify-center w-full pt-10 ">
          <div className="max-w-screen-lg w-full">
            <div className="text-4xl font-bold text-center dark:text-neutral-300">
              Publish 📝
            </div>
          </div>
        </div>
        <div className="p-4">
          <Post />
        </div>
        <Toasts />
      </div>
    </>
  );
};

export const Post = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const { BlogPost, loading, message, status } = usePostBlog(title, content);

  const notify = useCallback(() => {
    if (status === "1") {
      toast.dismiss();
      toast.success("Post Success", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } else if (status === "2") {
      toast.dismiss();
      toast.error("Post Failed", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
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

  const handleEditorChange = useCallback((value: string) => {
    setContent(value);
  }, []);

  return (
    <div>
      <div className="flex justify-center w-full my-6 ">
        <div className="max-w-screen-lg w-full  ">
          <div className="flex flex-col">
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4 dark:bg-zinc-900 dark:border-neutral-700 dark:text-white"
              placeholder="Title"
              required
            />
            <ReactQuill
              theme="snow"
              value={content}
              onChange={handleEditorChange}
              placeholder="I'm Feeling Lucky"
              className=" text-gray-900 text-sm rounded-lg  block w-full  mb-4 dark:bg-zinc-900  dark:text-white"
            />
            <div className="flex justify-center mt-2">
              <Button
                text="Post"
                onClick={BlogPost}
                variant="other"
                loading={loading}
              ></Button>
            </div>
            {message && (
              <div className="mt-2 text-center dark:text-white">{message}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
