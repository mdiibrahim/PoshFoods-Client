/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import { useGetUserOrdersQuery } from "@/redux/api/orderApi";
import { useAddReviewMutation } from "@/redux/api/reviewApi";
import { Button } from "@nextui-org/react";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

const UserOrders = () => {
  const { data, error, isLoading } = useGetUserOrdersQuery(undefined);
  const [addReview] = useAddReviewMutation();

  const [ratings, setRatings] = useState<{ [key: string]: number }>({});
  const [reviews, setReviews] = useState<{ [key: string]: string }>({});
  const [reviewedProducts, setReviewedProducts] = useState<string[]>([]);

  useEffect(() => {
    if (data) {
      const reviewed = data?.data.flatMap((order: any) =>
        order.products
          .filter((product: any) => product.reviewed)
          .map((product: any) => product.productId._id)
      );
      setReviewedProducts(reviewed);
    }
  }, [data]);

  const handleRatingChange = (productId: string, newRating: number) => {
    setRatings({ ...ratings, [productId]: newRating });
  };

  const handleReviewChange = (productId: string, review: string) => {
    setReviews({ ...reviews, [productId]: review });
  };

  const handleSubmitReview = async (productId: string) => {
    const rating = ratings[productId] || 5;
    const review = reviews[productId] || "";

    if (!review) {
      toast.error("Please provide a comment.");
      return;
    }

    try {
      await addReview({
        product: productId,
        comment: review,
        rating,
      }).unwrap();

      toast.success("Review submitted successfully!");
      setReviews((prev) => ({ ...prev, [productId]: "" }));
      setRatings((prev) => ({ ...prev, [productId]: 5 }));
      setReviewedProducts((prev) => [...prev, productId]);
    } catch (error) {
      toast.error("Failed to submit review. Please try again.");
    }
  };

  if (isLoading) return <p className="text-center">Loading your orders...</p>;
  if (error)
    return (
      <p className="text-center text-red-500">
        Error loading orders. Please try again.
      </p>
    );

  const orders = data?.data || [];
  const pendingOrders = orders.filter(
    (order: any) => order.isOrdered === "pending"
  );
  const deliveredOrders = orders.filter(
    (order: any) => order.isOrdered === "delivered"
  );
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  return (
    <motion.div
      className="container mx-auto p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-2xl font-bold mb-4 text-primary">Pending Orders</h2>
      {pendingOrders.length === 0 ? (
        <p className="text-gray-600">No pending orders.</p>
      ) : (
        pendingOrders.map((order: any) => (
          <motion.div
            key={order._id}
            className="mb-6 p-4 rounded-lg shadow-md"
            variants={itemVariants}
          >
            <h4 className="font-semibold">
              Order Time:{" "}
              {new Date(order.createdAt).toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </h4>
            {order.products.map((product: any) => (
              <div key={product._id} className="mt-2">
                <p>Product: {product.productId.title}</p>
                <p>Quantity: {product.quantity}</p>
              </div>
            ))}
            <p>Total Price: {order.totalPrice}</p>
          </motion.div>
        ))
      )}

      <h2 className="text-2xl font-bold mt-8 mb-4 text-primary">
        Delivered Orders
      </h2>
      {deliveredOrders.length === 0 ? (
        <p className="text-gray-600">No delivered orders.</p>
      ) : (
        deliveredOrders.map((order: any) => (
          <motion.div
            key={order._id}
            className="mb-6 p-4 rounded-lg shadow-md"
            variants={itemVariants}
          >
            <h4 className="font-semibold">
              Order Time:{" "}
              {new Date(order.createdAt).toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </h4>
            <p>Total Price: {order.totalPrice}</p>
            <p>Total Products: {order.products.length}</p>
            {order.products.map((product: any) => {
              const isReviewed = reviewedProducts.includes(
                product.productId._id
              );

              return (
                <motion.div
                  key={product.productId._id}
                  className="mt-4"
                  variants={itemVariants}
                >
                  <p>Product: {product.productId.title}</p>
                  <p>Quantity: {product.quantity}</p>

                  <textarea
                    value={reviews[product.productId._id] || ""}
                    onChange={(e) =>
                      handleReviewChange(product.productId._id, e.target.value)
                    }
                    placeholder="Write your review..."
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-primary mb-4"
                    disabled={isReviewed}
                  />

                  <div className="flex items-center mb-4">
                    <span className="mr-3 text-lg font-semibold">Rating:</span>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        onClick={() =>
                          !isReviewed &&
                          handleRatingChange(product.productId._id, star)
                        }
                        className={`cursor-pointer text-3xl transition-colors duration-300 ${
                          star <= (ratings[product.productId._id] || 5)
                            ? "text-yellow-500"
                            : "text-gray-300"
                        } ${isReviewed ? "cursor-not-allowed" : ""}`}
                      />
                    ))}
                  </div>

                  <Button
                    onPress={() => handleSubmitReview(product.productId._id)}
                    disabled={isReviewed}
                    className="bg-primary text-white hover:bg-primary-dark"
                  >
                    {isReviewed ? "Reviewed" : "Submit Review"}
                  </Button>
                </motion.div>
              );
            })}
          </motion.div>
        ))
      )}
    </motion.div>
  );
};

export default UserOrders;
