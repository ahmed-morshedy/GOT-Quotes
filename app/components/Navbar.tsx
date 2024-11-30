"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";

import { IoMdClose } from "react-icons/io";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false); // To check if we are on the client side

  useEffect(() => {
    setIsClient(true); // Set to true once the component mounts on the client
  }, []);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  if (!isClient) {
    return null; // Don't render anything during server-side rendering
  }

  const links = [
    { text: "Home", href: "/" },
    { text: "Houses", href: "/houses" },
    { text: "Characters", href: "/characters" },
    { text: "Random Quote", href: "/random" },
  ];

  return (
    <nav className="bg-gray-900 text-white py-4 px-5">
      <div className="container mx-auto flex justify-between items-center ">
        <Link href="/" className="text-xl font-bold">
          <img
            src="/game-of-thrones.png"
            alt="game-of-thrones Logo"
            className="w-60 h-16 rounded-lg"
          />
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex space-x-6">
          {links.map((link) => (
            <Link
              key={link.text}
              href={link.href}
              className=" p-3 bg-transparent hover:bg-slate-100 rounded-lg transition-colors hover:text-gray-950"
            >
              {link.text}
            </Link>
          ))}
        </div>

        <button
          onClick={toggleMenu}
          className="md:hidden text-2xl focus:outline-none "
        >
          <span
            className={` inset-0 flex items-center justify-center transform transition-transform duration-300  ${
              isMobileMenuOpen ? "rotate-180 scale-110" : "rotate-0 scale-100"
            }`}
          >
            {isMobileMenuOpen ? <IoMdClose /> : <RxHamburgerMenu />}
          </span>
        </button>
      </div>

      {/* Mobile Nav Links */}
      <div
        className={`md:hidden bg-gray-800 text-white overflow-hidden transition-all duration-300 ease-in-out rounded-md mt-2 ${
          isMobileMenuOpen ? "max-h-screen py-4" : "max-h-0"
        }`}
      >
        <div className="flex flex-col space-y-4 px-5 ">
          {links.map((link) => (
            <Link
              href={link.href}
              key={link.text}
              className=" p-3 bg-transparent hover:bg-slate-100 rounded-lg transition-colors hover:text-gray-950"
            >
              {link.text}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
