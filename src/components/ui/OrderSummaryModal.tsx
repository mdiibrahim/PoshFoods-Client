"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Radio,
  RadioGroup,
} from "@nextui-org/react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useCreateOrderMutation } from "@/redux/api/orderApi";
import { clearCart } from "@/redux/features/cartSlice";

const OrderSummaryModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const cartItems = useAppSelector((state) => state.cart.products);
  const totalPrice = useAppSelector((state) => state.cart.totalPrice);
  const tax = useAppSelector((state) => state.cart.tax);
  const grandTotal = useAppSelector((state) => state.cart.grandTotal);
  const userToken = useAppSelector((state) => state.auth.token); // Get authenticated user token
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const handleMakeOrder = async () => {
    if (!userToken) {
      toast.error("Please login to proceed.");
      router.push("/login");
      return;
    }

    try {
      const orderData = {
        products: cartItems.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
          price: item.price,
        })),
        totalPrice: grandTotal,
      };
      console.log(orderData);

      await createOrder(orderData).unwrap();

      // Clear the cart after order creation
      dispatch(clearCart());

      toast.success("Order created successfully!");

      // Auto-close the modal after the order is created
      onOpenChange(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create order.");
    }
  };

  return (
    <>
      <Button
        onPress={onOpen}
        isDisabled={cartItems.length === 0} // Disable if cart is empty
      >
        Proceed to Checkout
      </Button>

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
                <p>Delivery Fee: $15</p>
                <p>Grand Total: ${grandTotal.toFixed(2)}</p>

                {/* Payment Method */}
                <div className="mt-4">
                  <h3>Payment Method</h3>
                  <RadioGroup value="cod" isDisabled>
                    <Radio value="cod">Cash On Delivery</Radio>
                  </RadioGroup>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={handleMakeOrder}
                  isLoading={isLoading}
                >
                  Make Order
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default OrderSummaryModal;
