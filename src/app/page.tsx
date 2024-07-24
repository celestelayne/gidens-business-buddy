import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
export default async function Home() {

  // Get the Backend API User object when you need access to the user's information
  const user = await currentUser();
  // Use `user` to render user details or create UI elements
  let fullname = "Guest";

  if (user) {
    const { firstName, lastName } = user;
    fullname = (firstName ? `${firstName} ` : "") + (lastName ? lastName : "");
    if (!fullname) fullname = "User"
  }
  // Change the Background Gradient in the Image tag
  return (
    <main className="flex min-h-screen flex-col">
      <div className="pt-20 ml-auto mr-auto z-10 mt-10" >
        <h1 className="font-['Mallanna'] text-white text-5xl font-medium text-center mt-10" >
          Hey There! 👋
        </h1>

        <h1 className="font-['Mallanna'] text-white text-7xl pt-3 font-medium">
          Meet Your AI Business buddy.

        </h1>

        <p className="font-['Anek Bangla'] text-white text-center mt-6">
          A powerful tool that helps you navigate the ambiguous
          journey of starting and growing your buisness
        </p>
      </div>

      <div className="ml-auto mr-auto mt-10">
        <Link
          href="/sign-in"
          className="rounded-2xl bg-orange-400 py-3 px-3 text-white pd-10">
          Get Started
        </Link>
      </div>
      <Image
        width={900}
        height={800}
        sizes="200vw"
        src="/assets/images/Circle.png"
        alt="/assets/images/Circle.png"
        className="z-0 ml-auto" />
    </main>
  );
}
