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
  Spinner,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { isTokenExpired, logout } from "@/redux/features/authSlice";
import { FaSearch, FaBars } from "react-icons/fa";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import CartModal from "./CartModal";
import Image from "next/image";
import logo from "@/assests/logo.webp";
import ThemeSwitcher from "./ThemeSwitcher"; // Import ThemeSwitcher
import { CATEGORIES } from "@/constant/category";
import { useGetUserProfileQuery } from "@/redux/api/authApi";

export default function MergedNavbar() {
  const router = useRouter();
  const cartItems = useSelector((state: RootState) => state.cart.products);
  const dispatch = useAppDispatch();
  const totalUniqueProducts = cartItems.length;
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const token = useAppSelector((state) => state.auth.token);
  const { data, isLoading } = useGetUserProfileQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    // Check if token exists and is not expired
    if (token && isTokenExpired(token)) {
      dispatch(logout()); // Log out if token is expired
      router.push("/login"); // Redirect to login
    }
    const fetchCategories = async () => {
      setCategories(CATEGORIES);
    };
    fetchCategories();
  }, [token, dispatch, router]);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  const handleCategoryClick = (category: string) => {
    router.push(`/product?category=${encodeURIComponent(category)}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/product?searchTerm=${encodeURIComponent(searchQuery)}`);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spinner label="Loading user details..." />
      </div>
    );
  }

  const userData = data?.data;
  const userName = userData?.name || userData?.email.split("@")[0] || "Guest";

  return (
    <Navbar
      isBordered
      className="bg-backgroundColor dark:bg-darkBackground py-2 mx-0"
    >
      <div className="flex   w-screen">
        {/* Left side: Logo */}
        <NavbarBrand className="flex items-start   space-x-2">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src={logo}
              alt="PoshFoods Logo"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <span className="lg:text-xl text-lg font-bold text-textColor dark:text-white">
              PoshFoods
            </span>
          </Link>
        </NavbarBrand>

        {/* Mobile Menu Toggle Button */}
        <div className="lg:hidden">
          <Button
            className="p-0 bg-transparent border-none text-textColor dark:text-white"
            onClick={toggleMobileMenu}
          >
            <FaBars size={24} />
          </Button>
        </div>

        {/* Center: Categories, All Products, Search Bar (Visible for large screens) */}
        <NavbarContent className="hidden lg:flex items-center justify-center  space-x-2">
          <Dropdown>
            <DropdownTrigger>
              <Button disableRipple className="p-0 bg-transparent" radius="sm">
                Categories
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Categories">
              {categories.length > 0 ? (
                categories.map((category, index) => (
                  <DropdownItem
                    key={index}
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </DropdownItem>
                ))
              ) : (
                <DropdownItem>Loading...</DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>

          <NavbarItem>
            <Link href="/product">All Products</Link>
          </NavbarItem>

          <form className="relative" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-lg border border-gray-300 px-4 py-2 text-textColor dark:text-gray-300"
            />
            <Button type="submit" className="absolute right-2 top-0 -mr-2">
              <FaSearch />
            </Button>
          </form>
        </NavbarContent>

        {/* Right side: Cart, Theme Switcher, Profile */}
        <div className="hidden lg:flex items-end justify-end space-x-2 ">
          <Badge content={totalUniqueProducts} color="secondary">
            <CartModal />
          </Badge>
          <ThemeSwitcher />

          {!isLoading && (
            <>
              {token && userData ? (
                <Dropdown placement="bottom-end">
                  <DropdownTrigger>
                    <Avatar
                      isBordered
                      as="button"
                      color="success"
                      name="John Doe"
                      size="sm"
                      src="https://i.pravatar.cc/150?u=a04258114e29026708c"
                    />
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Profile Actions">
                    <DropdownItem key="profile">
                      <p className="font-semibold">Signed in as {userName}</p>
                    </DropdownItem>
                    <DropdownItem key="settings">
                      <Link href="/dashboard">My Dashboard</Link>
                    </DropdownItem>
                    <DropdownItem
                      key="logout"
                      color="danger"
                      onClick={handleLogout}
                      className="bg-primary text-white hover:bg-secondary"
                    >
                      Log Out
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              ) : (
                <>
                  <NavbarItem>
                    <Button
                      as="a"
                      href="/login"
                      className="bg-primary text-white hover:bg-secondary"
                      variant="flat"
                      size="sm"
                    >
                      Login
                    </Button>
                  </NavbarItem>
                  <NavbarItem>
                    <Button
                      as="a"
                      href="/signup"
                      className="bg-primary text-white hover:bg-secondary"
                      variant="flat"
                      size="sm"
                    >
                      Sign Up
                    </Button>
                  </NavbarItem>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* Mobile and Tablet Menu */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden absolute top-full left-0 w-full bg-backgroundColor
    dark:bg-darkBackground z-50 flex flex-col items-start p-4 space-y-4"
        >
          {/* Categories */}
          <Dropdown>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 text-lg bg-transparent"
                radius="sm"
              >
                Categories
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Categories">
              {categories.length > 0 ? (
                categories.map((category, index) => (
                  <DropdownItem
                    key={index}
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </DropdownItem>
                ))
              ) : (
                <DropdownItem>Loading...</DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>

          <NavbarItem>
            <Link href="/product">All Products</Link>
          </NavbarItem>

          <form className="relative w-full" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-textColor dark:text-gray-300"
            />
            <Button type="submit" className="absolute right-2 top-0 -mr-2">
              <FaSearch />
            </Button>
          </form>

          {/* Cart and Theme Switcher */}
          <div className="flex items-center space-x-4">
            <Badge content={totalUniqueProducts} color="secondary">
              <CartModal />
            </Badge>
            <ThemeSwitcher />
          </div>

          {/* Login and Sign Up buttons for mobile view */}
          {!isLoading && (
            <>
              {token && userData ? (
                <div className="mt-4 ">
                  <p className="font-semibold">Signed in as {userName}</p>
                  <div className="flex items-center justify-center mt-4">
                    <Link href="/dashboard">
                      <Button className="bg-primary text-white hover:bg-secondary w-full">
                        My Dashboard
                      </Button>
                    </Link>
                    <Button
                      onClick={handleLogout}
                      className="ml-4 w-full bg-primary text-white hover:bg-secondary"
                    >
                      Log Out
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col space-y-4 w-full mt-4">
                  <Button
                    as="a"
                    href="/login"
                    className="bg-primary text-white hover:bg-secondary w-full"
                    variant="flat"
                    size="sm"
                  >
                    Login
                  </Button>
                  <Button
                    as="a"
                    href="/signup"
                    className="bg-primary text-white hover:bg-secondary w-full"
                    variant="flat"
                    size="sm"
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </Navbar>
  );
}
