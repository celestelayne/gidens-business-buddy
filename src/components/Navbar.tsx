import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const { userId } = auth();

  return (
    <div className="border-b-2 border-opacity-50 border-blue-300 w-full fixed top-2 z-10">
      <div className="mx-3 max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Image
                width={0}
                height={0}
                sizes="100vw"
                className="block h-8 w-auto lg:hidden rounded-lg"
                src="/gidens-fullname-logo-02.png"
                alt="gidens"
              />
              <Image
                width={0}
                height={0}
                sizes="100vw"
                className="hidden ml-3.5 h-8 w-auto lg:block rounded-lg"
                src="/gidens-fullname-logo-02.png"
                alt="gidens"
              />
            </div>
          </div>
          <div className="absolute inset-y-0 flex justify-between translate-x-12 sm:static sm:inset-auto sm:ml-6 sm:pr-0 ml-auto">
            {userId ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className=" rounded bg-orange-400 shadow-md py-2 px-4 text-sm font-medium text-white hover:bg-orange-300 translate-x-9"
                >
                  Log In
                </Link>

                <Link
                  href="/sign-in"
                  className="rounded bg-white shadow-md py-2 px-3 text-sm font-medium text-black hover:bg-gray-300 translate-x-12"
                >
                  Sign up
                </Link>
              </>
              // When making the website smaller (minimizing the screen by dragging the edges) the buttons do not adjust to fit.
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
