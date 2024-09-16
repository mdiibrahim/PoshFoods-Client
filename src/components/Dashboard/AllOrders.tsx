/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Spinner,
  Button,
} from "@nextui-org/react";
import {
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "@/redux/api/orderApi";
import { toast } from "react-toastify";

const AdminOrderManagement: React.FC = () => {
  const { data, error, isLoading } = useGetAllOrdersQuery(undefined); // Fetch all data at once
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const response = await updateOrderStatus({ id, status }).unwrap();
      toast.success(`Order status updated to ${response.data.isOrdered}`);
    } catch (err) {
      toast.error("Error updating order status. Please try again.");
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner label="Loading orders..." />
      </div>
    );

  if (error)
    return (
      <div className="text-red-500 text-center mt-10">
        <p>Error loading orders. Please try again later.</p>
      </div>
    );

  const orders = data?.data || [];
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  // Get paginated data
  const paginatedOrders = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6 dark:bg-darkBackground dark:text-darkText">
      <h2 className="text-3xl font-bold mb-6 text-primary dark:text-white">
        Manage Orders
      </h2>

      {/* Items Per Page Control */}
      <div className="mb-4">
        <label className="mr-2">Items per page:</label>
        <select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
          className="border p-2 rounded"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>

      {/* Orders Table */}
      <Table aria-label="Order Management Table" selectionMode="none">
        <TableHeader>
          <TableColumn>CUSTOMER</TableColumn>
          <TableColumn>PRODUCTS</TableColumn>
          <TableColumn>TOTAL PRICE</TableColumn>
          <TableColumn>STATUS</TableColumn>
        </TableHeader>
        <TableBody>
          {paginatedOrders &&
            paginatedOrders.map((order: any) => (
              <TableRow key={order._id}>
                <TableCell>
                  <div>
                    <p>{order.user.name}</p>
                    <p>{order.user.email}</p>
                    <p>{order.user.phone}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <ul>
                    {order.products.map((product: any, index: number) => (
                      <li key={index}>
                        <strong>{product.productId.title}</strong>
                        <p>
                          {product.quantity} x ${product.price}
                        </p>
                      </li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
                <TableCell>
                  {order.isOrdered === "pending" ? (
                    <Button
                      color="success"
                      className="bg-primary hover:bg-secondary"
                      onPress={() => handleStatusChange(order._id, "delivered")}
                    >
                      Mark as Delivered
                    </Button>
                  ) : (
                    <p className="text-green-600">Done</p>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      {/* Pagination Section */}
      <div className="flex justify-center mt-6">
        <Pagination
          total={totalPages}
          page={currentPage}
          onChange={(page) => setCurrentPage(page)}
          showControls
          isCompact
          color="primary"
        />
        <div className="ml-4">
          <p>
            Page {currentPage} of {totalPages}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderManagement;
