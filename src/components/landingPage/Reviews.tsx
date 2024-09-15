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
};

export default function ReviewSection() {
  const { data, error, isLoading } = useGetTestimonialsQuery(undefined);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading reviews.</p>;

  const reviews = data?.data.slice(0, 10);
  console.log(reviews);

  return (
    <section className="py-16 ">
      <h2 className="text-3xl font-bold text-center mb-10 ">
        Customer Reviews
      </h2>
      {reviews.length > 0 ? (
        <Slider {...sliderSettings}>
          {reviews.map((review: any, index: number) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card className="hover:scale-105 transition-transform duration-300 ease-in-out">
                <CardHeader className="flex items-center ">
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
                <CardBody className="p-4 dark:text-white">
                  <p className="">{review.comment}</p>
                </CardBody>
                <CardFooter className="bg-primary ">
                  <p className=" ">{review.user.name}</p>
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
