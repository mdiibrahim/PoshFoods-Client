"use client";
import React from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

export default function PopularProducts() {
  const popularProducts = [
    {
      title: "Bananas",
      img: "/images/bananas.png",
      price: "$1.29",
    },
    {
      title: "Orange Juice",
      img: "/images/orange-juice.png",
      price: "$3.99",
    },
    {
      title: "Potatoes",
      img: "/images/potatoes.png",
      price: "$0.99",
    },
    {
      title: "Chicken Breast",
      img: "/images/chicken.png",
      price: "$6.49",
    },
  ];

  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold text-center mb-10">
        Most Popular Products
      </h2>
      <div className="gap-4 grid grid-cols-2 sm:grid-cols-4">
        {popularProducts.map((item, index) => (
          <Card
            shadow="sm"
            key={index}
            isPressable
            className="hover:scale-105 transition-transform duration-300 ease-in-out"
            onPress={() => console.log(`${item.title} pressed`)}
          >
            <CardBody className="p-0 overflow-visible">
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt={item.title}
                className="object-cover w-full h-[140px]"
                src={item.img}
              />
            </CardBody>
            <CardFooter className="justify-between px-2 py-4">
              <span className="font-bold">{item.title}</span>
              <span className="text-primary text-lg">{item.price}</span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
