import React from "react";

const Banner = () => {
  return (
    <section className="bg-primary text-white py-16 px-5 text-center">
      <h1 className="text-4xl font-bold mb-4">
        Discover Deliciousness at PoshFoods
      </h1>
      <p className="text-lg mb-8">
        Order fresh groceries, snacks, and meals with fast delivery.
      </p>
      <button className="bg-secondary px-8 py-4 text-lg font-semibold rounded hover:bg-secondary-dark">
        Shop Now
      </button>
    </section>
  );
};

export default Banner;
