import React from "react";
import {
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "@/redux/api/orderApi"; // Adjust import path
import { toast } from "react-toastify";

const AdminOrderManagement: React.FC = () => {
  const { data, error, isLoading } = useGetAllOrdersQuery(undefined);
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const response = await updateOrderStatus({ id, status }).unwrap();
      console.log(response);
      toast.success(
        `Order ${response._id} status updated to ${response.status}`
      );
    } catch (err) {
      console.error(err);
      toast.error("Error updating order status. Please try again.");
    }
  };

  if (isLoading) return <p>Loading orders...</p>;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Manage Orders</h2>
      <ul className="space-y-4">
        {data?.data?.map((order: any) => (
          <li
            key={order._id}
            className="bg-white p-6 shadow-lg rounded-lg flex justify-between items-center"
          >
            <div>
              <h4 className="font-bold text-lg">{order.user.name}'s Order</h4>
              <p className="text-gray-700">Order ID: {order._id}</p>
              <p className="text-gray-700">Status: {order.isOrdered}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleStatusChange(order._id, "delivered")}
                disabled={order.isOrdered === "delivered"}
                className={`px-4 py-2 rounded-lg text-white ${
                  order.isOrdered === "delivered"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                Mark as Delivered
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminOrderManagement;
