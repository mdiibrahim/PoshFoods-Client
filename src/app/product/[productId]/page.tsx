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
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { addToCart } from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks"; // Import authentication and redux hooks
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";
import { useRouter } from "next/navigation";

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth); // Get the user's authentication token
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
    dispatch(addToCart({ product, quantity }));
  };

  const handleBuyNow = () => {
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

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-12 gap-6">
        {/* Left Section - Product Images */}
        <div className="col-span-12 md:col-span-6 flex flex-col items-center">
          {/* Main Product Image */}
          <Image
            src={product.image}
            alt={product.title}
            width={500}
            height={500}
            className="w-full h-auto object-cover rounded-lg"
          />
          {/* Additional Images */}
          <div className="grid grid-cols-3 gap-2 mt-4">
            {images.map((img: string, index: number) => (
              <Image
                key={index}
                src={img}
                alt={`Additional image ${index + 1}`}
                width={150}
                height={150}
                className="w-full h-auto object-cover rounded-lg"
              />
            ))}
          </div>
        </div>

        {/* Right Section - Product Details */}
        <div className="col-span-12 md:col-span-6">
          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
          <p className="text-xl text-gray-600 mb-4">${product.price}</p>

          <p className="mb-6">{product.description}</p>

          {/* Quantity Selector and Add to Cart / Buy Now */}
          <div className="flex items-center gap-4 my-4">
            <div className="flex items-center">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                -
              </button>
              <input
                type="text"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-12 text-center bg-white text-black border mx-2"
              />
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            <Button
              onClick={handleAddToCart}
              className="bg-blue-500 text-white"
            >
              Add to Cart
            </Button>
            <Button onClick={handleBuyNow} className="bg-green-500 text-white">
              Buy Now
            </Button>
          </div>

          {/* Additional Info (Shipping & Returns) */}
          <div className="mt-6">
            <p>Shipping charges on all orders $60</p>
            <p>
              Delivers in 3-7 working days{" "}
              <a href="/shipping" className="underline">
                Shipping & Return
              </a>
            </p>
          </div>

          {/* Features */}
          <div className="my-8">
            <h2 className="text-2xl font-bold mb-2">Features</h2>
            <ul className="list-disc list-inside">
              {features.map((feature: string, index: number) => (
                <li key={index} className="text-gray-700">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Long Description */}
      <div className="my-10">
        <h2 className="text-2xl font-bold mb-4">Description</h2>
        <p className="text-gray-700 leading-relaxed">{longDescription}</p>
      </div>

      {/* Reviews Section */}
      <div className="my-10">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        {isReviewsLoading ? (
          <p>Loading reviews...</p>
        ) : reviewsError ? (
          <p>Error loading reviews.</p>
        ) : reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <ul>
            {reviews.map((review: any, index: number) => (
              <li key={index} className="mb-4">
                <div className="flex justify-between items-center">
                  <p className="font-bold">{review.user.name}</p>
                  {/* Display stars for the rating */}
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        className={`text-2xl ${
                          star <= review.rating
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </li>
            ))}
          </ul>
        )}

        {/* Add Review Section (For Authenticated Users Only) */}

        <div className="mt-8">
          <h3 className="text-xl font-bold mb-2">Add a Review</h3>
          <textarea
            value={reviewComment}
            onChange={(e) => setReviewComment(e.target.value)}
            placeholder="Write your review here..."
            className="p-4 border border-gray-300 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <div className="flex items-center mb-4">
            <span className="mr-3 text-lg font-semibold">Rating:</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                onClick={() => setRating(star)}
                className={`cursor-pointer text-3xl transition-colors duration-300 ${
                  star <= rating ? "text-yellow-500" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <Button
            onPress={handleSubmitReview}
            className="mt-2 bg-blue-500 text-white"
          >
            Submit Review
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
