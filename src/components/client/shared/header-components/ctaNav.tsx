"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar";
import { debounce } from "lodash";
import Link from "next/link";
import RotatorCta from "./rotatorCta";
import MegaMenu from "./megaMenu";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { LogIn, Search, UserRoundPlus } from "lucide-react";
import SignUpModal from "../signUpModal";
import SearchLadiesModal from "./searchLadiesModal";
import LoginModal from "../loginModal";


interface RotatorProps {
  ladiesData: { random_value: number }[]; 
  logo: string; 
  headerNavs: HeaderNavigation[];
}

interface HeaderNavigation {
  name: string,
  link: string,
}


function CtaNav({ ladiesData, logo, headerNavs }: RotatorProps) {
  // Fetch Ladies
  const ladies= ladiesData;

  // Control Scrolly top (hide/show)
  const [, setShowTop] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    // Only run this logic client-side (after the component mounts)
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY < lastScrollY) {
          setShowTop(true);
        } else {
          setShowTop(false);
        }

        setLastScrollY(currentScrollY);
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [lastScrollY]);

  // Control Scrolly (show) when > 5% from the top screen (hide) when < 5% from the top screen
  const [isVisible, setIsVisible] = useState(false);

  const threshold = 0.5; // % from the top

  const handleScrollCta = () => {
    
      const scrollY = window.scrollY;
      const thresholdY = window.innerHeight * threshold;

      if (scrollY > thresholdY) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

  };

	const debouncedHandleScroll = debounce(handleScrollCta, 100);

  useEffect(() => {
    // Only run this logic client-side (after the component mounts)
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", debouncedHandleScroll);

      return () => {
        window.removeEventListener("scroll", debouncedHandleScroll);
      };
    }
  }, [debouncedHandleScroll]);

  return (
    <>
      <div className="hidden lg:flex text-sm">
        <div
          id="cta-nav"
          className={`transition-all duration-100 w-screen bg-white flex flex-row justify-evenly items-center ${
            isVisible ? "fixed top-0 left-0 z-30" : "hidden"
          }`}
        >
          {/* LEFT */}
          <div className="ml-5">
            <div className="flex flex-row items-center flex-shrink-0 gap-5">
              <Sidebar />
              <span>
                <Link href={"/"}>
                  <Image
                    src={logo || "/images/loveme-v2.png"}
                    alt="Love Me Logo"
                    width={200}
                    height={200}
                    priority
                  />
                </Link>
              </span>
            </div>
            <div className="pt-3">
              <ul className="flex flex-row text-nowrap gap-5 text-sm">
                <li>
                  <button type="button" className="hover:text-black/75">Home</button>
                </li>
                <li>
                 <Link  href={`/${headerNavs[0]?.link.replace(/^\/+/, "")}`}>
                 {headerNavs[0]?.name}
                 </Link>
                </li>
                <li>
                 <Link  href={`/${headerNavs[1]?.link.replace(/^\/+/, "")}`}>
                 {headerNavs[1]?.name}
                 </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* CENTER */}
          <div className="w-auto max-w-[30rem]">
            <RotatorCta ladiesData={ladies} />
          </div>

          {/* RIGHT */}
          <div className="flex flex-col items-center">
            <div className="flex flex-row">
              <Dialog>
                <DialogTrigger className="border flex flex-row items-center justify-center mx-3 px-2 rounded-xl bg-gray-100 hover:bg-gray-200 hover:border-gray-400">
                  <div className="flex flex-col">
                    <span>Search Women&apos;s ID /</span>
                    <span>Use Advanced Search</span>
                  </div>
                  <Search className="h-7 w-7 ml-2" />
                </DialogTrigger>

                <SearchLadiesModal />
              </Dialog>

              {/* Sign up modal Desktop Reusable Modal */}
              <Dialog>
                <DialogTrigger className="flex flex-row items-center justify-center bg-primary-500 hover:bg-secondary-500 text-white rounded-xl py-2 px-2">
                  <div className="flex flex-col">
                    <p>Sign up Today,</p>
                    <span className="font-bold ml-2">It&apos;s Totally Free</span>
                  </div>
                  <UserRoundPlus className="w-7 h-7 ml-2" />
                </DialogTrigger>

                <SignUpModal />
              </Dialog>
            </div>

            <div className="pt-3">
              <ul className="flex flex-row text-nowrap gap-5 text-sm">
              <li>
                 <Link  href={`/${headerNavs[2]?.link.replace(/^\/+/, "")}`}>
                 {headerNavs[2]?.name}
                 </Link>
                </li>
                <li>
                  <MegaMenu />
                </li>
                <li>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button type="button" className="inline-flex items-center space-x-2 hover:text-black/75">
                        <LogIn className="h-4 w-4" />
                        <span>Member&apos;s Login</span>
                      </button>
                    </DialogTrigger>
                    <LoginModal />
                  </Dialog>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CtaNav;
