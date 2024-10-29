"use client";
import React, { useState } from "react";
import { useGetUserProfileQuery } from "@/redux/api/authApi";
import { Spinner, Button } from "@nextui-org/react";
import UpdateProfileModal from "./UpdateProfileModal"; // Import UpdateProfileModal

const ProfileSection: React.FC = () => {
  const { data, isLoading, error } = useGetUserProfileQuery(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

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
    <div className="">
      <h2 className="text-4xl font-bold text-primary mb-6">Profile</h2>
      <div className="  dark:bg-darkBackground rounded-lg p-8">
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
        <div className="mt-4">
          <Button
            onPress={() => setIsModalOpen(true)}
            className="bg-primary text-white hover:bg-secondary"
          >
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Modal for updating profile */}
      <UpdateProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ProfileSection;
