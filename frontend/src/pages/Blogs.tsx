import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { Loading_Screen } from "../components/loader";
import { useBlogs } from "../hooks";

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
  const { loading, blogs } = useBlogs();

  // Function to strip HTML tags from a string
  const stripHtmlTags = (html: string) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading_Screen />;
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
                content={stripHtmlTags(c.content)}
                edited={c.edited}
                publishedDate={c.date}
                title={c.title}
                key={c.id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
