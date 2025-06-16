"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, MapPin, Video, Wrench, X, Dot } from "lucide-react";
import React, { useState } from "react";

function MegaMenu() {
  // Function to handle close used in MEGA-MENU
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          
          <button type="button" className="inline-flex items-center space-x-2 hover:text-black/75">
            Search Tools <ChevronDown className="w-4 h-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="rounded-2xl px-20 w-screen">
          <DropdownMenuLabel className="my-3 text-4xl text-primary-500 mx-[8rem]">
            Our Services
          </DropdownMenuLabel>

          <DropdownMenuSeparator />
          <div className="flex flex-row justify-around py-5">
            <div>
              <h3 className="text-primary-500 font-bold text-lg inline-flex items-center space-x-2">
                <MapPin className="h-4 w-4 mr-2" />
                Book a Tour, Travel and Meet Her
              </h3>
              <ul className="my-3 mx-8 flex flex-col gap-3 ">
                <li>
                  
                  <button type="button" className="inline-flex no-underline hover:underline">
                    <Dot />
                    Group Tours
                  </button>
                </li>
                <li>
                  
                  <button type="button" className="inline-flex no-underline hover:underline">
                    <Dot />
                    Club Tours
                  </button>
                </li>
                <li>
                  
                  <button type="button" className="inline-flex no-underline hover:underline">
                    <Dot />
                    One-on-one Introductions
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-primary-500 font-bold text-lg inline-flex items-center space-x-2">
                <Wrench className="h-4 w-4 mr-2" />
                Service Options We Offer
              </h3>
              <ul className="my-3 mx-8 flex flex-col gap-3 hover:underline">
                <li>
                  
                  <button type="button" className="inline-flex no-underline hover:underline">
                    <Dot />
                    Virtual Phone / Video Translation
                  </button>
                </li>
                <li>
                  
                  <button type="button" className="inline-flex no-underline hover:underline">
                    <Dot />
                    Executive Plan Package
                  </button>
                </li>
                <li>
                  
                  <button type="button" className="inline-flex no-underline hover:underline">
                    <Dot />
                    IMBRA Request
                  </button>
                </li>
                <li>
                  
                  <button type="button" className="inline-flex no-underline hover:underline">
                    <Dot />
                    Fiancee Visa Kit
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-primary-500 font-bold text-lg inline-flex items-center space-x-2">
                <Video className="h-4 w-4 mr-2" />
                Media & Client Testimonials
              </h3>
              <ul className="my-3 mx-8 flex flex-col gap-3 hover:underline">
                <li>
                  
                  <button type="button" className="inline-flex no-underline hover:underline">
                    <Dot />
                    Tour Videos
                  </button>
                </li>
                <li>
                  
                  <button type="button" className="inline-flex no-underline hover:underline">
                    <Dot />
                    Testimonial Videos
                  </button>
                </li>
                <li>
                  
                  <button type="button" className="inline-flex no-underline hover:underline">
                    <Dot />
                    Informational Videos
                  </button>
                </li>
                <li>
                  
                  <button type="button" className="inline-flex no-underline hover:underline">
                    <Dot />
                    Client Reviews
                  </button>
                </li>
                <li>
                  
                  <button type="button" className="inline-flex no-underline hover:underline">
                    <Dot />
                    Blogs
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Close Button */}
          
          <button
          type="button"
            className="my-3 mx-[10rem] absolute top-1 right-3 px-3 py-3 text-white rounded-full bg-primary-500 hover:bg-primary-700"
            onClick={handleClose} // Close dropdown when clicked
          >
            <X className="w-5 h-5" />
          </button>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default MegaMenu;
