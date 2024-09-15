"use client";
import React from "react";
import Image from "next/image";
import banner from "@/assests/banner.webp";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@nextui-org/react";

const Banner = () => {
  return (
    <motion.section
      className="relative w-full h-screen bg-backgroundColor dark:bg-darkBackground"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={banner}
          alt="Full-Screen Banner Image"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          priority
          className="opacity-30"
        />
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-full space-y-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center text-primary dark:text-white px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            Welcome to PoshFoods
          </h1>
          <p className="text-lg text-textColor dark:text-darkText font-semibold sm:text-xl lg:text-2xl">
            Fresh groceries delivered fast and fresh.
          </p>
        </div>

        <Link href="/product">
          <Button className="bg-primary text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-secondary transition-colors">
            Shop Now
          </Button>
        </Link>
      </motion.div>
    </motion.section>
  );
};

export default Banner;
