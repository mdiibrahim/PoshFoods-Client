import React, { useState } from "react";
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
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "@/redux/api/productApi";
import { toast } from "react-toastify";

interface ProductModalProps {
  product?: any; // For the update case
  onClose: () => void;
  isOpen: boolean;
  isUpdate?: boolean; // Is it for updating the product?
}

const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  isOpen,
  isUpdate,
}) => {
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const initialState = {
    title: product?.title || "",
    description: product?.description || "",
    price: product?.price || "",
    category: product?.category || CATEGORIES[0],
    tags: product?.tags.join(",") || "",
    quantity: product?.quantity || "",
    inStock: product?.inStock || true,
    image: product?.image || "",
    isPopular: product?.isPopular || false,
    isFlashSale: product?.isFlashSale || false,
    additionalImages: product?.additionalImages || [""],
    features: product?.features || [""],
  };

  const [productState, setProductState] = useState(initialState);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setProductState({
      ...productState,
      [name]:
        name === "inStock" || name === "isPopular" || name === "isFlashSale"
          ? value === "true" // Convert "true"/"false" strings to booleans
          : value,
    });
  };

  // Handle additional images input change
  const handleAdditionalImagesChange = (index: number, value: string) => {
    const updatedImages = [...productState.additionalImages];
    updatedImages[index] = value;
    setProductState({ ...productState, additionalImages: updatedImages });
  };

  // Handle features input change
  const handleFeaturesChange = (index: number, value: string) => {
    const updatedFeatures = [...productState.features];
    updatedFeatures[index] = value;
    setProductState({ ...productState, features: updatedFeatures });
  };

  // Add new additional image input
  const addAdditionalImageField = () => {
    setProductState({
      ...productState,
      additionalImages: [...productState.additionalImages, ""],
    });
  };

  // Add new feature input
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
      if (isUpdate) {
        await updateProduct({
          id: product._id,
          updatedData: productData,
        }).unwrap();
        toast.success("Product updated successfully!");
      } else {
        await createProduct(productData).unwrap();
        toast.success("Product created successfully!");
      }
      onClose();
    } catch (error) {
      toast.error("Failed to save product. Please try again.");
      console.error("Error saving product:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} placement="center">
      <ModalContent>
        <ModalHeader>
          {isUpdate ? "Update Product" : "Add New Product"}
        </ModalHeader>
        <ModalBody>
          <Input
            type="text"
            label="Product Title"
            name="title"
            value={productState.title}
            onChange={handleInputChange}
            required
          />
          <Input
            type="text"
            label="Product Description"
            name="description"
            value={productState.description}
            onChange={handleInputChange}
            required
          />
          <Input
            type="text"
            label="Price"
            name="price"
            value={productState.price}
            onChange={handleInputChange}
            required
          />
          <Input
            type="text"
            label="Quantity"
            name="quantity"
            value={productState.quantity}
            onChange={handleInputChange}
            required
          />
          <Input
            type="text"
            label="Tags (comma-separated)"
            name="tags"
            value={productState.tags}
            onChange={handleInputChange}
          />
          <Input
            type="text"
            label="Image URL"
            name="image"
            value={productState.image}
            onChange={handleInputChange}
            required
          />
          <div>
            <label className="block font-bold">Additional Images</label>
            {productState.additionalImages.map((image, index) => (
              <div key={index} className="flex items-center mb-2">
                <Input
                  type="text"
                  placeholder={`Additional Image ${index + 1}`}
                  value={image}
                  onChange={(e) =>
                    handleAdditionalImagesChange(index, e.target.value)
                  }
                  className="w-full"
                />
              </div>
            ))}
            <Button onPress={addAdditionalImageField}>Add Image</Button>
          </div>
          <div>
            <label className="block font-bold">Features</label>
            {productState.features.map((feature, index) => (
              <div key={index} className="flex items-center mb-2">
                <Input
                  type="text"
                  placeholder={`Feature ${index + 1}`}
                  value={feature}
                  onChange={(e) => handleFeaturesChange(index, e.target.value)}
                  className="w-full"
                />
              </div>
            ))}
            <Button onPress={addFeatureField}>Add Feature</Button>
          </div>
          <Select
            label="Category"
            name="category"
            value={productState.category}
            onChange={(e) =>
              setProductState({ ...productState, category: e as string })
            }
          >
            {CATEGORIES.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </Select>
          <Select
            label="In Stock"
            name="inStock"
            value={productState.inStock.toString()}
            onChange={(e) =>
              setProductState({ ...productState, inStock: e === "true" })
            }
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
            name="isPopular"
            value={productState.isPopular.toString()}
            onChange={(e) =>
              setProductState({ ...productState, isPopular: e === "true" })
            }
          >
            <SelectItem key="false" value="false">
              False
            </SelectItem>
            <SelectItem key="true" value="true">
              True
            </SelectItem>
          </Select>
          <Select
            label="Flash Sale"
            name="isFlashSale"
            value={productState.isFlashSale.toString()}
            onChange={(e) =>
              setProductState({ ...productState, isFlashSale: e === "true" })
            }
          >
            <SelectItem key="false" value="false">
              False
            </SelectItem>
            <SelectItem key="true" value="true">
              True
            </SelectItem>
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
            {isUpdate ? "Update Product" : "Add Product"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProductModal;
