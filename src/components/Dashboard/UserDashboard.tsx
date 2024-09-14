// src/components/Dashboard/UserDashboard.tsx
import React from "react";
import SharedDashboard from "./SharedDashboard";
import WelcomeSection from "./WelcomeSection";
import ProfileSection from "./ProfileSection";
import UserOrders from "./MyOrders";

export default function UserDashboard() {
  const sections = {
    welcome: <WelcomeSection />,
    profile: <ProfileSection />,
    MyOrders: <UserOrders />,
  };

  return <SharedDashboard sections={sections} />;
}
