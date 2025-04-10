import { useRecoilValue } from "recoil";
import { Appbar } from "../components/Appbar";
import { useMyBlogs } from "../hooks";
import { infoAtom } from "../store/atom/Information";
import { Loading_Screen } from "../components/loader";
import { Link } from "react-router-dom";

export const MyBlogs = () => {
  const user = useRecoilValue(infoAtom);
  const { blogs, loading } = useMyBlogs(user.id);

  const stripHtmlTags = (html: string) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "No Content";
  };

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
    <div className="min-h-screen  ">
      <Appbar />
      <div className="border-b-4 bg-[#F98866] border-[#F98866] dark:border-[#F98866] dark:bg-[#F98866]">
        <p className="p-3 Big-Shoulders font-semibold text-5xl dark:text-white">
          Your Posts
        </p>
      </div>
      <div className="bg-[#FFF2D7] dark:bg-gray-800 h-full flex flex-col justify-center items-center">
        <div className=" dark:bg-gray-700 shadow-md rounded-lg p-6 w-full max-w-7xl mt-6 notebook-paper relative dark:notebook-paper-dark min-h-[132vh] sm:min-h-screen ">
          <h2 className="text-2xl font-bold pb-4 relative top-2  dark:text-white">
            My Blog Posts
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Here you can find all your blog posts.
          </p>
          <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {/* Blog post cards will go here */}

            {blogs.map((c) => {
              return (
                <CardContent
                  id={c.id}
                  title={c.title || "No Title"}
                  description={stripHtmlTags(c.content).slice(0, 20) + ".."}
                  date={c.date.split("T")[0]}
                />
              );
            })}
          </div>
          {/* <div className="flex justify-between  absolute bottom-10 right-1 w-full px-6 dark:bottom-4">
            <button className="bg-[#F98866] text-white px-4 py-2 rounded hover:bg-[#e07b5e] transition-colors duration-300">
              Previous
            </button>
            <button className="bg-[#F98866] text-white px-4 py-2 rounded hover:bg-[#e07b5e] transition-colors duration-300">
              Next
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

const CardContent = ({
  title,
  description,
  date,
  id,
}: {
  title: string;
  description: string;
  date: string;
  id: string;
}) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="bg-gray-200 dark:bg-gray-700 p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-105 ">
        <h3 className="text-xl font-semibold mb-2 text-[#F98866] dark:text-[#F98866]">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-2">{description}</p>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Published on: {date}
        </p>
      </div>
    </Link>
  );
};
