import { Appbar } from "../components/Appbar";

export const MyBlogs = () => {
  return (
    <div>
      <Appbar />
      <div className="border-b-4 bg-[#F98866] border-[#F98866]">
        <p className="p-3 Big-Shoulders font-semibold text-5xl">Your Posts</p>
      </div>
      <div className="bg-[#FFF2D7] h-full min-h-screen">
        <div className="flex flex-col justify-center items-center">
          <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-7xl mt-6 notebook-paper relative">
            <h2 className="text-2xl font-bold mb-4">My Blog Posts</h2>
            <p className="text-gray-700 mb-4">
              Here you can find all your blog posts.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Blog post cards will go here */}
              <CardContent
                title="Blog Post Title"
                description="A brief description of the blog post."
                date="2023-10-15"
              />
            </div>
            <div className="flex justify-between mt-6">
              <button className="bg-[#F98866] text-white px-4 py-2 rounded hover:bg-[#e07b5e] transition-colors duration-300">
                Previous
              </button>
              <button className="bg-[#F98866] text-white px-4 py-2 rounded hover:bg-[#e07b5e] transition-colors duration-300">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CardContent = ({
  title,
  description,
  date,
}: {
  title: string;
  description: string;
  date: string;
}) => {
  return (
    <div className="bg-gray-200 p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-105">
      <h3 className="text-xl font-semibold mb-2 ">{title}</h3>
      <p className="text-gray-600 mb-2">{description}</p>
      <p className="text-gray-500 text-sm">Published on: {date}</p>
    </div>
  );
};
