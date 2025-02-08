import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { Spinner } from "../components/Spinner";
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
  // const { loading, blogs } = useBlogs();

  // just using hardcoded values for reference
  const blogs = [
    {
      title: "Life",
      id: "3d168cf1-73d3-4002-86ee-c793a446c70d",
      published: false,
      content: "Gotta do something",
      date: "2025-01-04T22:41:54.723Z",
      edited: false,
      author: {
        name: "Piyush Dixit",
      },
    },
    {
      title: "What is REST API? — A Comprehensive Guide To RESTful APIs",
      id: "10e502a7-8ff5-4309-86e1-4b00f3374c36",
      published: false,
      content:
        "Since the invention of the internet, we have been using different applications and web pages to get data for various resources. However, have you ever thought, where does this data come from? Well, it’s the servers from where we get the data. So in this article on What is REST API, let us look into how a client communicates with the servers to extract the required information.Need of REST API . Consider a scenario where you are using the Book My Show app. Now, obviously, this application needs a lot of Input data, as the data present in the application is never static. Either it is movies getting released on a frequent basis, or various cities showing different languages movies at various times of the day. It’s never static which implies to the fact that data is always changing in these applications.",
      date: "2025-01-06T20:05:26.847Z",
      edited: false,
      author: {
        name: null,
      },
    },
  ];
  // if (loading) {
  //   return <Spinner />;
  // }
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
                content={c.content}
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
