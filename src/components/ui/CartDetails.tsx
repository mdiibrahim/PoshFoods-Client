/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useAppDispatch } from "@/redux/hooks";
import { updateQuantity, removeFromCart } from "@/redux/features/cartSlice";
import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";
import React from "react";
import Image from "next/image";

const CartDetails = ({ product }: any) => {
  const dispatch = useAppDispatch();

  const handleQuantity = (type: string, id: string) => {
    const payload = { type, id };
    dispatch(updateQuantity(payload));
  };

  return (
    <div className="flex items-center justify-between space-x-4 border border-gray-300 rounded-lg p-4 bg-white shadow-md transition-transform transform hover:scale-105 hover:shadow-lg w-full mx-auto">
      <Image
        src={product.image}
        alt={product.name}
        width={80}
        height={80}
        className="rounded-lg"
      />
      <div className="flex-grow mx-4">
        <h3 className="text-lg font-semibold text-black truncate mb-2">
          {product.name}
        </h3>
        <p className="text-lg font-bold text-primary">${product.price}</p>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleQuantity("decrement", product._id)}
          className="bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-600 transition"
        >
          <FaMinus />
        </button>
        <span className="text-lg font-semibold">{product.quantity}</span>
        <button
          onClick={() => handleQuantity("increment", product._id)}
          className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition"
        >
          <FaPlus />
        </button>
      </div>
      <button
        onClick={() => dispatch(removeFromCart({ id: product._id }))}
        className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
      >
        <FaTrash />
      </button>
    </div>
  );
};

export default CartDetails;
