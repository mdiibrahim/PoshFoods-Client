/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import CartDetails from "@/components/ui/CartDetails";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { FaShoppingCart } from "react-icons/fa";
import { useEffect } from "react";

const CartModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const cartItems = useAppSelector((state) => state.cart.products);
  const totalPrice = useAppSelector((state) => state.cart.totalPrice);
  const tax = useAppSelector((state) => state.cart.tax);
  const grandTotal = useAppSelector((state) => state.cart.grandTotal);
  const { role } = useAppSelector((state) => state.auth); // Get the user's role
  const router = useRouter();

  // Check if the user is an admin
  const isAdmin = role === "admin";

  // If the role is admin, set cartItems to empty and reset totals
  const adjustedCartItems = isAdmin ? [] : cartItems;
  const adjustedTotalPrice = isAdmin ? 0 : totalPrice;
  const adjustedTax = isAdmin ? 0 : tax;
  const adjustedGrandTotal = isAdmin ? 0 : grandTotal;

  // Remove cart items from localStorage if the role is admin
  useEffect(() => {
    if (isAdmin) {
      localStorage.removeItem("orderSummary");
    }
  }, [isAdmin]);

  const handleProceedToCheckout = () => {
    const orderSummary = {
      cartItems: adjustedCartItems,
      totalPrice: adjustedTotalPrice,
      tax: adjustedTax,
      deliveryFee: 15,
      grandTotal: adjustedGrandTotal,
    };
    localStorage.setItem("orderSummary", JSON.stringify(orderSummary));
    onOpenChange();
    router.push("/checkout");
  };

  return (
    <>
      <Button
        onPress={onOpen}
        className="flex items-center bg-primary text-white hover:bg-secondary"
        disabled={isAdmin} // Disable button for admin
      >
        <FaShoppingCart size={15} />{" "}
        <span className="ml-2">{adjustedCartItems.length}</span>
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-xl font-semibold">
                Your Cart
              </ModalHeader>
              <ModalBody>
                {adjustedCartItems && adjustedCartItems.length > 0 ? (
                  <div className="space-y-4">
                    {adjustedCartItems.map((product: any) => (
                      <CartDetails key={product._id} product={product} />
                    ))}
                    <div className="mt-6 text-right">
                      <p>Total Price: ${adjustedTotalPrice.toFixed(2)}</p>
                      <p>Tax: ${adjustedTax.toFixed(2)}</p>
                      <p>Grand Total: ${adjustedGrandTotal.toFixed(2)}</p>
                    </div>
                  </div>
                ) : (
                  <p>Your cart is empty.</p>
                )}
              </ModalBody>
              <ModalFooter>
                <div className="flex justify-between w-full">
                  <Button
                    onPress={handleProceedToCheckout}
                    isDisabled={adjustedCartItems.length === 0 || isAdmin} // Disable for empty cart or admin
                    className="bg-primary text-white hover:bg-secondary"
                  >
                    Proceed to Checkout
                  </Button>
                  <Button onPress={onOpenChange} className="text-secondary">
                    Continue Shopping
                  </Button>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CartModal;
