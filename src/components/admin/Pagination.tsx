"use client"
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, goToPage }) => {
  return (
    <div className="flex justify-center mt-5">
      <button
        className="px-4 py-2 mx-1 border rounded disabled:opacity-50"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          className={`px-4 py-2 mx-1 border rounded ${currentPage === index + 1 ? "bg-gray-300" : ""}`}
          onClick={() => goToPage(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button
        className="px-4 py-2 mx-1 border rounded disabled:opacity-50"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
