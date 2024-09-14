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
    console.log(id, status);
    try {
      const response = await updateOrderStatus({ id, status }).unwrap();

      toast.success(
        `Order ${response._id} status updated to ${response.status}`
      );
    } catch (err) {
      console.error(err);
      toast.error("Error updating order status. Please try again.");
    }
  };

  if (isLoading) return <p>Loading orders...</p>;
  if (error) return <p>Error loading orders</p>;

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
              <p className="text-gray-700">Status: {order.status}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleStatusChange(order._id, "Pending")}
                disabled={order.status === "Pending"}
                className="bg-yellow-500 text-white py-2 px-4 rounded"
              >
                Set to Pending
              </button>
              <button
                onClick={() => handleStatusChange(order._id, "delivered")}
                disabled={order.status === "delivered"}
                className="bg-green-500 text-white py-2 px-4 rounded"
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
