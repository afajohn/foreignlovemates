"use client";

import { Button } from "@/components/ui/button";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export default function Pagination({ totalPages,currentPage }:  PaginationProps ) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Function to update the URL
  const updatePage = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="pagination flex justify-center gap-2">
      {/* Previous button */}
      <Button
        onClick={() => updatePage(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-button"
      >
        Previous
      </Button>

      {/* Page numbers */}
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
        <Button
          key={page}
          onClick={() => updatePage(page)}
          className={`page-number ${page === currentPage ? "active" : ""}`}
          disabled={page === currentPage}
        >
          {page}
        </Button>
      ))}

      {/* Next button */}
      <Button
        onClick={() => updatePage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-button"
      >
        Next
      </Button>
    </div>
  );
}
