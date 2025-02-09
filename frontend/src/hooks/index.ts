import axios from "axios";
import { useEffect, useState, useCallback, useMemo } from "react";
import { DEV_BACKEND_URL } from "../config";
import { useSetRecoilState } from "recoil";
import { infoAtom } from "../store/atom/Information";
import CryptoJS from "crypto-js";
import { blogsStructure } from "../pages/Blogs";

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<blogsStructure[]>([]);

  useEffect(() => {
    axios
      .get(`${DEV_BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setBlogs(res.data.blogs);
        setLoading(false);
      });
  }, []);
  return {
    loading,
    blogs,
  };
};

export const usePostBlog = (title: string, content: string) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const input = useMemo(
    () => ({
      title: title,
      content: content,
    }),
    [title, content]
  );

  const BlogPost = useCallback(() => {
    setLoading(true);
    setMessage("");
    axios
      .post(`${DEV_BACKEND_URL}/api/v1/blog`, input, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setMessage("Blog post created successfully!");
      })
      .catch((err) => {
        console.log(err);
        setMessage("Failed to create blog post. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [input]);

  return {
    BlogPost,
    loading,
    message,
  };
};

export const usePutBlog = (title: string, content: string, id: string) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const input = useMemo(
    () => ({
      title: title,
      content: content,
      id: id,
    }),
    [title, content, id]
  );

  const BlogPut = useCallback(() => {
    setLoading(true);
    setMessage("");
    axios
      .put(`${DEV_BACKEND_URL}/api/v1/blog`, input, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setMessage("Blog post updated successfully!");
      })
      .catch((err) => {
        console.log(err);
        setMessage("Failed to update blog post. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [input]);

  return {
    BlogPut,
    loading,
    message,
  };
};

export const useFetchBlog = (id: string) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<{
    title: string;
    id: string;
    published: boolean;
    content: string;
    date: string;
    edited: boolean;
    author: {
      name: string;
    };
  }>({
    title: "",
    id: "",
    published: false,
    content: "",
    date: "",
    edited: false,
    author: { name: "" },
  });

  useEffect(() => {
    axios
      .get(`${DEV_BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setBlog(res.data.blog);
        setLoading(false);
      });
  }, [id]);
  return {
    loading,
    blog,
  };
};

export const useFetchUserInfo = () => {
  const setInfo = useSetRecoilState(infoAtom);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          localStorage.removeItem("user_info");
          console.log("No token found");
          return;
        }

        const cachedUser = localStorage.getItem("user_info");
        if (cachedUser) {
          const bytes = CryptoJS.AES.decrypt(cachedUser, "secret_key");
          const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
          setInfo(decryptedData);
        } else {
          const response = await axios.get(
            `${DEV_BACKEND_URL}/api/v1/user/me`,
            {
              headers: {
                Authorization: token,
              },
            }
          );
          const encryptedData = CryptoJS.AES.encrypt(
            JSON.stringify(response.data.user),
            "secret_key"
          ).toString();
          localStorage.setItem("user_info", encryptedData);
          setInfo(response.data.user);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        localStorage.removeItem("user_info");
      }
    };

    fetchUserInfo();
  }, [setInfo]);
};
