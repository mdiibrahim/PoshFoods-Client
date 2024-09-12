/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { useGetProductsQuery } from "@/redux/api/productApi"; // Update path accordingly
import { Card, CardHeader, CardFooter, Image, Button } from "@nextui-org/react";
import Link from "next/link";

export default function Products() {
  const { data, error, isLoading } = useGetProductsQuery(undefined);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading products.</p>;
  console.log(data.data);
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {data.data.map((product: any) => (
          <Card
            key={product._id}
            isFooterBlurred
            className="h-[300px] col-span-1"
          >
            <CardHeader className="absolute z-10 top-1 flex-col items-start">
              <p className="text-tiny text-white/60 uppercase font-bold">
                {product.title}
              </p>
            </CardHeader>
            <Image
              removeWrapper
              alt={product.title}
              className="z-0 w-full h-full object-cover"
              src={product.image}
            />
            <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
              <div className="flex flex-grow gap-2 items-center">
                <div className="flex flex-col">
                  <p className="text-tiny text-white/60">{product.price}</p>
                  <p className="text-tiny text-white/60">{product.category}</p>
                </div>
              </div>
              <Link href={`/product/${product._id}`}>
                <Button radius="full" size="sm">
                  View Details
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
