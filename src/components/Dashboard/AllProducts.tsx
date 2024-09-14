"use client";
import React, { useState } from "react";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "@/redux/api/productApi";
import { toast } from "react-toastify";
import ProductModal from "./UpdateProductSection";

const ProductsSection: React.FC = () => {
  const { data, error, isLoading } = useGetProductsQuery(undefined);
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

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading products.</p>;

  return (
    <div>
      <h3 className="text-3xl font-bold mb-6 text-primary">Products</h3>
      <ul className="space-y-4">
        {data?.data.map((product: any) => (
          <li key={product._id} className="bg-white p-6 shadow-lg rounded-lg">
            <h4 className="font-bold text-lg">{product.title}</h4>
            <p className="text-gray-700">{product.category}</p>
            <p className="text-gray-700">${product.price}</p>
            <div className="mt-4 flex space-x-4">
              <button
                onClick={() => setSelectedProduct(product)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteProduct(product._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

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
