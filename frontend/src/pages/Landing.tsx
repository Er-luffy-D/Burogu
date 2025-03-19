import { LandingNav } from "../components/Appbar";
import SplitText from "../components/SplitText";
import { motion } from "framer-motion";
import Squares from "../components/Squares";
import { useRecoilValue } from "recoil";
import { infoAtom, themeAtom } from "../store/atom/Information";
import { Testimonial } from "../components/Testimonial";
import { useNavigate } from "react-router-dom";
import ContactUs from "../components/ContactUs";

export const Landing = () => {
  const theme = useRecoilValue(themeAtom);
  const user = useRecoilValue(infoAtom);
  const navigate = useNavigate();
  return (
    <div>
      <LandingNav user={user} />
      <div className="relative w-full h-[660px] flex flex-col align-middle justify-center bg-blue-500/85 dark:bg-gradient-to-tr dark:from-black dark:to-stone-900 overflow-hidden">
        <Squares
          speed={0.5}
          squareSize={40}
          direction="diagonal"
          borderColor={theme === "dark" ? "#fff" : "white"}
          hoverFillColor={theme === "dark" ? "#fff" : "black"}
        />
        <div className="w-full absolute flex flex-col align-middle justify-center">
          <SplitText
            text="WELCOME ! :)"
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-center dark:text-white text-black/80 md:tracking-widest "
            delay={200}
            animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
            animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
            threshold={0.2}
            rootMargin="-50px"
          />
        </div>
      </div>
      <div className="min-h-[80vh] flex flex-col align-middle justify-center bg-white dark:bg-black/95 py-5">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 min-h-screen md:min-h-96 px-5 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="font-bold rounded-none md:rounded-lg bg-green-300 dark:bg-green-600 ring-4 ring-black dark:ring-white relative px-5 py-5 col-span-2"
          >
            <div className=" lg:px-10 text-base md:text-lg lg:text-2xl text-gray-800 dark:text-gray-200 mt-4 space-y-2 md:space-y-4">
              <p>
                <span className="font-extrabold text-xl md:text-4xl text-blue-700 dark:text-blue-300">
                  Welcome to Burogu,
                </span>
                your go-to platform for sharing and discovering amazing blog
                posts. Whether you're a seasoned blogger or just starting out,
                Burogu provides you with the tools and community to express your
                thoughts and ideas.
              </p>
              <p>
                Our platform is designed to be user-friendly and intuitive,
                allowing you to focus on what matters most: your content.
              </p>
              <p>
                Join our community today and start your blogging journey with
                Burogu. Let's make your voice heard!
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 150 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="md:col-start-3 bg-blue-300 dark:bg-blue-600 hover:dark:bg-blue-900 dark:text-white p-2 rounded-lg ring-4 ring-black dark:ring-white flex items-center justify-center text-2xl md:text-4xl font-bold flex-col relative group cursor-pointer"
            onClick={() => {
              if (user.email === "Unknown") {
                navigate("/SignIn");
              } else {
                navigate("/blogs");
              }
            }}
          >
            <span className="group-hover:scale-150 group-hover:md:scale-100 group-hover:lg:scale-150 group-hover:md:-translate-y-10 transition-transform duration-300 ease-in-out">
              Get Started
            </span>
            <span className="hidden md:block text-2xl opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-125 transition-opacity-transform ease-linear duration-[0.35s]">
              {user.email === "Unknown" ? "Sign In" : "Explore Blogs"}
            </span>
          </motion.div>
        </div>
      </div>
      <Testimonial />
      <ContactUs />
    </div>
  );
};
