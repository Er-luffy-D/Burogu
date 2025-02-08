import { useState, useCallback } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "../components/Button";
import { Appbar } from "../components/Appbar";
import { usePost } from "../hooks";

export const Publish = () => {
  return (
    <>
      <Appbar />
      <Post />
    </>
  );
};

export const Post = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const { BlogPost, loading, message } = usePost(title, content);

  const handleEditorChange = useCallback((value: string) => {
    setContent(value);
  }, []);

  return (
    <div>
      <div className="flex justify-center w-full my-6">
        <div className="max-w-screen-lg w-full ">
          <div className="flex flex-col">
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4"
              placeholder="Title"
              required
            />
            <ReactQuill
              theme="snow"
              value={content}
              onChange={handleEditorChange}
              placeholder="I'm Feeling Lucky"
            />
            <div className="flex justify-center mt-2">
              <Button
                text="Post"
                onClick={BlogPost}
                variant="other"
                loading={loading}
              ></Button>
            </div>
            {message && <div className="mt-2 text-center">{message}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};
