import React from "react";
import SignUpModal from "@/components/client/shared/signUpModal";
import { LogIn, Search, UserRoundPlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Sidebar from "../sidebar";
import MegaMenu from "./megaMenu";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import SearchLadiesModal from "./searchLadiesModal";
import LoginModal from "../loginModal";
import { getData } from "@/_lib/fetch-data";

interface HeaderNavigation {
        name: string,
        link: string,
}

async function DesktopNav() {
  const config = await getData().catch(() => null); 
  const logo: string = Array.isArray(config) && config.length > 0 ? config[0].logo || "" : "";
  const headerNavs: HeaderNavigation[] = Array.isArray(config) && config.length > 0 ? config[0].headerNavs || [] : [];
  
  return (
    <>
      <div
        id="navDesktop"
        className="xl:container hidden lg:flex flex-row flex-nowrap text-nowrap justify-between px-3 mx-auto pt-3 pb-3 border-t-1 border-gray-100"
      >
        <div className="flex flex-row items-center flex-shrink-0 gap-5">
          <Sidebar />
          <span>
            <Link href={"/"}>
              <Image
                src={logo || "/images/loveme-v2.png"}
                alt="Love Me Logo"
                width={256}
                height={69}
                priority
              />
            </Link>
          </span>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex flex-row text-sm">
            <div className="mx-5">
              <Dialog>
                <DialogTrigger className="border rounded-full py-2 px-5 bg-gray-100 hover:bg-gray-200 hover:border-gray-200 inline-flex items-center space-x-2">
                  <span>Search Women&apos;s ID or Use Advanced Search</span>
                  <Search className="h-5 w-5" />
                </DialogTrigger>

                <SearchLadiesModal />
              </Dialog>
            </div>
            {/* Sign up modal Desktop Reusable Modal */}
            <Dialog>
              <DialogTrigger className="primary-btn">
                Sign up Today,
                <span className="font-bold ml-2">It&apos;s Totally Free</span>
                <UserRoundPlus className="w-4 h-4" />
              </DialogTrigger>

              <SignUpModal />
            </Dialog>
          </div>
          <div className="mt-5">
            <ul className="flex flex-row gap-4 text-sm text-gray-800 font-semibold">
              <li>
                
                <button type="button" className="hover:text-black/75">Home</button>
              </li>

              <li>
                <MegaMenu />
              </li>
            {headerNavs?.map((nav) => (
              <li key={nav.name}>
                <Link   href={`/${nav?.link?.replace(/^\/+/, "")}`}>
                  {nav?.name}
                </Link>
              </li>
            ))}
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
    </>
  );
}

export default DesktopNav;
