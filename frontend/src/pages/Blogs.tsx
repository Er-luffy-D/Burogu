import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { Loading_Screen } from "../components/loader";
import { useBlogs } from "../hooks";
import { Toasts } from "../components/Toasts";

export interface blogsStructure {
  title: string;
  id: string;
  published: boolean;
  content: string;
  date: string;
  edited: boolean;
  author: {
    name: string;
  };
}

export const Blogs = () => {
  const { loading, blogs, error } = useBlogs();
  blogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Function to strip HTML tags from a string
  const stripHtmlTags = (html: string) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  if (loading) {
    return (
      <div>
        <Appbar />
        <div className="flex justify-center items-center h-screen">
          <Loading_Screen />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-black relative">
        <div className="text-green-500 font-mono bg-black p-4 rounded-lg shadow-lg border border-green-500">
          <p>ERROR: Failed to fetch blogs</p>
          <p>Possible causes:</p>
          <ul className="list-disc list-inside">
            <li>Network issues</li>
            <li>Server downtime</li>
            <li>Invalid request</li>
          </ul>
          <p>Please try again later.</p>
        </div>
        <div className="absolute bottom-4 right-4">
          <div className="retro-loader">
            <p>Oops! Something went wrong.</p>
            <p>We are unable to load the blogs at the moment.</p>
            <p>Please check your connection or try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Appbar />
      <div className="flex justify-center p-4">
        <div>
          {blogs.map((c: blogsStructure) => {
            return (
              <BlogCard
                id={c.id}
                authorName={c.author.name || "Unknown"}
                content={stripHtmlTags(c.content) || "No Content"}
                edited={c.edited}
                publishedDate={c.date}
                title={c.title}
                key={c.id}
              />
            );
          })}
          {blogs.length === 0 && (
            <div className="flex justify-center items-center h-96">
              <div className="text-2xl text-slate-700">No Blogs Yet</div>
            </div>
          )}
        </div>
        <Toasts />
      </div>
    </div>
  );
};
