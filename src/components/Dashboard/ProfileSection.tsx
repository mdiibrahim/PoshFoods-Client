/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect, useRef } from "react";
import { useGetUserProfileQuery } from "@/redux/api/authApi";
import {
  useGetUserOrdersQuery,
  useGetAllOrdersQuery,
} from "@/redux/api/orderApi";
import { Spinner, Button } from "@nextui-org/react";
import UpdateProfileModal from "./UpdateProfileModal";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const ProfileSection: React.FC = () => {
  const {
    data: userData,
    isLoading: profileLoading,
    error: profileError,
  } = useGetUserProfileQuery(undefined);

  const isAdmin = userData?.data?.role === "admin";

  // Only fetch orders based on user role
  const {
    data: ordersData,
    isLoading: ordersLoading,
    error: ordersError,
  } = isAdmin
    ? useGetAllOrdersQuery(undefined)
    : useGetUserOrdersQuery(undefined);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const [deliveredCount, setDeliveredCount] = useState(0);
  const chartRef = useRef<any>(null); // Chart reference

  // Process and count pending & delivered orders
  useEffect(() => {
    if (ordersData) {
      const orders = ordersData?.data || [];
      const pendingOrders = orders.filter(
        (order: any) => order.isOrdered === "pending"
      ).length;
      const deliveredOrders = orders.filter(
        (order: any) => order.isOrdered === "delivered"
      ).length;

      setPendingCount(pendingOrders);
      setDeliveredCount(deliveredOrders);
    }
  }, [ordersData]);

  if (profileLoading || ordersLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spinner label="Loading profile..." />
      </div>
    );
  }

  if (profileError || ordersError) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-red-500">
          Failed to load data. Please try again later.
        </p>
      </div>
    );
  }

  // Chart data & configuration
  const chartData = {
    labels: ["Pending", "Delivered"],
    datasets: [
      {
        data:
          pendingCount + deliveredCount === 0
            ? [1, 1]
            : [pendingCount, deliveredCount],
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        borderColor: "#ffffff",
        borderWidth: 2,
        hoverOffset: 10,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          usePointStyle: true,
        },
      },
      title: {
        display: true,
        text: "Order Status",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) =>
            `${tooltipItem.label}: ${tooltipItem.raw} orders`,
        },
      },
    },
  };

  return (
    <div>
      <h2 className="text-4xl font-bold text-primary mb-6">Profile</h2>
      <div className="dark:bg-darkBackground rounded-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p className="text-lg">
            <strong>Name:</strong> {userData?.data?.name || "N/A"}
          </p>
          <p className="text-lg">
            <strong>Email:</strong> {userData?.data?.email || "N/A"}
          </p>
          <p className="text-lg">
            <strong>Phone:</strong> {userData?.data?.phone || "N/A"}
          </p>
          <p className="text-lg">
            <strong>Address:</strong> {userData?.data?.address || "N/A"}
          </p>
        </div>
        <div className="mt-4">
          <Button
            onPress={() => setIsModalOpen(true)}
            className="bg-primary text-white hover:bg-secondary"
          >
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Pie Chart Section */}
      <div
        className="w-full lg:w-1/2 mx-auto my-8"
        style={{ height: "400px", position: "relative" }}
      >
        <Pie ref={chartRef} data={chartData} options={chartOptions} />
      </div>

      {/* Update Profile Modal */}
      <UpdateProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ProfileSection;
