"use client";
import React from "react";
import { Link } from "@nextui-org/react";
import Image from "next/image";
import { motion } from "framer-motion";
import logo from "@/assests/logo.webp";

const Footer = () => {
  return (
    <motion.footer
      className="bg-backgroundColor text-textColor py-10 dark:bg-darkBackground dark:text-darkText"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 lg:px-4 p-10">
        <div className="flex flex-col items-center md:items-start">
          <Image src={logo} alt="PoshFoods Logo" width={150} height={150} />
          <h3 className="text-xl font-semibold mb-4 mt-2">PoshFoods</h3>
          <p className="text-sm text-textColor dark:text-darkText">
            Your one-stop shop for fresh groceries and delicious meals.
            Delivered fast and fresh.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="text-sm space-y-2 text-textColor dark:text-darkText">
            <li>
              <Link href="#" className="hover:text-primary transition-colors">
                Shop All Products
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary transition-colors">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary transition-colors">
                Return Policy
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Stay Connected</h3>
          <ul className="flex space-x-4">
            <li>
              <Link href="#" className="hover:text-primary transition-colors">
                Facebook
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary transition-colors">
                Instagram
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary transition-colors">
                Twitter
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto text-center mt-8">
        <p className="text-xs text-textColor dark:text-darkText">
          &copy; {new Date().getFullYear()} PoshFoods. All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
