import React from "react";
import LinksDropdown from "./LinksDropdown";
import ThemeToggle from "./ThemeToggle";
import { UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className="bg-muted py-4 px-4 flex items-center justify-between sm:px-16 lg:px-24">
      <LinksDropdown />
      <div className="flex items-center gap-x-4">
        <ThemeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
}
