import React from "react";

const Categories = () => {
  const categories = [
    "Fruits & Vegetables",
    "Dairy Products",
    "Snacks",
    "Beverages",
  ];

  return (
    <section className="py-16 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-10">Food Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category, idx) => (
          <div key={idx} className="bg-white p-6 text-center shadow rounded">
            <h3 className="text-xl font-semibold mb-2">{category}</h3>
            <div className="bg-gray-200 h-40"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
