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
    additionalImages: [""],
    features: [""],
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

  const handleAdditionalImagesChange = (index: number, value: string) => {
    const updatedImages = [...newProduct.additionalImages];
    updatedImages[index] = value;
    setNewProduct({ ...newProduct, additionalImages: updatedImages });
  };

  const handleFeaturesChange = (index: number, value: string) => {
    const updatedFeatures = [...newProduct.features];
    updatedFeatures[index] = value;
    setNewProduct({ ...newProduct, features: updatedFeatures });
  };

  const addField = (type: string) => {
    if (type === "image") {
      setNewProduct({
        ...newProduct,
        additionalImages: [...newProduct.additionalImages, ""],
      });
    } else {
      setNewProduct({ ...newProduct, features: [...newProduct.features, ""] });
    }
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
      tags: newProduct.tags.split(",").map((tag) => tag.trim()),
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
        additionalImages: [""],
        features: [""],
      });
    } catch (error) {
      toast.error("Failed to add product. Please try again.");
    }
  };

  return (
    <div className=" p-6  rounded-lg dark:text-darkText   text-gray-900">
      <h4 className="text-2xl font-bold mb-4 text-primary">Add New Product</h4>

      <div className="space-y-4 ">
        <input
          type="text"
          name="title"
          placeholder="Product Title"
          value={newProduct.title}
          onChange={handleInputChange}
          className="p-3 border  border-gray-300 rounded w-full"
        />

        <textarea
          name="description"
          placeholder="Product Description"
          value={newProduct.description}
          onChange={handleInputChange}
          className="p-3 border border-gray-300 rounded w-full"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newProduct.price}
          onChange={handleInputChange}
          className="p-3 border border-gray-300 rounded w-full"
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={newProduct.quantity}
          onChange={handleInputChange}
          className="p-3 border border-gray-300 rounded w-full"
        />

        <input
          type="text"
          name="tags"
          placeholder="Tags (comma separated)"
          value={newProduct.tags}
          onChange={handleInputChange}
          className="p-3 border border-gray-300 rounded w-full"
        />

        <input
          type="url"
          name="image"
          placeholder="Image URL"
          value={newProduct.image}
          onChange={handleInputChange}
          className="p-3 border border-gray-300 rounded w-full"
        />
      </div>

      {/* Dynamic Fields */}
      <div className="my-4">
        <label className="block mb-2 font-bold">Additional Images</label>
        {newProduct.additionalImages.map((image, index) => (
          <input
            key={index}
            type="url"
            placeholder={`Image URL ${index + 1}`}
            value={image}
            onChange={(e) =>
              handleAdditionalImagesChange(index, e.target.value)
            }
            className="p-3 mb-2 border border-gray-300 rounded w-full"
          />
        ))}
        <button
          type="button"
          onClick={() => addField("image")}
          className=" text-white px-4 py-2 rounded mt-2 bg-primary hover:bg-secondary"
        >
          Add Image
        </button>
      </div>

      <div className="my-4">
        <label className="block mb-2 font-bold">Features</label>
        {newProduct.features.map((feature, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Feature ${index + 1}`}
            value={feature}
            onChange={(e) => handleFeaturesChange(index, e.target.value)}
            className="p-3 mb-2 border border-gray-300 rounded w-full"
          />
        ))}
        <button
          type="button"
          onClick={() => addField("feature")}
          className="bg-primary hover:bg-secondary text-white px-4 py-2 rounded mt-2 00"
        >
          Add Feature
        </button>
      </div>

      {/* Dropdowns */}
      <div className="my-4">
        <label className="block mb-2 font-bold">Category</label>
        <select
          name="category"
          value={newProduct.category}
          onChange={handleInputChange}
          className="p-3 border border-gray-300 rounded w-full"
        >
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="my-4">
        <label className="block mb-2 font-bold">In Stock</label>
        <select
          name="inStock"
          value={newProduct.inStock.toString()}
          onChange={handleInputChange}
          className="p-3 border border-gray-300 rounded w-full"
        >
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      </div>

      <div className="my-4">
        <label className="block mb-2 font-bold">Popular Product</label>
        <select
          name="isPopular"
          value={newProduct.isPopular.toString()}
          onChange={handleInputChange}
          className="p-3 border border-gray-300 rounded w-full"
        >
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      </div>

      <div className="my-4">
        <label className="block mb-2 font-bold">Flash Sale</label>
        <select
          name="isFlashSale"
          value={newProduct.isFlashSale.toString()}
          onChange={handleInputChange}
          className="p-3 border border-gray-300 rounded w-full"
        >
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      </div>

      <button
        onClick={handleCreateProduct}
        disabled={isLoading}
        className={` text-white px-4 py-2 rounded bg-primary hover:bg-secondary transition-colors duration-300 ${
          isLoading && "opacity-50 cursor-not-allowed"
        }`}
      >
        {isLoading ? "Creating..." : "Add Product"}
      </button>
    </div>
  );
};

export default AddProductSection;
