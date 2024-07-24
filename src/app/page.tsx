import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function Home() {

  // Get the Backend API User object when you need access to the user's information
  const user = await currentUser();
  // Use `user` to render user details or create UI elements
  let fullname = "Guest";

  if (user) {
    const { firstName, lastName } = user;
    fullname = (firstName ? `${firstName} `: "") + (lastName ? lastName : "");
    if (!fullname) fullname = "User" 
  }

  return (
    
    <main className="flex min-h-screen flex-col justify-center items-center">
        <p className="after:content-['\01F44B'] ">Hey, {fullname}! </p>
        <h1 className="mx-auto max-w-2xl text-center text-5xl font-bold tracking-tight text-white sm:text-6xl">
          Meet your AI <br/> Business Buddy
        </h1>

        <h4 className="mx-auto mt-4 max-w-xl text-center text-grey text-xl leading-8 text-slate-400">
          A powerful tool that helps you navigate the ambiguous journey of starting and growing your business.
        </h4>

        <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
          <Link href="/sign-up" className="rounded-md bg-yellow px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Get started</Link>
          <a href="#" className="text-sm font-semibold leading-6 text-white">Learn more <span aria-hidden="true">→</span></a>
        </div>

    </main>
  );
}
