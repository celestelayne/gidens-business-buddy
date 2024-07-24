import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { Input } from "postcss";
// import { useState } from "react";
import { useFormState } from "react-hook-form";

export default function Page() {

  const submitHandler = async (formData: FormData) => {
    'use server'
    const firstName = formData.get('firstName')
    const lastName = formData.get('lastName')
    const email = formData.get('email')
    const phoneNum = formData.get('phoneNum')
    const password = formData.get('password')
    //insert code to send data up
    console.log(`${firstName}, ${lastName}, ${email}, ${phoneNum}, ${password}`) //debug
  }

  return (
    <div className="flex flex-row relative h-full flex items-center">
      <div className="flex flex-col relative w-1/2 min-h-screen text-center m-auto">
        <h1 className="font-['Mallanna'] text-6xl py-2"> Your AI Business Buddy </h1>
        <p className=" font-['Anek_Bangla'] text-base"> /'gīdens/ is on a mission to drastically reduce small business failure rate by helping owners make the right decisions at the right time, every time. </p>
      </div>
      <div className="flex flex-col relative w-1/2 min-h-screen text-left justify-items-start ml-2">
        <h1 className="font-['Mallanna'] text-4xl py-2"> Lets Get Started </h1>
        <p className=" font-['Anek_Bangla'] text-base text-[#A5AFDA]">
          Already have an account?
          <Link href="/sign-in" className="text-white"> Sign in </Link>
        </p>
        <form action={submitHandler}>
          <div className="float-left pr-5">
            <label htmlFor="firstName" className="block">First name</label>
            <input name="firstName" type="text" className="block"></input>
          </div>
          <div className="">
            <label htmlFor="lastName" className="block">Last name</label>
            <input name="lastName" type="text" className="block"></input>
          </div>
          <div className="">
            <label htmlFor="email" className="block">Email*</label>
            <input name="email" type="text" className="block"></input>
          </div>
          <div className="">
            <label htmlFor="phoneNum" className="block">Phone number</label>
            <input name="phoneNum" type="number" className="block"></input>
          </div>
          <div className="">
            <label htmlFor="password" className="block">Password*</label>
            <input name="password" type="text" className="block"></input>
          </div>

          <input type="submit" className="rounded-2xl bg-orange-400 py-3 px-3 text-white pd-10"></input>
        </form>
      </div>
      {/* <SignUp 
        appearance={{
          elements: { formButtonPrimary: "bg-blue-700" },
        }}
      /> */}
    </div>
  );
}
