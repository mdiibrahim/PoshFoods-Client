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
      className={`${className} bg-primary p-4 rounded-full text-white cursor-pointer flex items-center justify-center`}
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
      className={`${className} bg-primary p-4 rounded-full text-white cursor-pointer flex items-center justify-center`}
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
      className="py-8  lg:px-8  dark:bg-[#1B263B]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col lg:flex-row lg:justify-between mb-6">
        <h2 className="text-2xl font-bold text-center mb-4 lg:mb-0 text-primary dark:text-white">
          Flash Sale Products
        </h2>
        <Button
          onClick={() => router.push(`/product?isPopular=true`)}
          className="bg-primary dark:bg-[#A8DADC] text-white hover:bg-secondary dark:hover:bg-[#F1FAEE] transition-all w-full lg:w-auto"
        >
          See All
        </Button>
      </div>

      {itemsToShow && itemsToShow ? (
        <Slider {...settings}>
          {itemsToShow.map((item: any, index: number) => (
            <motion.div
              key={index}
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
                    className="object-cover h-[140px]"
                    src={item.image}
                  />
                </CardBody>
                <CardFooter className="justify-between px-2 py-4  dark:bg-[#1B263B]">
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
