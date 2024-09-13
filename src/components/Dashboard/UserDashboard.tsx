// src/components/Dashboard/UserDashboard.tsx
import React from "react";
import SharedDashboard from "./SharedDashboard";
import WelcomeSection from "./WelcomeSection";
import ProfileSection from "./ProfileSection";

export default function UserDashboard() {
  const sections = {
    welcome: <WelcomeSection />,
    profile: <ProfileSection />,
  };

  return <SharedDashboard sections={sections} />;
}
