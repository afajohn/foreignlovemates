"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import siteMetadata from "./siteMetaData";
import { formatCategory } from "@/_lib/blogUtils";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { sidebarNavlinks } from "./LeftSidebar";

const Breadcrumbs = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  const isBlogPage = pathname.startsWith("/blog");

  const breadcrumbs = useMemo(
    () => [
      { name: "Home", url: "/" },
      ...pathSegments.map((segment, index) => ({
        name: formatCategory(segment),
        url: `/${pathSegments.slice(0, index + 1).join("/")}`,
      })),
    ],
    [pathSegments]
  );

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((breadcrumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: breadcrumb.name,
        item: `${siteMetadata.siteUrl}${breadcrumb.url}`,
      })),
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [breadcrumbs]);

  return (
    <>
      <link rel="canonical" href={siteMetadata.siteUrl + pathname} />
      {isBlogPage && (
      <div className="flex items-center space-x-2 bg-gray-100 p-6 sm:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <title>Home icon</title>
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 101.414 1.414L4 10.414V17a1 1 0 001 1h3a1 1 0 001-1v-4h2v4a1 1 0 001 1h3a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
        {breadcrumbs.map((breadcrumb, index) => (
          <div key={breadcrumb.url} className="flex items-center space-x-2">
            {index > 0 && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-gray-400"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <title>Right arrow icon</title>
                <path d="M9.293 4.293a1 1 0 011.414 0L15 8.586a1 1 0 010 1.414l-4.293 4.293a1 1 0 01-1.414-1.414L12.586 10 9.293 6.707a1 1 0 010-1.414z" />
              </svg>
            )}
            {index === breadcrumbs.length - 1 ? (        
              <div className="relative">
                <Button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="text-gray-700 font-semibold bg-white border-2 border-solid hover:underline"
                >
                  {breadcrumb.name}
                  <ChevronDown />
                </Button>
                {isDropdownOpen && (
                  <div className="absolute bg-white border rounded-md shadow-md mt-2 w-48">
                    {sidebarNavlinks.map((category) => (
                      <Link
                        key={category.href}
                        href={category.href}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={()=>setIsDropdownOpen(false)}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

            ) : (
              <Link
                href={breadcrumb.url}
                className="text-gray-500 hover:text-gray-700 font-medium"
              >
                {formatCategory(breadcrumb.name)}
              </Link>
            )}
          </div>
        ))}
      </div>
      )}
    </>
  );
};

export default Breadcrumbs;
