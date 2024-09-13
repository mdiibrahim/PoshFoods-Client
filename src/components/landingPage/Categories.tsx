import React from "react";
import Link from "next/link"; // For routing

const categories = [
  { name: "Fruits", image: "/path/to/fruits-image.jpg" },
  { name: "Vegetables", image: "/path/to/vegetables-image.jpg" },
  { name: "Dairy", image: "/path/to/dairy-image.jpg" },
  { name: "Bakery", image: "/path/to/bakery-image.jpg" },
  { name: "Meat", image: "/path/to/meat-image.jpg" },
];

const Categories = () => {
  return (
    <section className="py-16 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-10">Food Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map((category, idx) => (
          <Link
            key={idx}
            href={`/product?category=${encodeURIComponent(category.name)}`}
          >
            <div className="bg-white p-6 text-center shadow rounded group transition-transform transform hover:scale-105 cursor-pointer">
              <div className="h-40 mb-4">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <h3 className="text-xl font-semibold">{category.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;
