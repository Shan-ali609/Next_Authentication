"use client"
import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {toast} from 'react-hot-toast'
export default function Profilepage() {
  const router = useRouter();
  const [data , setData] = useState("nothing");

  const userdetail = async ()=>{
  const res = await axios.post("/api/users/me");
  console.log(res.data);
  setData(res.data.data._id)
  }

  const logout = async ()=>{
    try {
      await axios.get("/api/users/logout")
      toast.success("logout succesfully")
      router.push("/login")
    } catch (error) {
       console.log("Error"+error);
       toast.error("Error"+error)
    }
  }

  return (
    <div className='flex flex-col items-center justify-center w-full h-screen'>
      <h1>profile page </h1>
      <hr />
      <h2>{data === "nothing" ? " nothingtoken" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
      <hr />
      <button
      onClick={userdetail}
      className='bg-green-500 p-2 rounded-md'
      >User detail</button>
      <hr />
      <button
      onClick={logout}
      className='bg-blue-500 p-2 rounded-md'
      >Logout</button>
    </div>
  )
}
