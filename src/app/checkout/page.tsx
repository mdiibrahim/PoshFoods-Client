/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/checkout/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearCart } from "@/redux/features/cartSlice";
import { useCreateOrderMutation } from "@/redux/api/orderApi";

const CheckoutPage = () => {
  const [orderSummary, setOrderSummary] = useState<any>(null);
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const userToken = useAppSelector((state) => state.auth.token);
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const deliveryFee = 15; // Example delivery fee
  const taxRate = 0.07; // Example tax rate (7%)

  useEffect(() => {
    const storedOrderSummary = localStorage.getItem("orderSummary");
    const storedOrderDetails = localStorage.getItem("orderDetails");

    if (storedOrderSummary) {
      setOrderSummary(JSON.parse(storedOrderSummary));
    }

    if (storedOrderDetails) {
      setOrderDetails(JSON.parse(storedOrderDetails));
    }

    if (!storedOrderSummary && !storedOrderDetails) {
      toast.error("No order information found.");
      router.push("/cart");
    }
  }, [router]);

  const handlePlaceOrder = async () => {
    if (!userToken) {
      toast.error("Please login to proceed.");
      router.push("/login");
      return;
    }

    try {
      // Ensure totalPrice is being calculated and included for both "Buy Now" and cart checkout flows
      const orderData = orderDetails
        ? {
            products: [
              {
                productId: orderDetails.productId,
                quantity: orderDetails.quantity,
                price: orderDetails.price,
              },
            ],
            totalPrice: buyNowGrandTotal, // Make sure totalPrice is included
          }
        : {
            products: orderSummary.cartItems.map((item: any) => ({
              productId: item._id,
              quantity: item.quantity,
              price: item.price,
            })),
            totalPrice: grandTotal, // Make sure totalPrice is included for cart
          };

      console.log("Order Data:", orderData);

      await createOrder(orderData).unwrap();

      // Clear the cart after order creation
      if (orderSummary) {
        dispatch(clearCart());
        localStorage.removeItem("orderSummary");
      }
      localStorage.removeItem("orderDetails");

      toast.success("Order created successfully!");
      router.push("/dashboard");
    } catch (error) {
      localStorage.removeItem("orderDetails");
      console.error("Order creation error:", error);
      toast.error("Failed to place order. Please try again.");
    }
  };

  if (!orderSummary && !orderDetails) return <p>Loading...</p>;

  // Calculate tax and grand total for Buy Now flow (orderDetails)
  const buyNowSubTotal = orderDetails
    ? orderDetails.price * orderDetails.quantity
    : 0;
  const buyNowTax = buyNowSubTotal * taxRate;
  const buyNowGrandTotal = buyNowSubTotal + buyNowTax + deliveryFee;

  // If cart checkout, we use the orderSummary's values
  const {
    cartItems,
    totalPrice,
    tax,
    deliveryFee: cartDeliveryFee,
    grandTotal,
  } = orderSummary || {};

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <div className="order-summary">
        <h3 className="text-xl font-semibold">Order Summary</h3>

        {orderDetails ? (
          // Show order details from "Buy Now" flow
          <div>
            <ul className="mb-4">
              <li>
                Product ID: {orderDetails.productId} - Quantity:{" "}
                {orderDetails.quantity} - Price: ${orderDetails.price}
              </li>
            </ul>
            <p>Subtotal: ${buyNowSubTotal.toFixed(2)}</p>
            <p>Tax: ${buyNowTax.toFixed(2)}</p>
            <p>Delivery Fee: ${deliveryFee}</p>
            <p>Grand Total: ${buyNowGrandTotal.toFixed(2)}</p>
          </div>
        ) : (
          // Show cart summary for cart checkout flow
          <div>
            <ul className="mb-4">
              {cartItems.map((item: any) => (
                <li key={item._id}>
                  {item.title} - {item.quantity} x ${item.price}
                </li>
              ))}
            </ul>
            <p>Total Price: ${totalPrice.toFixed(2)}</p>
            <p>Tax: ${tax.toFixed(2)}</p>
            <p>Delivery Fee: ${cartDeliveryFee}</p>
            <p>Grand Total: ${grandTotal.toFixed(2)}</p>
          </div>
        )}
      </div>

      <Button color="primary" onPress={handlePlaceOrder} isLoading={isLoading}>
        Place Order
      </Button>
    </div>
  );
};

export default CheckoutPage;
