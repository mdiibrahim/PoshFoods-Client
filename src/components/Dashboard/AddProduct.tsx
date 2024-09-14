import { CATEGORIES } from "@/constant/category";
import { useCreateProductMutation } from "@/redux/api/productApi";
import React, { useState } from "react";
import { toast } from "react-toastify";

const AddProductSection: React.FC = () => {
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    price: "",
    category: CATEGORIES[0],
    tags: "",
    quantity: "",
    inStock: true,
    image: "",
    isPopular: false,
    isFlashSale: false,
    additionalImages: [""], // Start with one empty input
    features: [""], // Start with one empty input
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]:
        name === "inStock" || name === "isPopular" || name === "isFlashSale"
          ? value === "true"
          : value,
    });
  };

  // Handle dynamic inputs for additional images
  const handleAdditionalImagesChange = (index: number, value: string) => {
    const updatedImages = [...newProduct.additionalImages];
    updatedImages[index] = value;
    setNewProduct({ ...newProduct, additionalImages: updatedImages });
  };

  // Handle dynamic inputs for features
  const handleFeaturesChange = (index: number, value: string) => {
    const updatedFeatures = [...newProduct.features];
    updatedFeatures[index] = value;
    setNewProduct({ ...newProduct, features: updatedFeatures });
  };

  // Add a new image input field
  const addAdditionalImageField = () => {
    setNewProduct({
      ...newProduct,
      additionalImages: [...newProduct.additionalImages, ""],
    });
  };

  // Add a new feature input field
  const addFeatureField = () => {
    setNewProduct({
      ...newProduct,
      features: [...newProduct.features, ""],
    });
  };

  const handleCreateProduct = async () => {
    if (
      !newProduct.title ||
      !newProduct.description ||
      !newProduct.price ||
      !newProduct.category ||
      !newProduct.quantity ||
      !newProduct.image
    ) {
      toast.error("Please fill out all required fields.");
      return;
    }

    const productData = {
      ...newProduct,
      price: Number(newProduct.price),
      quantity: Number(newProduct.quantity),
      tags: newProduct.tags.split(",").map((tag) => tag.trim()), // Convert comma-separated string to array
    };

    if (isNaN(productData.price) || isNaN(productData.quantity)) {
      toast.error("Price and quantity must be valid numbers.");
      return;
    }

    try {
      await createProduct(productData).unwrap();
      toast.success("Product added successfully!");
      setNewProduct({
        title: "",
        description: "",
        price: "",
        category: CATEGORIES[0],
        tags: "",
        quantity: "",
        inStock: true,
        image: "",
        isPopular: false,
        isFlashSale: false,
        additionalImages: [""], // Reset
        features: [""], // Reset
      });
    } catch (error) {
      toast.error("Failed to add product. Please try again.");
      console.error("Error creating product:", error);
    }
  };

  return (
    <div className="bg-white p-6 shadow-lg text-blue-500 rounded-lg">
      <h4 className="text-2xl font-bold mb-4 text-primary">Add New Product</h4>
      <input
        type="text"
        name="title"
        placeholder="Product Title"
        value={newProduct.title}
        onChange={handleInputChange}
        className="p-2 border border-gray-300 rounded w-full mb-2"
      />
      <textarea
        name="description"
        placeholder="Product Description"
        value={newProduct.description}
        onChange={handleInputChange}
        className="p-2 border border-gray-300 rounded w-full mb-2"
      />
      <input
        type="text"
        name="price"
        placeholder="Price"
        value={newProduct.price}
        onChange={handleInputChange}
        className="p-2 border border-gray-300 rounded w-full mb-2"
      />
      <input
        type="text"
        name="quantity"
        placeholder="Quantity"
        value={newProduct.quantity}
        onChange={handleInputChange}
        className="p-2 border border-gray-300 rounded w-full mb-2"
      />
      <input
        type="text"
        name="tags"
        placeholder="Tags (comma separated)"
        value={newProduct.tags}
        onChange={handleInputChange}
        className="p-2 border border-gray-300 rounded w-full mb-2"
      />
      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={newProduct.image}
        onChange={handleInputChange}
        className="p-2 border border-gray-300 rounded w-full mb-2"
      />

      <div className="mb-4">
        <label className="block mb-2 font-bold">Additional Images</label>
        {newProduct.additionalImages.map((image, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              placeholder={`Additional Image URL ${index + 1}`}
              value={image}
              onChange={(e) =>
                handleAdditionalImagesChange(index, e.target.value)
              }
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addAdditionalImageField}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600"
        >
          Add Image
        </button>
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-bold">Features</label>
        {newProduct.features.map((feature, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              placeholder={`Feature ${index + 1}`}
              value={feature}
              onChange={(e) => handleFeaturesChange(index, e.target.value)}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addFeatureField}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600"
        >
          Add Feature
        </button>
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-bold">Category</label>
        <select
          name="category"
          value={newProduct.category}
          onChange={handleInputChange}
          className="p-2 border border-gray-300 rounded w-full"
        >
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-bold">In Stock</label>
        <select
          name="inStock"
          value={newProduct.inStock.toString()}
          onChange={handleInputChange}
          className="p-2 border border-gray-300 rounded w-full"
        >
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-bold">Popular Product</label>
        <select
          name="isPopular"
          value={newProduct.isPopular.toString()}
          onChange={handleInputChange}
          className="p-2 border border-gray-300 rounded w-full"
        >
          <option value="false">False</option>
          <option value="true">True</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-bold">Flash Sale</label>
        <select
          name="isFlashSale"
          value={newProduct.isFlashSale.toString()}
          onChange={handleInputChange}
          className="p-2 border border-gray-300 rounded w-full"
        >
          <option value="false">False</option>
          <option value="true">True</option>
        </select>
      </div>
      <button
        onClick={handleCreateProduct}
        disabled={isLoading}
        className={`bg-primary text-white px-4 py-2 rounded mt-2 hover:bg-primary-dark transition-colors duration-300 ${
          isLoading && "opacity-50 cursor-not-allowed"
        }`}
      >
        {isLoading ? "Creating..." : "Add Product"}
      </button>
    </div>
  );
};

export default AddProductSection;
