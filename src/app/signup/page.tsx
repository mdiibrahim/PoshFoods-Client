"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useSignUpMutation } from "@/redux/api/authApi";
const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });
  const [signUp, { isLoading }] = useSignUpMutation();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUp(formData).unwrap();
      toast.success("Sign-up successful! Please log in.");
      router.push("/login");
    } catch (error) {
      console.log(error);
      toast.error("Sign-up failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.keys(formData).map((key) => (
            <div key={key}>
              <label htmlFor={key} className="block text-gray-600">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              <input
                type={key === "password" ? "password" : "text"}
                id={key}
                name={key}
                value={formData[key as keyof typeof formData]}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded"
            disabled={isLoading}
          >
            {isLoading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
