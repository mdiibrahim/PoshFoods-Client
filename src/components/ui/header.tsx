"use client";

import React, { useState, useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Button,
  Badge,
} from "@nextui-org/react";
import { useRouter } from "next/navigation"; // for navigation
import { useAppDispatch, useAppSelector } from "@/redux/hooks"; // Redux hooks
import { logOut } from "@/redux/features/authSlice";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher"; // ThemeSwitcher component
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import CartModal from "./CartModal";

export default function MergedNavbar() {
  const router = useRouter(); // Programmatic navigation
  const cartItems = useSelector((state: RootState) => state.cart.products);
  const dispatch = useAppDispatch();
  const totalUniqueProducts = cartItems.length;
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const token = useAppSelector((state) => state.auth.token); // Token from Redux store

  // Fetch categories from API (dummy implementation)
  useEffect(() => {
    // Replace with real API call
    const fetchCategories = async () => {
      const categoryData = ["Fruits", "Vegetables", "Dairy", "Bakery", "Meat"]; // Simulated data
      setCategories(categoryData);
    };
    fetchCategories();
  }, []);

  const handleLogout = () => {
    dispatch(logOut());
    router.push("/login");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the search logic here
    console.log("Search query: ", searchQuery);
  };

  return (
    <div className="bg-white dark:bg-gray-800">
      <Navbar>
        {/* Logo and Brand */}
        <NavbarContent>
          <NavbarBrand>
            <Link href="/">PoshFoods</Link>
          </NavbarBrand>
        </NavbarContent>

        {/* Main Menu for Larger Screens */}
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {/* Dropdown for Categories */}
          <Dropdown>
            <NavbarItem>
              <DropdownTrigger>
                <Button
                  disableRipple
                  className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                  radius="sm"
                  variant="light"
                >
                  Categories
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu aria-label="Categories">
              {categories.length > 0 ? (
                categories.map((category, index) => (
                  <DropdownItem key={index}>{category}</DropdownItem>
                ))
              ) : (
                <DropdownItem>Loading...</DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>

          <NavbarItem>
            <Link href="/product">All Products</Link>
          </NavbarItem>

          {/* Search Bar */}
          <form className="relative" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 dark:text-gray-300"
            />
            <Button type="submit" className="absolute right-0 top-0 mt-2 mr-2">
              <FaSearch />
            </Button>
          </form>
        </NavbarContent>
        <NavbarContent>
          <Badge content={totalUniqueProducts} color="secondary">
            <FaShoppingCart size={24} />
            <CartModal />
          </Badge>
        </NavbarContent>
        {/* User Profile, Theme Toggle */}
        <NavbarContent justify="end">
          {/* Dark/Light Mode Toggle */}
          <ThemeSwitcher />

          {/* Conditionally render Login/Sign Up or Profile */}
          {token ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name="John Doe"
                  size="sm"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile">
                  <p className="font-semibold">Signed in as John</p>
                </DropdownItem>
                <DropdownItem key="settings">My Dashboard</DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  onClick={handleLogout}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <>
              <NavbarItem>
                <Button as="a" href="/login" variant="flat">
                  Login
                </Button>
              </NavbarItem>
              <NavbarItem>
                <Button as="a" href="/signup" variant="flat">
                  Sign Up
                </Button>
              </NavbarItem>
            </>
          )}
        </NavbarContent>
      </Navbar>
    </div>
  );
}
