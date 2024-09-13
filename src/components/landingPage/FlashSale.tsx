/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import Slider from "react-slick";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useGetProductsQuery } from "@/redux/api/productApi";

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
  const { data, isLoading } = useGetProductsQuery({ isFlashSale: true });
  if (isLoading) {
    return <p>Loading...</p>;
  }

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
        {data.data.map((item) => (
          <div key={item._id}>
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
                  src={item.image}
                />
              </CardBody>
              <CardFooter className="justify-between px-2 py-4">
                <span className="font-bold">{item.title}</span>
                <div>
                  <span className="text-primary text-lg">{item.price}</span>
                  <span className="text-gray-400 line-through ml-2">15</span>
                </div>
              </CardFooter>
            </Card>
          </div>
        ))}
      </Slider>
    </section>
  );
}
