import { motion } from "framer-motion";
import React from "react";

interface Props {
  children: any;
}

const variants = {
  hidden: { opacity: 0, x: -100, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
};

const Main: React.FC<Props> = ({ children }) => {
  return (
    <motion.main
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ type: "linear" }}
      className="screen w-full max-w-3xl mx-auto flex flex-col"
    >
      {children}
    </motion.main>
  );
};

export default Main;
