import React from "react";
import { Link } from "@nextui-org/react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-0">
        <div>
          <h3 className="text-xl font-semibold mb-4">PoshFoods</h3>
          <p className="text-sm">
            Your one-stop shop for fresh groceries and delicious meals.
            Delivered fast and fresh.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="text-sm space-y-2">
            <li>
              <Link href="#">Shop All Products</Link>
            </li>
            <li>
              <Link href="#">Contact Us</Link>
            </li>
            <li>
              <Link href="#">Return Policy</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Stay Connected</h3>
          <ul className="flex space-x-4">
            <li>
              <Link href="#">Facebook</Link>
            </li>
            <li>
              <Link href="#">Instagram</Link>
            </li>
            <li>
              <Link href="#">Twitter</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto text-center mt-8">
        <p className="text-xs">
          &copy; {new Date().getFullYear()} PoshFoods. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
