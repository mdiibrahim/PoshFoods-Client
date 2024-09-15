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
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/features/authSlice";
import { FaSearch, FaBars } from "react-icons/fa";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import CartModal from "./CartModal";
import Image from "next/image";
import logo from "@/assests/logo.webp";
import ThemeSwitcher from "./ThemeSwitcher"; // Import ThemeSwitcher
import { CATEGORIES } from "@/constant/category";

export default function MergedNavbar() {
  const router = useRouter();
  const cartItems = useSelector((state: RootState) => state.cart.products);
  const dispatch = useAppDispatch();
  const totalUniqueProducts = cartItems.length;
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const token = useAppSelector((state) => state.auth.token);

  // Fetch categories (example implementation)
  useEffect(() => {
    const fetchCategories = async () => {
      setCategories(CATEGORIES);
    };
    fetchCategories();
  }, []);

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

  return (
    <Navbar className="bg-backgroundColor dark:bg-gray-800">
      <div className="flex items-center justify-between w-full px-4 md:px-6">
        {/* Logo */}
        <NavbarBrand>
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src={logo}
              alt="PoshFoods Logo"
              width={50}
              height={50}
              className="h-10 w-auto rounded-lg"
            />
            <span className="text-xl font-bold text-textColor dark:text-white">
              PoshFoods
            </span>
          </Link>
        </NavbarBrand>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden">
          <Button
            className="p-0 bg-transparent border-none text-textColor dark:text-white"
            onClick={toggleMobileMenu}
          >
            <FaBars size={24} />
          </Button>
        </div>

        {/* Cart and Profile Section */}
        <NavbarContent className="flex items-center space-x-4">
          <Badge content={totalUniqueProducts} color="secondary">
            <CartModal />
          </Badge>
          <ThemeSwitcher /> {/* ThemeSwitcher component */}
          {token ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  color="secondary"
                  name="John Doe"
                  size="sm"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions">
                <DropdownItem key="profile">
                  <p className="font-semibold">Signed in as John</p>
                </DropdownItem>
                <DropdownItem key="settings">
                  <Link href="/dashboard">My Dashboard</Link>
                </DropdownItem>
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
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="flex flex-col space-y-4 p-4 md:hidden bg-backgroundColor dark:bg-gray-900">
          {/* Categories */}
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
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-textColor dark:text-gray-300"
            />
            <Button type="submit" className="absolute right-0 top-0 mt-2 mr-2">
              <FaSearch />
            </Button>
          </form>
        </div>
      )}

      {/* Desktop Menu */}
      <NavbarContent
        className="hidden md:flex items-center justify-center gap-4"
        justify="center"
      >
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button disableRipple className="p-0 bg-transparent" radius="sm">
                Categories
              </Button>
            </DropdownTrigger>
          </NavbarItem>
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
          <Button type="submit" className="absolute right-0 top-0 mt-2 mr-2">
            <FaSearch />
          </Button>
        </form>
      </NavbarContent>
    </Navbar>
  );
}
