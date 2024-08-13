"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";

type ButtonContainerProps = {
  currentPage: number;
  totalPages: number;
};

export default function ButtonContainer({
  currentPage,
  totalPages,
}: ButtonContainerProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const pageButtons = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageChange = (page: number) => {
    const defaultParams = {
      search: searchParams.get("search") || "",
      jobStatus: searchParams.get("jobStatus") || "",
      page: String(page),
    };

    let params = new URLSearchParams(defaultParams);

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex gap-x-2">
      {pageButtons.map((page) => {
        return (
          <Button
            key={page}
            onClick={() => handlePageChange(page)}
            size="icon"
            variant={currentPage === page ? "default" : "outline"}
          >
            {page}
          </Button>
        );
      })}
    </div>
  );
}
