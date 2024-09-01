"use client"
import { usePathname } from 'next/navigation';
import React from 'react';

// Reusable Link component
const FooterLink = ({ href, children }:{href:string; children:string;}) => (
  <a href={href} className="hover:underline text-[#5F6368]">
    {children}
  </a>
);

const Footer = () => {

  const pathName = usePathname();
  const isHome = pathName === '/';
  return (
    <footer className={`bg-gray-100 border-t border-gray-200 py-4 ${isHome && "fixed bottom-0"} w-full`}>
      <div className="text-sm text-gray-600 mb-2 md:mb-0 border-b border-gray-300 py-2 px-8">
        India
      </div>
      <div className=" mx-auto flex  justify-between md:items-center px-8 py-2">
        <div className="flex md:flex-row flex-col space-x-4 space-y-4 md:space-y-0  text-sm text-gray-600 w-full">
          <FooterLink href="#">About</FooterLink>
          <FooterLink href="#">Advertising</FooterLink>
          <FooterLink href="#">Business</FooterLink>
          <FooterLink href="#">How Search works</FooterLink>
        </div>
        <div className="flex md:flex-row flex-col space-x-4 space-y-4 md:space-y-0 text-sm text-gray-600 w-full md:w-fit ">
          <FooterLink href="#">Privacy</FooterLink>
          <FooterLink href="#">Terms</FooterLink>
          <FooterLink href="#">Settings</FooterLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
