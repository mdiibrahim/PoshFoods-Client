/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import { useGetUserOrdersQuery } from "@/redux/api/orderApi"; // Adjust the path accordingly
import { useAddReviewMutation } from "@/redux/api/reviewApi";
import { Button } from "@nextui-org/react";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";

const UserOrders = () => {
  const { data, error, isLoading } = useGetUserOrdersQuery(undefined);
  const [addReview] = useAddReviewMutation(); // Add review mutation

  // Store rating and review for each product
  const [ratings, setRatings] = useState<{ [key: string]: number }>({});
  const [reviews, setReviews] = useState<{ [key: string]: string }>({});
  const [reviewedProducts, setReviewedProducts] = useState<string[]>([]); // Track reviewed products

  useEffect(() => {
    if (data) {
      // Collect product IDs that have already been reviewed
      const reviewed = data?.data.flatMap((order: any) =>
        order.products
          .filter((product: any) => product.reviewed) // Assuming each product has a `reviewed` flag
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
    const rating = ratings[productId] || 5; // Default rating is 5 if not changed
    const review = reviews[productId] || ""; // Ensure there's a review text
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

      setReviews((prev) => ({ ...prev, [productId]: "" })); // Reset review after submission
      setRatings((prev) => ({ ...prev, [productId]: 5 })); // Reset rating after submission

      // Mark product as reviewed after submission and disable button
      setReviewedProducts((prev) => [...prev, productId]);
    } catch (error) {
      toast.error("Failed to submit review. Please try again.");
    }
  };

  if (isLoading) return <p>Loading your orders...</p>;
  if (error) return <p>Error loading orders. Please try again.</p>;

  const orders = data?.data || [];

  const pendingOrders = orders.filter(
    (order: any) => order.isOrdered === "pending"
  );
  const deliveredOrders = orders.filter(
    (order: any) => order.isOrdered === "delivered"
  );

  return (
    <div>
      <h2 className="text-2xl font-bold">Pending Orders</h2>
      {pendingOrders.length === 0 ? (
        <p>No pending orders.</p>
      ) : (
        pendingOrders.map((order: any) => (
          <div key={order._id} className="order-card">
            <h4>Order ID: {order._id}</h4>
            <p>Status: {order.status}</p>
            {order.products.map((product: any) => (
              <div key={product._id}>
                <p>Product: {product.title}</p>
                <p>Price: ${product.price}</p>
              </div>
            ))}
          </div>
        ))
      )}

      <h2 className="text-2xl font-bold mt-6">Delivered Orders</h2>
      {deliveredOrders.length === 0 ? (
        <p>No delivered orders.</p>
      ) : (
        deliveredOrders.map((order: any) => (
          <div key={order._id} className="order-card">
            <h4>Order ID: {order._id}</h4>
            <p>Status: {order.status}</p>
            {order.products.map((product: any) => {
              const isReviewed = reviewedProducts.includes(
                product.productId._id
              );

              return (
                <div key={product.productId._id} className="mb-6">
                  <p>Product: {product.title}</p>
                  <p>Price: ${product.price}</p>
                  <p>Rating: {product.rating || "Not rated"}</p>

                  {/* Review Input */}
                  <textarea
                    value={reviews[product.productId._id] || ""}
                    onChange={(e) =>
                      handleReviewChange(product.productId._id, e.target.value)
                    }
                    placeholder="Write your review here..."
                    className="p-4 border border-gray-300 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
                    disabled={isReviewed} // Disable if already reviewed
                  />

                  {/* Rating Input */}
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

                  {/* Submit Review Button */}
                  <Button
                    onPress={() => handleSubmitReview(product.productId._id)}
                    className="mt-2"
                    disabled={isReviewed} // Disable button if product is already reviewed
                  >
                    {isReviewed ? "Reviewed" : "Submit Review"}
                  </Button>
                </div>
              );
            })}
          </div>
        ))
      )}
    </div>
  );
};

export default UserOrders;
