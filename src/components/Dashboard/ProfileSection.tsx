"use client";
import React from "react";
import { useGetUserProfileQuery } from "@/redux/api/authApi"; // Import the user profile query
import { Spinner } from "@nextui-org/react"; // Spinner for loading state

const ProfileSection: React.FC = () => {
  const { data, isLoading, error } = useGetUserProfileQuery(undefined); // Fetch user data

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spinner label="Loading profile..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-red-500">
          Failed to load profile data. Please try again.
        </p>
      </div>
    );
  }

  const userData = data?.data; // Access user data

  return (
    <div>
      <h2 className="text-4xl font-bold  text-primary mb-6">Profile</h2>
      <div className="bg-white shadow dark:bg-darkBackground rounded-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p className="text-lg">
            <strong>Name:</strong> {userData?.name || "N/A"}
          </p>
          <p className="text-lg">
            <strong>Email:</strong> {userData?.email || "N/A"}
          </p>
          <p className="text-lg">
            <strong>Phone:</strong> {userData?.phone || "N/A"}
          </p>
          <p className="text-lg">
            <strong>Address:</strong> {userData?.address || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
