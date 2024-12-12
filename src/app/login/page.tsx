"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AxiosError } from "axios";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onlogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      
      console.log("login successful", response.data);
      toast.success("login successful!");
      router.push("/profile");
    } catch (error) {
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
      (user.email?.trim() || "") && (user.password?.trim() || "");
    setDisabled(!isFormValid);
  }, [user]);

  return (
    <div className="flex items-center justify-center bg-gray-100  w-full h-screen">
    <div className="flex flex-col items-center justify-center bg-white px-14 py-6 rounded-md shadow-lg ">
      <p className="text-3xl flex justify-center items-center  font-bold">
        {loading ? "Processing..." : "Login"}
      </p>
      <hr />
      <hr />
      <div className="mt-3 flex flex-col">
      <label htmlFor="email" className="text-[18px] text-left">
        Email
      </label>
      <input
        className="border-2 outline-none hover:border-black px-1"
        type="email"
        placeholder="one@gmail.com"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
        </div>

        <div className="mt-3 flex flex-col">
      <label htmlFor="password" className="text-[18px]">
        Password
      </label>
      <input
        className="border-2 hover:border-black px-1"
        type="password"
        placeholder="Password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
          </div>
      <button
        onClick={onlogin}
        className="bg-blue-400 px-3 py-2 rounded mt-5 cursor-pointer"
        disabled={disabled || loading}
      >
        {loading ? "Processing..." : disabled ? "Submit" : "login"}
      </button>
      <Link className="mt-2 text-blue-500 underline" href="/signup">Visit signup page</Link>
    </div>
    </div>
  );
}
