"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import AdminDashboard from "@/components/Dashboard/AdminDashboard";
import UserDashboard from "@/components/Dashboard/UserDashboard";

export default function DashboardPage() {
  const router = useRouter();
  const role = useAppSelector((state) => state.auth.role);

  useEffect(() => {
    if (!role) {
      router.push("/login"); // Redirect if not logged in
    }
  }, [role, router]);

  if (!role) return null;

  // Render dashboard based on user role
  return role === "admin" ? <AdminDashboard /> : <UserDashboard />;
}