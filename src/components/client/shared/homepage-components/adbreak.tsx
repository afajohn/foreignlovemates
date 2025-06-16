"use client"
import Link from "next/link";
import { useState } from "react";

const AdBreak = () => {
  const urls = ["/platinum-membership0"]
  const [currentUrl] = useState(urls);

  return (
    <div className="bg-[#333333] py-16 text-center">
      <h3 className="text-white text-[20px] md:text-[25px] font-light mb-6 px-4">
        There is one European, Asian or Latin woman here who can change your
        life forever. <br className="hidden md:block" />
        Begin your Foreign Adventure for Real Love TODAY!
      </h3>
      {currentUrl ? (
        <Link href={currentUrl[0]} className="bg-secondary-600 hover:bg-secondary-700 text-white px-6 py-3 rounded-full text-sm md:text-lg">
          Upgrade to Platinum Membership
        </Link>
      ) : (
        <p>Loading NewsLetter...</p>
      )}
    </div>
  );
};

export default AdBreak;