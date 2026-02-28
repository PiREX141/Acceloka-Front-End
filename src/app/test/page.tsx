"use client";

import { motion } from "motion/react";

export default function test() {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="px-6 py-3 bg-black text-white rounded-lg"
    >
      Click Me
    </motion.button>
  );
}
