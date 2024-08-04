import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
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
          <SignedIn>
            <Link
              href="/chat"
              className="px-4 py-2 rounded-full bg-[#131316] text-white text-sm font-semibold"
            >
              Chat
            </Link>
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <button className="px-4 py-2 rounded-full bg-[#131316] text-white text-sm font-semibold">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
          <Link
            href="/"
            className="px-4 py-2 rounded-full text-[#131316] text-sm font-semibold bg-[#F7F7F8]"
          >
            Learn more
          </Link>
        </div>

    </main>
  );
}
