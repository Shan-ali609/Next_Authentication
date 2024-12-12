"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onsignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user); // Fix route typo
      console.log("Signup successful", response.data);
      toast.success("Signup successful!");
      router.push("/login");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data?.error || error.message);
        toast.error(error.response?.data?.error || "Something went wrong!");
      } else {
        console.log("Unknown error:", error);
        toast.error("Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const isFormValid =
      user.email.trim() && user.username.trim() && user.password.trim();
    setDisabled(!isFormValid);
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center  bg-gray-100  w-full h-screen">
    <div className="flex flex-col items-center justify-center bg-white px-14 py-5 rounded-md shadow-lg">
      <p className="text-3xl flex justify-center items-center font-bold">
        {loading ? "Processing..." : "Signup"}
      </p>
      <hr />
      <div className="flex flex-col mb-3">
      <label htmlFor="username" className="text-[18px]">
        Username
      </label>
      <input
        className="border-2 hover:border-black px-2"
        type="text"
        placeholder="Username.."
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
         </div>

         <div className="flex flex-col mb-3">
      <label htmlFor="email" className="text-[18px]">
        Email
      </label>
      <input
        className="border-2 hover:border-black px-2"
        type="email"
        placeholder="one@gmail.com"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
        </div>

      <div className="flex flex-col mb-2">

      <label htmlFor="password" className="text-[18px]">
        Password
      </label>
      <input
        className="border-2 hover:border-black px-2"
        type="password"
        placeholder="Password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
        </div>
      <button
        onClick={onsignup}
        className="bg-blue-400 px-3 py-2 rounded-md mt-5 cursor-pointer"
        disabled={disabled || loading}
      >
        {loading ? "Processing..." : disabled ? "Submit" : "Signup"}
      </button>
      <Link className="text-blue-500 underline mt-1" href="/login">Visit login page</Link>
    </div>
    </div>
  );
}
