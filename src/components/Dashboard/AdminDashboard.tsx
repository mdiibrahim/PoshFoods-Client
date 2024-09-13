// src/components/Dashboard/AdminDashboard.tsx
import React from "react";
import SharedDashboard from "./SharedDashboard";
import WelcomeSection from "./WelcomeSection";
import ProfileSection from "./ProfileSection";
import AddProductSection from "./AddProduct";

export default function AdminDashboard() {
  const sections = {
    welcome: <WelcomeSection />,
    profile: <ProfileSection />,
    AddProduct: <AddProductSection />,
  };

  return <SharedDashboard sections={sections} />;
}
