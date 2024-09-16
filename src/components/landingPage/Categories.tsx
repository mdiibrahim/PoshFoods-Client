"use client";
import React from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";
import Fruits from "@/assests/fruits.webp";
import Vegetables from "@/assests/vegetables.webp";
import Dessert from "@/assests/dessert.webp";
import Meat from "@/assests/meat.webp";
import { CATEGORIES } from "@/constant/category";

const categoryImages: Record<string, StaticImageData> = {
  Fruits: Fruits,
  Vegetables: Vegetables,
  Dessert: Dessert,
  Meat: Meat,
};

const Categories = () => {
  return (
    <section className="py-16 dark:bg-darkBackground">
      <h2 className="text-3xl font-bold text-center mb-10 text-primary dark:text-darkText">
        Food Categories
      </h2>
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {CATEGORIES.map((category, idx) => (
          <Link
            key={idx}
            href={`/product?category=${encodeURIComponent(category)}`}
            className="group"
          >
            <motion.div
              className="dark:bg-[#1B263B] p-6 text-center shadow-lg rounded-lg group-hover:scale-105 transition-transform transform cursor-pointer hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
            >
              <div className="h-40 mb-4">
                <Image
                  src={categoryImages[category]} // Use mapped images
                  alt={category}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold text-textColor dark:text-darkText">
                {category}
              </h3>
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </section>
  );
};

export default Categories;
