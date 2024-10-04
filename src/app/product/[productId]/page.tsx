/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/product/[productId]/page.tsx
"use client";
import { useGetProductByIdQuery } from "@/redux/api/productApi";
import {
  useGetReviewsQuery,
  useAddReviewMutation,
} from "@/redux/api/reviewApi"; // Import the reviews query and mutation
import { useParams } from "next/navigation";
import Image from "next/image";
import { Button, Tooltip } from "@nextui-org/react";

import { addToCart } from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks"; // Import authentication and redux hooks
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useAppDispatch();
  const { token, role } = useAppSelector((state) => state.auth); // Get the user's authentication token
  const router = useRouter(); // For navigation

  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(5); // Default rating
  const [reviewComment, setReviewComment] = useState(""); // Review comment
  const [addReview] = useAddReviewMutation(); // Add review mutation

  // Fetch product details
  const {
    data: productData,
    isLoading: isProductLoading,
    error: productError,
  } = useGetProductByIdQuery(productId);
  const product = productData?.data;

  // Fetch reviews for the product
  const {
    data: reviewsData,
    isLoading: isReviewsLoading,
    error: reviewsError,
  } = useGetReviewsQuery(productId);
  const reviews = reviewsData?.data || [];

  if (isProductLoading) return <p>Loading product...</p>;
  if (productError || !product) return <p>Product not found</p>;

  // Use required image if additionalImages is empty or undefined
  const images = product.additionalImages?.length
    ? product.additionalImages
    : [product.image];

  const features = product.features?.length
    ? product.features
    : ["Feature 1", "Feature 2", "Feature 3"];

  const longDescription = product.longDescription
    ? product.longDescription
    : "This is a detailed description of the product. Explore the fantastic features of this product and enjoy its high quality.";

  const handleAddToCart = () => {
    if (quantity > product.quantity) {
      toast.error("Quantity exceeds available stock.");
      return;
    }
    dispatch(addToCart({ product, quantity }));
    toast.success("Added to cart successfully!");
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      setQuantity(1);
    } else if (newQuantity > product.quantity) {
      setQuantity(product.quantity);
      toast.error(`Cannot exceed available stock (${product.quantity}).`);
    } else {
      setQuantity(newQuantity);
    }
  };

  const handleBuyNow = () => {
    if (quantity > product.quantity) {
      toast.error("Quantity exceeds available stock.");
      return;
    }
    if (!token) {
      toast.error("Please log in to buy the product.");
      router.push("/login");
      return;
    }
    // Store the product details in localStorage or any temporary state
    const orderDetails = {
      productId: product._id,
      quantity,
      price: product.price,
      totalPrice: product.price * quantity,
    };

    // Save order details in local storage for the checkout page
    localStorage.setItem("orderDetails", JSON.stringify(orderDetails));

    // Redirect to checkout page
    router.push("/checkout");
  };

  const handleSubmitReview = async () => {
    if (!token) {
      toast.error("Please log in to submit a review.");
      return;
    }

    if (!reviewComment) {
      toast.error("Please write a comment for your review.");
      return;
    }

    try {
      await addReview({
        product: productId,
        comment: reviewComment,
        rating,
      }).unwrap();

      toast.success("Review submitted successfully!");
      setReviewComment(""); // Clear comment after successful submission
      setRating(5); // Reset rating to default
    } catch (error) {
      toast.error("Failed to submit review. Please try again.");
    }
  };
  // Disable actions for admin users
  const isAdmin = role === "admin";
  const adminTooltip = "Admins are not allowed to perform this action.";
  return (
    // Enhance spacing, typography, and layout consistency
    <div className="container m-auto px-4 py-12">
      <div className="grid grid-cols-12 gap-8">
        {/* Left Section - Product Images */}
        <div className="col-span-12 md:col-span-6 flex flex-col items-center">
          {/* Main Product Image */}
          <Image
            src={product.image}
            alt={product.title}
            width={500}
            height={500}
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
          {/* Additional Images */}
          <div className="grid grid-cols-3 gap-2 mt-4">
            {images.map((img: string, index: string) => (
              <Image
                key={index}
                src={img}
                alt={`Additional image`}
                width={150}
                height={150}
                className="w-full h-auto object-cover rounded-lg shadow-md"
              />
            ))}
          </div>
        </div>

        {/* Right Section - Product Details */}
        <div className="col-span-12 md:col-span-6">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            {product.title}
          </h1>
          <p className="text-xl text-primary dark:text-yellow-400 mb-4">
            Price: ${product.price}
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            In Stock:{" "}
            {product.quantity - quantity >= 0 ? product.quantity - quantity : 0}
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {product.description}
          </p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border rounded-lg">
              <Tooltip content={adminTooltip} isDisabled={!isAdmin}>
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={isAdmin} // Disable button for admin
                  className={`px-4 py-2 ${
                    isAdmin
                      ? "bg-red-500 cursor-not-allowed"
                      : "bg-gray-200 hover:bg-gray-300"
                  } rounded-l-lg`}
                >
                  -
                </button>
              </Tooltip>
              <input
                type="text"
                value={quantity}
                onChange={(e) => handleQuantityChange(Number(e.target.value))}
                className="w-12 text-center text-black dark:bg-gray-800 dark:text-white"
              />
              <Tooltip content={adminTooltip} isDisabled={!isAdmin}>
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={isAdmin} // Disable button for admin
                  className={`px-4 py-2 ${
                    isAdmin
                      ? "bg-red-500 cursor-not-allowed"
                      : "bg-gray-200 hover:bg-gray-300"
                  } rounded-r-lg`}
                >
                  +
                </button>
              </Tooltip>
            </div>
            <Tooltip content={adminTooltip} isDisabled={!isAdmin}>
              <Button
                onClick={handleAddToCart}
                className={`${
                  isAdmin ? "bg-red-500 cursor-not-allowed" : "bg-primary"
                } text-white`}
                disabled={isAdmin}
              >
                Add to Cart
              </Button>
            </Tooltip>
            <Tooltip content={adminTooltip} isDisabled={!isAdmin}>
              <Button
                onClick={handleBuyNow}
                className={`${
                  isAdmin ? "bg-red-500 cursor-not-allowed" : "bg-primary"
                } text-white`}
              >
                Buy Now
              </Button>
            </Tooltip>
          </div>

          {/* Features */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-white">
              Features
            </h2>
            <ul className="list-disc list-inside">
              {features.map((feature: string, index: string) => (
                <li key={index} className="text-gray-700 dark:text-gray-300">
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Shipping Info */}
          <div className="mb-6">
            <p className="text-gray-500 dark:text-gray-400">
              Free shipping on orders over $60.
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              Delivery within 3-7 working days.{" "}
              <Link href="/shipping">
                <span className="underline text-primary">
                  Shipping & Return
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Long Description */}
      <div className="my-12">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Product Description
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {longDescription}
        </p>
      </div>

      {/* Reviews Section */}
      <div className="my-12">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Customer Reviews
        </h2>
        {isReviewsLoading ? (
          <p>Loading reviews...</p>
        ) : reviewsError ? (
          <p>Error loading reviews.</p>
        ) : reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <ul className="space-y-6">
            {reviews.map(
              (
                review: any,

                index: string
              ) => (
                <li key={index} className="border-b pb-4">
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-gray-900 dark:text-white">
                      {review.user.name}
                    </p>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          className={`text-lg ${
                            star <= review.rating
                              ? "text-yellow-500"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-400 mt-2">
                    {review.comment}
                  </p>
                </li>
              )
            )}
          </ul>
        )}

        {/* Add Review Section */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Add a Review
          </h3>

          <textarea
            value={reviewComment}
            onChange={(e) => setReviewComment(e.target.value)}
            placeholder="Write your review..."
            className="p-4 border border-gray-300 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <div className="flex items-center mb-4">
            <span className="mr-3 text-lg font-semibold">Rating:</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                onClick={() => setRating(star)}
                className={`cursor-pointer text-3xl ${
                  star <= rating ? "text-yellow-500" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <Tooltip content={adminTooltip} isDisabled={!isAdmin}>
            <Button
              disabled={isAdmin}
              onClick={handleSubmitReview}
              className={`${
                isAdmin ? "bg-red-500 cursor-not-allowed" : "bg-primary"
              } text-white`}
            >
              Submit Review
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
