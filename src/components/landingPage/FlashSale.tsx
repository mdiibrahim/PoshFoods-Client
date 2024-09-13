/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import Slider from "react-slick";
import { Card, CardBody, CardFooter, Image, Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
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
        zIndex: 1,
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
  const router = useRouter(); // To navigate to product listing page

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const itemsToShow = data?.data.slice(0, 10); // Limit to 10 items
  const hasItems = itemsToShow && itemsToShow.length > 0;

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
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row lg:justify-between mb-6">
        <h2 className="text-2xl font-bold text-center mb-4 lg:mb-0 lg:text-3xl">
          Flash Sale Products{" "}
        </h2>
        {/* See All Button */}
        <Button
          onClick={() => router.push(`/product?isPopular=true`)}
          className="w-full lg:w-auto"
        >
          See All
        </Button>
      </div>

      {hasItems ? (
        <Slider {...settings}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {itemsToShow.map((item: any) => (
              <div key={item._id} className="px-2">
                <Card
                  shadow="sm"
                  isPressable
                  className="hover:scale-105 transition-transform duration-300 ease-in-out"
                >
                  <CardBody className="p-0 overflow-visible">
                    <Image
                      shadow="sm"
                      radius="lg"
                      width="100%"
                      alt={item.title}
                      className="object-cover w-full h-[140px] lg:h-[180px]"
                      src={item.image}
                    />
                  </CardBody>
                  <CardFooter className="justify-between px-2 py-4">
                    <span className="font-bold text-sm lg:text-base">
                      {item.title}
                    </span>
                    <div>
                      <span className="text-primary text-sm lg:text-lg">
                        ${item.price}
                      </span>
                      <span className="text-gray-400 line-through ml-2 text-sm lg:text-base">
                        15
                      </span>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </Slider>
      ) : (
        <p className="text-center">
          There are no offers available. Offers coming soon!
        </p>
      )}
    </section>
  );
}
