"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../public/img/mylogo.svg";
import { BookOpen } from "lucide-react";

const Header = () => {
  useEffect(() => {
    document
      .getElementsByTagName("HTML")[0]
      .setAttribute("data-theme", sessionStorage.getItem("theme"));
  }, []);

  return (
    <header>
      <div className="fixed top-0 right-0 left-0 bg-white shadow-lg">
        <div className="container flex justify-center mx-auto my-7">
          <div className="float-left pl-8 mt-1 text-2xl font-bold cursor-pointer md:mt-0">
            <Link href="/">
              <div className="flex items-center">
                <Image src={logo} alt="logo" width={40} height={40} />
                <span className="pl-2">Vitamindev</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
