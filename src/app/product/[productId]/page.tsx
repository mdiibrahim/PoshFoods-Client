// src/app/product/[productId]/page.tsx
"use client";
import { useGetProductByIdQuery } from "@/redux/api/productApi";

import { useParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@nextui-org/react";

const ProductDetails = () => {
  const { productId } = useParams();
  const { data: product, isLoading, error } = useGetProductByIdQuery(productId);

  if (isLoading) return <p>Loading...</p>;
  if (error || !product) return <p>Product not found</p>;

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

          <div className="flex items-center mb-4">
            <Button className="mr-4" size="lg">
              Add to Cart
            </Button>
            <Button size="lg">Buy Now</Button>
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
