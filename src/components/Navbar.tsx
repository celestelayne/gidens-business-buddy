import { 
  UserButton, 
  SignInButton, 
  SignedOut, 
  SignedIn
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="w-full fixed top-0 z-10">
      <div className="mx-auto px-2 sm:px-6 lg:px-8">
        <div className="bg-regal-blue relative flex h-32 items-center justify-between">
          <div className="flex flex-1 items-center justify-start">
            <Link href="/">
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
            </Link>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <SignedIn>
                <UserButton 
                  showName
                  userProfileMode='navigation'
                  userProfileUrl='/user-profile'/>
              </SignedIn>
              <SignedOut>
                <SignInButton />
              </SignedOut>
          </div>
        </div>
      </div>
    </div>
  );
}
