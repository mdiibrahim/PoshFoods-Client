/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "@/redux/api/productApi";
import { toast } from "react-toastify";
import ProductModal from "./UpdateProductSection";
import { Spinner, Pagination } from "@nextui-org/react"; // Optional for loading spinner and pagination
import Image from "next/image";
import { CATEGORIES } from "@/constant/category"; // Import your categories

const ProductsSection: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [category, setCategory] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");

  const query: Record<string, any> = { page: currentPage, limit };

  // Add filters
  if (category) query.category = category;
  if (priceMin) query.priceMin = priceMin;
  if (priceMax) query.priceMax = priceMax;

  const { data, error, isLoading } = useGetProductsQuery(query);
  const [deleteProduct] = useDeleteProductMutation();
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProduct(id).unwrap();
      toast.success("Product deleted successfully!");
    } catch (error: any) {
      toast.error("An error occurred while deleting the product.");
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
    setCurrentPage(1);
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spinner label="Loading products..." />
      </div>
    );
  if (error)
    return (
      <div className="text-red-500">
        <p>Error loading products. Please try again later.</p>
      </div>
    );

  return (
    <div className="p-4 dark:bg-darkBackground dark:text-darkText">
      <h3 className="text-3xl font-bold mb-6 text-primary">
        Product Management
      </h3>

      {/* Filters Section */}
      <div className="flex flex-wrap gap-4 mb-6">
        {/* Category Filter */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium">
            Category:
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Price Min Filter */}
        <div>
          <label htmlFor="priceMin" className="block text-sm font-medium">
            Price Min:
          </label>
          <input
            type="number"
            id="priceMin"
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
            className="p-2 border rounded"
          />
        </div>

        {/* Price Max Filter */}
        <div>
          <label htmlFor="priceMax" className="block text-sm font-medium">
            Price Max:
          </label>
          <input
            type="number"
            id="priceMax"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
            className="p-2 border rounded"
          />
        </div>

        {/* Limit Items */}
        <div>
          <label htmlFor="limit" className="block text-sm font-medium">
            Items per page:
          </label>
          <select
            id="limit"
            value={limit}
            onChange={handleLimitChange}
            className="p-2 border rounded"
          >
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="32">32</option>
          </select>
        </div>
      </div>

      {/* Product List */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.data &&
          data?.data.map((product: any) => (
            <li
              key={product._id}
              className="bg-backgroundColor p-6 shadow-lg rounded-lg"
            >
              <div className="flex flex-col justify-between h-full ">
                <div className="mb-4">
                  <h4 className="font-bold dark:text-black  text-lg mb-2">
                    {product.title}
                  </h4>
                  <p className="text-gray-500 mb-2">{product.category}</p>
                  <p className="text-gray-700 font-semibold mb-2">
                    ${product.price}
                  </p>
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={50}
                    height={50}
                    className="object-cover mb-4 rounded-md"
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="flex-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
      </ul>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <Pagination
          total={data.totalPages}
          initialPage={currentPage}
          onChange={handlePageChange}
        />
      </div>

      {selectedProduct && (
        <ProductModal
          isOpen={!!selectedProduct}
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default ProductsSection;
