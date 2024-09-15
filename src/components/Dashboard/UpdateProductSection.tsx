/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { CATEGORIES } from "@/constant/category";
import { useUpdateProductMutation } from "@/redux/api/productApi";
import { toast } from "react-toastify";

interface ProductModalProps {
  product?: any; // Product data to populate form
  onClose: () => void;
  isOpen: boolean;
}

const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  isOpen,
}) => {
  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  const [productState, setProductState] = useState({
    title: "",
    description: "",
    price: "",
    category: CATEGORIES[0],
    tags: "",
    quantity: "",
    inStock: false,
    image: "",
    isPopular: product.isPopular,
    isFlashSale: product.isFlashSale,
    additionalImages: [""],
    features: [""],
  });

  // Set default values when product changes
  useEffect(() => {
    if (product) {
      setProductState({
        title: product.title || "",
        description: product.description || "",
        price: product.price || "",
        category: product.category || CATEGORIES[0],
        tags: product.tags.join(",") || "",
        quantity: product.quantity || "",
        inStock: product.inStock || true,
        image: product.image || "",
        isPopular: product.isPopular || false,
        isFlashSale: product.isFlashSale || false,
        additionalImages: product.additionalImages || [""],
        features: product.features || [""],
      });
    }
  }, [product]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProductState({
      ...productState,
      [name]:
        name === "inStock" || name === "isPopular" || name === "isFlashSale"
          ? value === "true" // Convert string to boolean
          : value,
    });
  };

  const handleAdditionalImagesChange = (index: number, value: string) => {
    const updatedImages = [...productState.additionalImages];
    updatedImages[index] = value;
    setProductState({ ...productState, additionalImages: updatedImages });
  };

  const handleFeaturesChange = (index: number, value: string) => {
    const updatedFeatures = [...productState.features];
    updatedFeatures[index] = value;
    setProductState({ ...productState, features: updatedFeatures });
  };

  const addAdditionalImageField = () => {
    setProductState({
      ...productState,
      additionalImages: [...productState.additionalImages, ""],
    });
  };

  const addFeatureField = () => {
    setProductState({
      ...productState,
      features: [...productState.features, ""],
    });
  };

  const handleSaveProduct = async () => {
    const productData = {
      ...productState,
      price: Number(productState.price),
      quantity: Number(productState.quantity),
      tags: productState.tags.split(",").map((tag) => tag.trim()),
    };

    if (isNaN(productData.price) || isNaN(productData.quantity)) {
      toast.error("Price and quantity must be valid numbers.");
      return;
    }

    try {
      await updateProduct({
        id: product._id,
        updatedData: productData,
      }).unwrap();
      toast.success("Product updated successfully!");
      onClose(); // Close the modal after updating
    } catch (error) {
      toast.error("Failed to update product. Please try again.");
      console.error("Error updating product:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      isDismissable={false}
      onOpenChange={onClose}
      placement="center"
      scrollBehavior="inside"
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        },
      }}
    >
      <ModalContent className="max-h-[80vh] overflow-auto">
        <ModalHeader className="text-lg font-semibold">
          Update Product
        </ModalHeader>
        <ModalBody>
          <Input
            label="Product Title"
            name="title"
            value={productState.title}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Product Description"
            name="description"
            value={productState.description}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Price"
            name="price"
            value={productState.price}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Quantity"
            name="quantity"
            value={productState.quantity}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Tags (comma-separated)"
            name="tags"
            value={productState.tags}
            onChange={handleInputChange}
          />
          <Input
            label="Image URL"
            name="image"
            value={productState.image}
            onChange={handleInputChange}
            required
          />

          <div>
            <label className="font-medium">Additional Images</label>
            {productState.additionalImages.map((image, index) => (
              <Input
                key={index}
                placeholder={`Additional Image ${index + 1}`}
                value={image}
                onChange={(e) =>
                  handleAdditionalImagesChange(index, e.target.value)
                }
              />
            ))}
            <Button
              onPress={addAdditionalImageField}
              size="sm"
              className="mt-2"
            >
              Add Image
            </Button>
          </div>

          <div className="mt-4">
            <label className="font-medium">Features</label>
            {productState.features.map((feature, index) => (
              <Input
                key={index}
                placeholder={`Feature ${index + 1}`}
                value={feature}
                onChange={(e) => handleFeaturesChange(index, e.target.value)}
              />
            ))}
            <Button onPress={addFeatureField} size="sm" className="mt-2">
              Add Feature
            </Button>
          </div>

          {/* Select Components */}
          <Select
            label="In Stock"
            placeholder="Select stock status"
            selectedKeys={productState.inStock ? ["true"] : ["false"]}
            onSelectionChange={(selected) => {
              const selectedValue = Array.from(selected).join("");
              setProductState({
                ...productState,
                inStock: selectedValue === "true",
              });
            }}
            className="max-w-xs mt-4"
          >
            <SelectItem key="true" value="true">
              True
            </SelectItem>
            <SelectItem key="false" value="false">
              False
            </SelectItem>
          </Select>

          <Select
            label="Popular Product"
            placeholder="Select status"
            selectedKeys={productState.isPopular ? ["true"] : ["false"]}
            onSelectionChange={(selected) => {
              const selectedValue = Array.from(selected).join("");
              setProductState({
                ...productState,
                isPopular: selectedValue === "true",
              });
            }}
            className="max-w-xs mt-4"
          >
            <SelectItem key="true" value="true">
              True
            </SelectItem>
            <SelectItem key="false" value="false">
              False
            </SelectItem>
          </Select>

          <Select
            label="Flash Sale"
            placeholder="Select sale status"
            selectedKeys={productState.isFlashSale ? ["true"] : ["false"]}
            onSelectionChange={(selected) => {
              const selectedValue = Array.from(selected).join("");
              setProductState({
                ...productState,
                isFlashSale: selectedValue === "true",
              });
            }}
            className="max-w-xs mt-4"
          >
            <SelectItem key="true" value="true">
              True
            </SelectItem>
            <SelectItem key="false" value="false">
              False
            </SelectItem>
          </Select>

          <Select
            label="Category"
            name="category"
            placeholder="Select category"
            selectedKeys={[productState.category]}
            onSelectionChange={(selected) => {
              const selectedValue = Array.from(selected).join("");
              setProductState({
                ...productState,
                category: selectedValue,
              });
            }}
            className="max-w-xs mt-4"
          >
            {CATEGORIES.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </Select>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onPress={onClose}>
            Cancel
          </Button>
          <Button
            color="primary"
            onPress={handleSaveProduct}
            isLoading={isLoading}
          >
            Save Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProductModal;
