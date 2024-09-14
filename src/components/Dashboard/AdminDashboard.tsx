// src/components/Dashboard/AdminDashboard.tsx
import React from "react";
import SharedDashboard from "./SharedDashboard";
import WelcomeSection from "./WelcomeSection";
import ProfileSection from "./ProfileSection";
import AddProductSection from "./AddProduct";
import ProductsSection from "./AllProducts";
import OrdersSection from "./AllOrders";

export default function AdminDashboard() {
  const sections = {
    welcome: <WelcomeSection />,
    profile: <ProfileSection />,
    AddProduct: <AddProductSection />,
    AllProducts: <ProductsSection />,
    AllOrders: <OrdersSection />,
  };

  return <SharedDashboard sections={sections} />;
}
