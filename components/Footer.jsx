"use client";
import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <div className="flex justify-center gap-3 mt-4">
      <div className="cursor-pointer">
        <a
          href="https://github.com/veDnimatvi"
          target="_blank"
          rel="noopener noreferrer">
          <Image
            src={require("../public/img/github-icon.png")}
            alt="icon github"
          />
        </a>
      </div>
      <div className="cursor-pointer">
        <a
          href="https://www.linkedin.com/in/vitamindev/"
          target="_blank"
          rel="noopener noreferrer">
          <Image
            src={require("../public/img/linkedin-30.png")}
            alt="icon linkedin"
          />
        </a>
      </div>
      <div className="cursor-pointer">
        <a href="mailto:codertom100@gmail.com">
          <Image
            src={require("../public/img/icons-gmail.png")}
            alt="icon linkedin"
          />
        </a>
      </div>
      <div className="cursor-pointer">
        <a href="https://www.youtube.com/@VitaminDev99" target="_blank">
          <Image
            src={require("../public/img/icons-youtube.png")}
            alt="icon linkedin"
          />
        </a>
      </div>
      <a
        href="https://coff.ee/vitamindev"
        target="_blank"
        className="cursor-pointer">
        <Image
          src={require("../public/img/icons-coffee.png")}
          alt="icon linkedin"
        />
      </a>
    </div>
  );
}
