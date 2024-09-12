// src/components/OrderSummaryModal.tsx
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
import { useAppSelector } from "@/redux/hooks";

const OrderSummaryModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const cartItems = useAppSelector((state) => state.cart.products);
  const totalPrice = useAppSelector((state) => state.cart.totalPrice);
  const tax = useAppSelector((state) => state.cart.tax);
  const grandTotal = useAppSelector((state) => state.cart.grandTotal);

  return (
    <>
      <Button onPress={onOpen}>Proceed to Checkout</Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Order Summary
              </ModalHeader>
              <ModalBody>
                <ul>
                  {cartItems.map((item) => (
                    <li key={item._id}>
                      {item.title} - {item.quantity} x ${item.price}
                    </li>
                  ))}
                </ul>
                <p>Total Price: ${totalPrice.toFixed(2)}</p>
                <p>Tax: ${tax.toFixed(2)}</p>
                <p>Delivery Fee: 60</p>
                <p>Grand Total: ${grandTotal.toFixed(2)}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary">Checkout</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default OrderSummaryModal;
