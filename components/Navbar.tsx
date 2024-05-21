import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./Toggle";
function Navbar() {
  return (
    <div className="flex flex-wrap  justify-between items-center mx-auto max-w-screen-xl py-4 lg:px-52 px-4">
      <Link
        href="/"
        className="flex items-center space-x-3 rtl:space-x-reverse"
      >
        <Image
          src="/linkkeeper.jpeg"
          className="lg:h-8 lg:w-8 w-6 h-6 rounded-md"
          alt="Link Keeper"
          width={500}
          height={500}
        />
        <span className="self-center lg:text-xl font-bold text-sm  whitespace-nowrap dark:text-white">
          Link Keeper
        </span>
      </Link>
      <div className="flex items-center gap-2 rtl:space-x-reverse">
        <Link
          href="https://coding-school-typescript.vercel.app/"
          className="text-sm  text-gray-500 dark:text-white font-semibold hover:underline"
        >
          @DesisHub
        </Link>
        <ModeToggle />
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}

export default Navbar;
