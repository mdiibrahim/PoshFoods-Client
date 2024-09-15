"use client";
import React from "react";
import { Spinner } from "@nextui-org/react";
import { motion } from "framer-motion";

// Define container and item variants
const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function Loading() {
  return (
    <motion.div
      className="flex items-center justify-center h-screen bg-[#F5F5F5] dark:bg-gray-800"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={item}>
        <Spinner label="Loading..." color="success" size="lg" />
      </motion.div>
    </motion.div>
  );
}
