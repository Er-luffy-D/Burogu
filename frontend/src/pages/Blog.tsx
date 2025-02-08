import { useParams } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { Avatar } from "../components/BlogCard";

export const Blog = () => {
  const { id } = useParams();
  return (
    <div>
      <Appbar />
      <div className="flex justify-center ">
        <div className="grid grid-rows-7 grid-cols-1 md:grid-cols-12 max-w-screen-xl px-10  h-full md:grid-rows-1  pt-10">
          <div className="row-span-5  md:col-span-8 md:row-start-1">
            <div className="text-2xl sm:text-5xl font-extrabold">
              {/* title */}
              What is REST API? — A Comprehensive Guide To RESTful APIs
            </div>
            <div className="text-slate-500 pt-4">
              {/* date */}
              Post on 7th January 2025
            </div>
            <div className="pt-4 text-lg text-slate-700">
              {/* content */}
              Since the invention of the internet, we have been using different
              applications and web pages to get data for various resources.
              However, have you ever thought, where does this data come from?
              Well, it’s the servers from where we get the data. So in this
              article on What is REST API, let us look into how a client
              communicates with the servers to extract the required
              information.Need of REST API . Consider a scenario where you are
              using the Book My Show app. Now, obviously, this application needs
              a lot of Input data, as the data present in the application is
              never static. Either it is movies getting released on a frequent
              basis, or various cities showing different languages movies at
              various times of the day. It's never static which implies to the
              fact that data is always changing in these applications.
              {/* <ContentHtml text="" /> */}
            </div>
          </div>
          <div className="row-span-2 md:pl-8  md:col-span-4 md:row-start-1">
            <div className="text-gray-600 text-lg">Author</div>
            <div className="flex justify-center">
              <div className="flex flex-col justify-center">
                <Avatar name="Piyush" size="big" />
              </div>
              <div className="flex flex-col justify-center pl-4">
                <div className="text-xl font-bold">
                  {/* Name */}
                  Piyush Dixit
                </div>
                <div className="text-slate-600">
                  random Catch phrase about author ,how he can do anything
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContentHtml = ({ text }: { text: string }) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: text || "Nothing Just Content is Empty Just Like Something 😑",
      }}
    />
  );
};
