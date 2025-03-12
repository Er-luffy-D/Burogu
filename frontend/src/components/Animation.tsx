import { motion } from "framer-motion";

export const Reveal = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: 80,
        },
        visible: {
          opacity: 1,
          y: 0,
        },
      }}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.15, duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};
