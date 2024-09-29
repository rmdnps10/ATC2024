"use client";

import { motion } from "framer-motion";

export default function Template({ children }) {
  return (
    <motion.div
      initial={{
        scaleX: 0,
        scaleY: 0,
        opacity: 0,
        background: "none",
      }}
      animate={{
        scaleX: 1,
        scaleY: 1,
        opacity: 1,
        background: "none",
      }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
