import Image from "next/image";
import Link from "next/link";
import React from "react";
import { PiDotsNineBold } from "react-icons/pi";

const Navbar = () => {
  return (
    <nav className="w-full z-10 flex items-center justify-end fixed top-0 p-4">
      <div className="flex items-center gap-4">
        <Link href={"/"} className="font-medium">Home</Link>
        <Link href={"/about"} className="font-medium">About</Link>
        <PiDotsNineBold className="text-2xl cursor-pointer font-medium" />
        <div className="rounded-full  flex items-center justify-center cursor-pointer">
          <Image
            src={"/navbar/person.jpeg"}
            height={32}
            width={32}
            className="object-cover rounded-full"
            alt="..."
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
