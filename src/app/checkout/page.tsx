/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Spinner, Radio, RadioGroup } from "@nextui-org/react";
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
      const orderData = orderDetails
        ? {
            products: [
              {
                productId: orderDetails.productId,
                quantity: orderDetails.quantity,
                price: orderDetails.price,
              },
            ],
            totalPrice: buyNowGrandTotal,
          }
        : {
            products: orderSummary.cartItems.map((item: any) => ({
              productId: item._id,
              quantity: item.quantity,
              price: item.price,
            })),
            totalPrice: grandTotal,
          };

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
      toast.error("Failed to place order. Please try again.");
    }
  };

  if (!orderSummary && !orderDetails) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner label="Loading checkout details..." />
      </div>
    );
  }

  // Calculate totals for "Buy Now" flow (orderDetails)
  const buyNowSubTotal = orderDetails
    ? orderDetails.price * orderDetails.quantity
    : 0;
  const buyNowTax = buyNowSubTotal * taxRate;
  const buyNowGrandTotal = buyNowSubTotal + buyNowTax + deliveryFee;

  // Cart checkout values
  const {
    cartItems,
    totalPrice,
    tax,
    deliveryFee: cartDeliveryFee,
    grandTotal,
  } = orderSummary || {};

  return (
    <div className="container mx-auto p-6 dark:text-darkText dark:bg-darkBackground">
      <h2 className="text-3xl font-bold mb-6 text-center">Checkout</h2>

      <div className="flex flex-col lg:flex-row lg:justify-between gap-10">
        {/* Order Summary Section */}
        <div className="w-full lg:w-1/2  shadow-lg rounded-lg p-8">
          <h3 className="text-2xl font-semibold mb-6 text-primary">
            Order Summary
          </h3>

          {orderDetails ? (
            <div className="space-y-4 text-lg">
              <div>
                <span className="font-semibold">Product ID:</span>{" "}
                {orderDetails.productId}
              </div>
              <div>
                <span className="font-semibold">Quantity:</span>{" "}
                {orderDetails.quantity}
              </div>
              <div>
                <span className="font-semibold">Price:</span> $
                {orderDetails.price}
              </div>
              <div className="mt-6 space-y-2">
                <p className="text-base">
                  Subtotal:{" "}
                  <span className="font-bold">
                    ${buyNowSubTotal.toFixed(2)}
                  </span>
                </p>
                <p className="text-base">
                  Tax:{" "}
                  <span className="font-bold">${buyNowTax.toFixed(2)}</span>
                </p>
                <p className="text-base">
                  Delivery Fee:{" "}
                  <span className="font-bold">${deliveryFee}</span>
                </p>
                <p className="text-xl font-bold text-green-600">
                  Grand Total: ${buyNowGrandTotal.toFixed(2)}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4 text-lg">
              <ul className="space-y-2">
                {cartItems.map((item: any) => (
                  <li key={item._id} className="flex justify-between">
                    <span>{item.title}</span>
                    <span>
                      {item.quantity} x{" "}
                      <span className="font-bold">${item.price}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 space-y-2">
                <p className="text-base">
                  Total Price:{" "}
                  <span className="font-bold">${totalPrice.toFixed(2)}</span>
                </p>
                <p className="text-base">
                  Tax: <span className="font-bold">${tax.toFixed(2)}</span>
                </p>
                <p className="text-base">
                  Delivery Fee:{" "}
                  <span className="font-bold">${cartDeliveryFee}</span>
                </p>
                <p className="text-xl font-bold text-green-600">
                  Grand Total: ${grandTotal.toFixed(2)}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Place Order Section */}
        <div className="w-full lg:w-1/2  shadow-lg rounded-lg p-6 flex flex-col justify-between">
          <div className="mb-6">
            <div className="text-lg font-semibold">
              Your order has been confirmed! Expect delivery within 3-7 days, In
              sha Allah.
              <br />
              Please ensure the following before receiving your parcel:
              <ul className="list-disc list-inside mt-2">
                <li>The size is correct</li>
                <li>The color matches</li>
                <li>There are no damages</li>
              </ul>
              If there is an issue, return it to the delivery person
              immediately. Once they leave, no complaints can be entertained.
              <br />
              <br />
              We strive to provide you with the best service possible.
            </div>

            {/* Cash on Delivery Radio Button */}
            <div className="mt-4">
              <p className="font-semibold mb-2">Payment Method</p>
              <RadioGroup
                defaultValue="cod"
                aria-label="Payment method"
                isDisabled
              >
                <Radio value="cod" className="dark:text-darkText">
                  Cash on Delivery
                </Radio>
              </RadioGroup>
            </div>
          </div>

          <Button
            color="primary"
            onPress={handlePlaceOrder}
            isLoading={isLoading}
            className="mb-4 w-full bg-primary text-white hover:bg-secondary"
          >
            Place Order
          </Button>
          <Button
            onPress={() => router.push("/product")}
            className="w-full bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
