/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import Slider from "react-slick";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

// Custom Arrow Component for the Slider
function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "url('/path-to-your-arrow-right-image.png')",
        backgroundSize: "cover",
        right: "10px", // Adjust positioning
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "url('/path-to-your-arrow-left-image.png')",
        backgroundSize: "cover",
        left: "10px", // Adjust positioning
        zIndex: 1,
      }}
      onClick={onClick}
    />
  );
}

export default function FlashSale() {
  const flashSaleProducts = [
    {
      title: "Fresh Apples",
      img: "/images/apple.png",
      price: "$2.99",
      discount: "$3.50",
    },
    {
      title: "Organic Milk",
      img: "/images/milk.png",
      price: "$5.49",
      discount: "$6.00",
    },
    {
      title: "Whole Wheat Bread",
      img: "/images/bread.png",
      price: "$1.99",
      discount: "$2.50",
    },
    {
      title: "Eggs - 12 Pack",
      img: "/images/eggs.png",
      price: "$3.99",
      discount: "$4.50",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold text-center mb-10">Flash Sale</h2>
      <Slider {...settings}>
        {flashSaleProducts.map((item, index) => (
          <div key={index}>
            <Card
              shadow="sm"
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
                <div>
                  <span className="text-primary text-lg">{item.price}</span>
                  <span className="text-gray-400 line-through ml-2">
                    {item.discount}
                  </span>
                </div>
              </CardFooter>
            </Card>
          </div>
        ))}
      </Slider>
    </section>
  );
}
