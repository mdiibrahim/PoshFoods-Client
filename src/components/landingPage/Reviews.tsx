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

const reviews = [
  {
    name: "John Doe",
    comment:
      "PoshFoods has the best fresh produce in the city! Highly recommended.",
    img: "/images/profile1.png", // Add profile image
    rating: 5,
  },
  {
    name: "Jane Smith",
    comment:
      "Quick delivery and everything was fresh. Will definitely order again.",
    img: "/images/profile2.png",
    rating: 4,
  },
  {
    name: "Alex Johnson",
    comment: "Great customer service and amazing food selection!",
    img: "/images/profile3.png",
    rating: 5,
  },
  {
    name: "Emily Davis",
    comment:
      "Reasonable prices, but delivery took a little longer than expected.",
    img: "/images/profile4.png",
    rating: 3,
  },
];

// Slider settings
const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  speed: 2000,
  autoplaySpeed: 3000,
};

export default function ReviewSection() {
  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold text-center mb-10">Customer Reviews</h2>
      <Slider {...settings}>
        {reviews.map((review, index) => (
          <div key={index}>
            <Card
              shadow="sm"
              className="hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              <CardHeader className="flex items-center">
                <Image
                  alt={`${review.name}'s profile picture`}
                  className="w-16 h-16 rounded-full mr-4"
                  src={review.img}
                />
                <div>
                  <h3 className="font-bold">{review.name}</h3>
                  <p>{"⭐".repeat(review.rating)}</p>{" "}
                  {/* Display star ratings */}
                </div>
              </CardHeader>
              <CardBody className="p-4">
                <p>{review.comment}</p>
              </CardBody>
              <CardFooter>
                <p>Rating: {review.rating} out of 5</p>
              </CardFooter>
            </Card>
          </div>
        ))}
      </Slider>
    </section>
  );
}
