"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import Logo from "../assets/logo.svg";
import { links } from "@/utils/links";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="py-4 px-8 bg-muted h-full">
      {/* <Image src={Logo} alt="logo" className="mx-auto" /> */}
      <h1 className="text-4xl text-primary font-bold">Jobs Tracker</h1>
      <div className="flex flex-col mt-20 gap-y-4">
        {links.map((link) => {
          return (
            <Button
              asChild
              key={link.href}
              variant={pathname === link.href ? "default" : "link"}
            >
              <Link href={link.href} className="flex items-center gap-x-2">
                {link.icon} <span className="capitalize">{link.label}</span>
              </Link>
            </Button>
          );
        })}
      </div>
    </aside>
  );
}
