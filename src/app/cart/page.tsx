// src/app/cart/page.tsx
"use client";

import React from "react";
import CartDetails from "@/components/ui/CartDetails";
import OrderSummary from "@/components/ui/OrderSummaryModal";
import { useAppSelector } from "@/redux/hooks";

const CartPage = () => {
  const products = useAppSelector((store) => store.cart.products);

  return (
    <div className="container mt-10 mx-auto">
      <div className="flex lg:flex-row flex-col-reverse justify-center lg:space-x-40">
        <div className="space-y-5 lg:mt-0 mt-5">
          {products.length ? (
            products.map((product) => (
              <CartDetails key={product._id} product={product} />
            ))
          ) : (
            <p className="text-2xl text-red-500">No products found</p>
          )}
        </div>
        <OrderSummary />
      </div>
    </div>
  );
};

export default CartPage;
