/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import Slider from "react-slick";
import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useGetProductsQuery } from "@/redux/api/productApi";
import { useRouter } from "next/navigation";

// Custom arrow components for slider
function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} bg-primary hover:bg-secondary p-4 rounded-full text-white cursor-pointer flex items-center justify-center`}
      style={{
        ...style,
        display: "flex",
        right: "5px",
        zIndex: 1,
      }}
      onClick={onClick}
    >
      <i className="fas fa-chevron-right" />
    </div>
  );
}

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} bg-primary hover:bg-secondary p-4 rounded-full text-white cursor-pointer flex items-center justify-center`}
      style={{
        ...style,
        display: "flex",
        left: "5px",
        zIndex: 1,
      }}
      onClick={onClick}
    >
      <i className="fas fa-chevron-left" />
    </div>
  );
}

export default function FlashSale() {
  const { data, isLoading } = useGetProductsQuery({ isFlashSale: true });
  const router = useRouter();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const itemsToShow = data?.data.slice(0, 10);

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
    <motion.section
      className="py-8 px-2  "
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold text-center text-primary dark:text-darkText">
          Flash Sale Products
        </h2>
        <Button
          onClick={() => router.push(`/product?isPopular=true`)}
          className="bg-primary text-darkText hover:bg-secondary transition-all"
        >
          See All
        </Button>
      </div>

      {itemsToShow ? (
        <Slider {...settings} className="">
          {itemsToShow.map((item: any, index: number) => (
            <motion.div
              key={index}
              className="px-2 "
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card
                shadow="sm"
                isPressable
                className="w-64 hover:scale-105 transition-transform duration-300 ease-in-out rounded-lg gap-x-2"
                onPress={() => router.push(`/product/${item._id}`)}
              >
                <CardBody className="p-0">
                  <Image
                    width="256px"
                    height="180px"
                    alt={item.title}
                    className="object-cover  rounded-t-none rounded-b-none"
                    src={item.image}
                  />
                </CardBody>
                <CardFooter className="justify-between px-2 py-4 dark:bg-[#1B263B]">
                  <span className="font-bold text-sm lg:text-base text-[#1B263B] dark:text-white">
                    {item.title}
                  </span>
                  <div>
                    <span className="text-primary text-sm lg:text-lg">
                      ${item.price}
                    </span>
                    <span className="text-gray-400 line-through ml-2 text-sm lg:text-base">
                      $15
                    </span>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </Slider>
      ) : (
        <p className="text-center text-primary dark:text-white">
          There are no offers available. Offers coming soon!
        </p>
      )}
    </motion.section>
  );
}
