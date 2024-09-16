/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useGetProductsQuery } from "@/redux/api/productApi";
import { useRouter } from "next/navigation";

export default function PopularProducts() {
  const { data, isLoading } = useGetProductsQuery({ isPopular: true });
  const router = useRouter();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <motion.section
      className="my-24 dark:bg-darkBackground"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold text-center text-primary dark:text-darkText">
          Most Popular Products
        </h2>
        <Button
          onClick={() => router.push(`/product?isPopular=true`)}
          className="bg-primary text-darkText hover:bg-secondary transition-all"
        >
          See All
        </Button>
      </div>
      {data?.data && data?.data?.length > 0 ? (
        <motion.div
          className="gap-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.6,
            delayChildren: 0.3,
            staggerChildren: 0.2,
          }}
        >
          {data?.data.map((item: any) => (
            <motion.div
              key={item._id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card
                shadow="sm"
                isPressable
                className="hover:scale-105 transition-transform duration-300 ease-in-out"
                onPress={() => router.push(`/product/${item._id}`)}
              >
                <CardBody className="p-0">
                  <Image
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    alt={item.title}
                    className="object-cover w-full h-[250px]"
                    src={item.image}
                  />
                </CardBody>
                <CardFooter className="justify-between text-textColor dark:text-darkText px-2 py-4 bg-primary dark:bg-darkBackground">
                  <span className="font-bold">{item.title}</span>
                  <span className="text-lg">${item.price}</span>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="flex items-center justify-center h-52">
          <p className="text-xl font-semibold text-primary dark:text-white">
            No products available...
          </p>
        </div>
      )}
    </motion.section>
  );
}
