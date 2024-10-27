"use client";
import React from "react";
import { motion } from "framer-motion";
import { SupportCard } from "./SupportCard";
import { FAQAccordion } from "./FAQAccordion";

export default function CustomerSupport() {
  return (
    <motion.section
      className="py-16 dark:bg-darkBackground"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col justify-center items-center gap-10 lg:flex-row lg:gap-16">
        <FAQAccordion />
      </div>
      <h2 className="text-3xl font-bold text-center mt-16 text-primary dark:text-darkText">
        Need Help?
      </h2>
      <div className="flex flex-col justify-center items-center gap-10 lg:flex-row lg:gap-16">
        <SupportCard />
      </div>
    </motion.section>
  );
}
