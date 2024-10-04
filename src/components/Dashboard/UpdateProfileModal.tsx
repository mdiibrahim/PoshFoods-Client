/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { toast } from "react-toastify";
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from "@/redux/api/authApi"; // Import API hooks

interface UpdateProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UpdateProfileModal: React.FC<UpdateProfileModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { data, isLoading: isProfileLoading } =
    useGetUserProfileQuery(undefined);
  const [updateUserProfile, { isLoading: isUpdating }] =
    useUpdateUserProfileMutation(); // Hook for profile update
  const profileData = data?.data;

  const [profileState, setProfileState] = useState({
    name: "",
    phone: "",
    address: "",
    email: "", // Adding the email field for display
  });

  // Pre-fill form with user profile data
  useEffect(() => {
    if (profileData) {
      setProfileState({
        name: profileData?.name || "",
        phone: profileData?.phone || "",
        address: profileData?.address || "",
        email: profileData?.email || "", // Set email
      });
    }
  }, [profileData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileState({
      ...profileState,
      [name]: value,
    });
  };

  const handleSaveProfile = async () => {
    try {
      await updateUserProfile({
        name: profileState.name,
        phone: profileState.phone,
        address: profileState.address,
      }).unwrap();
      toast.success("Profile updated successfully!");
      onClose(); // Close modal after saving profile
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      isDismissable={false}
      onOpenChange={onClose}
      placement="center"
    >
      <ModalContent>
        <ModalHeader className="text-lg font-semibold">
          Update Profile
        </ModalHeader>
        <ModalBody>
          {isProfileLoading ? (
            <p>Loading profile...</p>
          ) : (
            <>
              <Input
                label="Name"
                name="name"
                value={profileState.name}
                onChange={handleInputChange}
                required
              />
              <Input
                label="Phone"
                name="phone"
                value={profileState.phone}
                onChange={handleInputChange}
                required
              />
              <Input
                label="Address"
                name="address"
                value={profileState.address}
                onChange={handleInputChange}
                required
              />
              <Input
                label="Email (Cannot be changed)"
                name="email"
                value={profileState.email}
                readOnly
                className="cursor-not-allowed bg-gray-100"
              />
              <p className="text-red-500 text-sm mt-2">
                *Email cannot be changed.
              </p>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onPress={onClose}>
            Cancel
          </Button>
          <Button
            color="primary"
            onPress={handleSaveProfile}
            isLoading={isUpdating}
          >
            Save Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateProfileModal;
