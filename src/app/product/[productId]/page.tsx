// src/app/product/[productId]/page.tsx
"use client";
import { useGetProductByIdQuery } from "@/redux/api/productApi";

import { useParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { addToCart } from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hooks";

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);
  const { data, isLoading, error } = useGetProductByIdQuery(productId);
  const product = data?.data;
  if (isLoading) return <p>Loading...</p>;
  if (error || !product) return <p>Product not found</p>;
  console.log(product);
  // Use required image if additionalImages is empty or undefined
  const images = product.additionalImages?.length
    ? product.additionalImages
    : [product.image];

  // Fallback to dummy features if no features exist
  const features = product.features?.length
    ? product.features
    : ["Feature 1", "Feature 2", "Feature 3"];

  // Fallback to dummy long description
  const longDescription = product.longDescription
    ? product.longDescription
    : "This is a detailed description of the product. Explore the fantastic features of this product and enjoy its high quality.";
  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }));
  };

  const handleBuyNow = () => {
    // Redirect to checkout
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
        <p>No reviews yet.</p>
      </div>
    </div>
  );
};

export default ProductDetails;
