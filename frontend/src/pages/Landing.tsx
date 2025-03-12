import { Appbar } from "../components/Appbar";
import SplitText from "../components/SplitText";
import { motion } from "framer-motion";
export const Landing = () => {
  return (
    <div>
      <Appbar />
      <div className="w-full h-[660px] flex flex-col align-middle justify-center bg-gradient-to-br from-slate-300 to-slate-200 dark:bg-gradient-to-tr dark:from-black dark:to-stone-900 ">
        <SplitText
          text="WELCOME ! :)"
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-center dark:text-white "
          delay={200}
          animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
          animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
          threshold={0.2}
          rootMargin="-50px"
        />
      </div>
      <div className="min-h-[80vh] flex flex-col align-middle justify-center">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 min-h-screen md:min-h-96  ">
          <motion.div
            initial={{ opacity: 0, x: -200 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="text-4xl md:text-6xl font-bold p-5 rounded-3xl invert-0 bg-gray-600 relative px-10 py-10 md:ml-10 col-span-2"
          >
            Where Words Find Their Home
            <p className="absolute bottom-10 right-3 text-slate-700 font-light text-3xl md:text-4xl">
              -Burogu
            </p>
          </motion.div>
          <motion.div className="md:col-start-3">asgfasgs</motion.div>
        </div>
      </div>
    </div>
  );
};
