"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useLoginMutation } from "@/redux/api/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { setCredentials } from "@/redux/features/authSlice";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(formData).unwrap();
      dispatch(setCredentials({ token: response.token }));
      toast.success("Login successful!");
      router.push("/dashboard");
    } catch (error) {
      toast.error("Login failed. Please try again.");
    }
  };

  // Function to auto-fill Admin credentials
  const autoFillAdminCredentials = () => {
    setFormData({
      email: "admin@poshfoods.com",
      password: "Ad1234",
    });
  };

  // Function to auto-fill User credentials
  const autoFillUserCredentials = () => {
    setFormData({
      email: "ibrahim@gmail.com",
      password: "Ib1234",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className={`w-full py-3 rounded-lg text-white ${
              isLoading ? "bg-blue-300" : "bg-primary hover:bg-secondary"
            } transition-all`}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Demo Credentials Section */}
        <div className="mt-6 text-center">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            Demo Credentials
          </h3>

          {/* Admin Credentials */}
          <div className="space-y-2">
            <p className="font-medium">Admin:</p>
            <p>Email: admin@poshfoods.com</p>
            <p>Password: Ad1234</p>
            <button
              onClick={autoFillAdminCredentials}
              className="bg-primary hover:bg-secondary text-white px-4 py-2 rounded-lg"
            >
              Auto-fill Admin Credentials
            </button>
          </div>

          {/* User Credentials */}
          <div className="mt-4 space-y-2">
            <p className="font-medium">User:</p>
            <p>Email: ibrahim@gmail.com</p>
            <p>Password: Ib1234</p>
            <button
              onClick={autoFillUserCredentials}
              className="bg-primary hover:bg-secondary text-white px-4 py-2 rounded-lg"
            >
              Auto-fill User Credentials
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
