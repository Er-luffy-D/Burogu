import { useParams } from "react-router-dom";
import { Appbar } from "../components/Appbar";

export const Blog = () => {
  const { id } = useParams();
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="grid grid-rows-7 grid-cols-1 md:grid-cols-12 max-w-screen-2xl px-10  h-full md:grid-rows-1  pt-6">
          <div className="row-span-5 row-start-3 md:col-span-8 md:row-start-1">
            <div className="text-4xl font-extrabold">
              {/* title */}
              What is REST API? — A Comprehensive Guide To RESTful APIs
            </div>
            {/* content */}
            Since the invention of the internet, we have been using different
            applications and web pages to get data for various resources.
            However, have you ever thought, where does this data come from?
            Well, it’s the servers from where we get the data. So in this
            article on What is REST API, let us look into how a client
            communicates with the servers to extract the required
            information.Need of REST API . Consider a scenario where you are
            using the Book My Show app. Now, obviously, this application needs a
            lot of Input data, as the data present in the application is never
            static. Either it is movies getting released on a frequent basis, or
            various cities showing different languages movies at various times
            of the day. It's never static which implies to the fact that data is
            always changing in these applications.
          </div>
          <div className="row-span-2 row-start-1 md:col-span-4 md:row-start-1">
            hel
          </div>
        </div>
      </div>
    </div>
  );
};
