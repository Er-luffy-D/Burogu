import axios from "axios";
import { useEffect, useState } from "react";
import { DEV_BACKEND_URL } from "../config";

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

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
