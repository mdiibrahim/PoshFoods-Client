"use client";
import React from "react";
import { useGetUserProfileQuery } from "@/redux/api/authApi";
import { Spinner } from "@nextui-org/react";

const WelcomeSection: React.FC = () => {
  const { data, isLoading, error } = useGetUserProfileQuery(undefined);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spinner label="Loading user details..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-red-500">
          Failed to load user data. Please try again.
        </p>
      </div>
    );
  }

  const userData = data?.data;
  const userRole = userData?.role === "admin" ? "Admin" : "User";
  const userName = userData?.name || userData?.email.split("@")[0] || "Guest";

  return (
    <div className="relative min-h-[400px] flex items-center justify-center bg-gradient-to-r from-teal-500 to-blue-600 text-white p-4 sm:p-8 lg:p-12">
      <div className="bg-black bg-opacity-50 p-6 sm:p-8 lg:p-10 rounded-md text-center shadow-lg">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 animate-pulse">
          Welcome {userRole} {userName}
        </h1>
        <p className="text-lg sm:text-xl lg:text-2xl">
          {userData?.role === "admin"
            ? "As an admin, you have full access to manage the platform."
            : "We are glad to have you back. Enjoy exploring our platform!"}
        </p>
      </div>
    </div>
  );
};

export default WelcomeSection;
