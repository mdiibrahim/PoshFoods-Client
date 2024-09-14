// src/components/CartModal.tsx
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

const CartModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const cartItems = useAppSelector((state) => state.cart.products);
  const totalPrice = useAppSelector((state) => state.cart.totalPrice);
  const tax = useAppSelector((state) => state.cart.tax);
  const grandTotal = useAppSelector((state) => state.cart.grandTotal);
  const router = useRouter();

  const handleProceedToCheckout = () => {
    // Save order summary to localStorage
    const orderSummary = {
      cartItems,
      totalPrice,
      tax,
      deliveryFee: 15,
      grandTotal,
    };
    localStorage.setItem("orderSummary", JSON.stringify(orderSummary));
    onOpenChange();
    // Redirect to the checkout page
    router.push("/checkout");
  };

  return (
    <>
      <Button onPress={onOpen}>Cart ({cartItems.length})</Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Your Cart
              </ModalHeader>
              <ModalBody>
                {cartItems.length > 0 ? (
                  cartItems.map((product: any) => (
                    <CartDetails key={product._id} product={product} />
                  ))
                ) : (
                  <p>Your cart is empty.</p>
                )}
              </ModalBody>
              <ModalFooter>
                <div className="flex justify-between w-full">
                  <Button
                    onPress={handleProceedToCheckout}
                    isDisabled={cartItems.length === 0}
                    className="bg-primary"
                  >
                    Proceed to Checkout
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
