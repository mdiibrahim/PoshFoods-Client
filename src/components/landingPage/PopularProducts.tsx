"use client";
import React from "react";
import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useGetProductsQuery } from "@/redux/api/productApi";
import { useRouter } from "next/navigation"; // Use Next.js router for navigation

export default function PopularProducts() {
  const { data, isLoading } = useGetProductsQuery({ isPopular: true });
  const router = useRouter(); // Initialize router for navigation

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <section className="py-16">
      <div className="flex flex-col lg:flex-row lg:justify-between mb-6">
        <h2 className="text-2xl font-bold text-center mb-4 lg:mb-0 lg:text-3xl">
          Most Popular Products{" "}
        </h2>
        {/* See All Button */}
        <Button
          onClick={() => router.push(`/product?isPopular=true`)}
          className="w-full lg:w-auto"
        >
          See All
        </Button>
      </div>
      <div className="gap-4 grid grid-cols-2 sm:grid-cols-4">
        {data.data.map((item) => (
          <Card
            shadow="sm"
            key={item._id}
            isPressable
            className="hover:scale-105 transition-transform duration-300 ease-in-out"
            // Navigate to product details page when pressed
            onPress={() => router.push(`/product/${item._id}`)}
          >
            <CardBody className="p-0 overflow-visible">
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt={item.title}
                className="object-cover w-full h-[140px]"
                src={item.image}
              />
            </CardBody>
            <CardFooter className="justify-between text-primary px-2 py-4">
              <span className="font-bold">{item.title}</span>
              <span className=" text-lg">${item.price}</span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
