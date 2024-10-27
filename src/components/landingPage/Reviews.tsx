/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import Slider from "react-slick";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import { useGetTestimonialsQuery } from "@/redux/api/reviewApi";

const sliderSettings = {
  dots: true,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  speed: 2000,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

export default function ReviewSection() {
  const { data, isLoading } = useGetTestimonialsQuery(undefined);

  if (isLoading) return <p>Loading...</p>;

  const reviews = data?.data.slice(0, 10);

  return (
    <section className="p-4 my-16 dark:bg-darkBackground">
      <h2 className="text-3xl font-bold text-center mb-10 text-primary dark:text-darkText">
        Customer Reviews
      </h2>
      {reviews && reviews.length > 0 ? (
        <Slider {...sliderSettings}>
          {reviews.map((review: any, index: number) => (
            <motion.div key={index} className="p-2">
              <Card className="flex flex-col justify-between h-[250px] dark:bg-darkBackground">
                <CardHeader className="flex items-center">
                  <Image
                    alt={`${review.name}'s profile picture`}
                    className="w-16 h-16 rounded-full mr-4"
                    src={review.product.image}
                  />
                  <div>
                    <h3 className="font-bold text-primary dark:text-white">
                      {review.name}
                    </h3>
                    <p>{"⭐".repeat(review.rating)}</p>
                  </div>
                </CardHeader>

                <CardBody className="p-4 flex-grow dark:text-white text-center">
                  <p className="line-clamp-2">{review.comment}</p>
                </CardBody>

                <CardFooter className="bg-primary p-4 text-center mt-auto">
                  <p>{review.user.name}</p>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </Slider>
      ) : (
        <div className="text-center p-4">
          <p className="text-xl font-semibold text-primary dark:text-white">
            No reviews yet
          </p>
          <blockquote className="mt-4 text-lg italic text-primary dark:text-white">
            &quot;Be the first to leave a review and share your experience&quot;
          </blockquote>
        </div>
      )}
    </section>
  );
}
