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

const CartModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const cartItems = useAppSelector((state) => state.cart.products);
  const totalPrice = useAppSelector((state) => state.cart.totalPrice);
  const tax = useAppSelector((state) => state.cart.tax);
  const grandTotal = useAppSelector((state) => state.cart.grandTotal);
  const router = useRouter();

  const handleProceedToCheckout = () => {
    const orderSummary = {
      cartItems,
      totalPrice,
      tax,
      deliveryFee: 15,
      grandTotal,
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
      >
        <FaShoppingCart size={15} />{" "}
        <span className="ml-2">{cartItems.length}</span>
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-xl font-semibold">
                Your Cart
              </ModalHeader>
              <ModalBody>
                {cartItems.length > 0 ? (
                  <div className="space-y-4">
                    {cartItems.map((product: any) => (
                      <CartDetails key={product._id} product={product} />
                    ))}
                    <div className="mt-6 text-right">
                      <p>Total Price: ${totalPrice.toFixed(2)}</p>
                      <p>Tax: ${tax.toFixed(2)}</p>
                      <p>Grand Total: ${grandTotal.toFixed(2)}</p>
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
                    isDisabled={cartItems.length === 0}
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
