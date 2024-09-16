/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useGetProductsQuery } from "@/redux/api/productApi";
import {
  Card,
  CardHeader,
  CardFooter,
  Image,
  Button,
  Spinner,
  Pagination,
} from "@nextui-org/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CATEGORIES } from "@/constant/category";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export default function Products() {
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [category, setCategory] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [rating, setRating] = useState("");

  // Convert searchParams to a query object
  const query: Record<string, any> = {};
  searchParams.forEach((value, key) => {
    if (value) {
      query[key] = value;
    }
  });

  // Add filters and pagination to the query
  query.page = currentPage;
  query.limit = limit;
  if (category) query.category = category;
  if (priceMin) query.priceMin = priceMin;
  if (priceMax) query.priceMax = priceMax;
  if (rating) query.rating = rating;

  const { data, error, isLoading } = useGetProductsQuery(query);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
    setCurrentPage(1);
  };

  if (isLoading) return <Spinner label="Loading..." />;
  if (error && "data" in error) {
    const fetchError = error as FetchBaseQueryError;
    if (fetchError?.data && (fetchError.data as any).statusCode === 404) {
      return (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg text-center">
          No Product found!!
        </div>
      );
    }
  }
  if (!data || !data.data || data.data.length === 0) {
    return (
      <div className="text-center">
        <p>No products found.</p>
        <Link href="/product">
          <Button className="bg-primary hover:bg-secondary text-white mt-4">
            View All Products
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Filter Section */}
      <div className="my-12 flex flex-wrap gap-4 ">
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

        {/* Price Range Filter */}
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

        {/* Rating Filter */}
        <div>
          <label htmlFor="rating" className="block text-sm font-medium">
            Minimum Rating:
          </label>
          <input
            type="number"
            id="rating"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="p-2 border rounded"
          />
        </div>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full p-4">
        {data?.data &&
          data?.data?.map((product: any) => (
            <Card
              key={product._id}
              isFooterBlurred
              className="h-[350px] col-span-1 hover:shadow-lg transition-transform transform hover:scale-105"
            >
              <CardHeader className="absolute z-10 top-1 flex-col items-start bg-opacity-60">
                <p className=" bg-black bg-opacity-70 text-white  text-sm rounded-md  uppercase font-bold">
                  {product.category}
                </p>
              </CardHeader>
              <Image
                removeWrapper
                alt={product.title}
                className="z-0 w-full h-full object-cover opacity-40"
                src={
                  product.image.startsWith("http")
                    ? product.image
                    : `/images/${product.image}`
                }
              />
              <CardFooter className="absolute bg-black/50 bottom-0 z-10 flex justify-between items-center w-full p-2 border-t border-gray-600">
                <div className="flex flex-col">
                  <p className="text-sm text-white">{product.title}</p>
                  <p className="text-sm text-white">${product.price}</p>
                </div>
                <Link href={`/product/${product._id}`}>
                  <Button
                    radius="full"
                    size="sm"
                    className="bg-primary hover:bg-secondary text-white"
                  >
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <Pagination
          total={data.totalPages}
          initialPage={currentPage}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}
