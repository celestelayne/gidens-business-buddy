import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
// const navigation = [
//   {
//     name: "About",
//     tagline: "Your AI Business Buddy",
//     href: "https://www.gidens.com/",
//     current: false,
//   },
// ];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { userId } = auth();
  
  return (
    <div className="bg-gray-900 w-full fixed top-0 z-10">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
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
                className="hidden h-8 w-auto lg:block rounded-lg"
                src="/gidens-fullname-logo-02.png"
                alt="gidens"
              />
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {userId ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="rounded-md bg-gray-800 py-2 px-3 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="rounded-md bg-gray-800 py-2 px-3 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
