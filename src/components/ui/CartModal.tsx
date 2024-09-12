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
import OrderSummaryModal from "@/components/ui/OrderSummaryModal";

const CartModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const cartItems = useAppSelector((state) => state.cart.products);

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
                <OrderSummaryModal />
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CartModal;
