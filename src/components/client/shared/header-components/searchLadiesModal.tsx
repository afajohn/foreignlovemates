import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  CircleArrowRight,
  Search,
  SearchCheck,
} from "lucide-react";
import React from "react";
import Link from "next/link";

function SearchLadiesModal() {
  return (
    <>
      <DialogContent className="py-2 px-5 md:px-0 max-w-[30rem] md:max-w-[60rem] max-h-[35rem] border rounded-lg overflow-auto">
        <DialogHeader className="shadow-sm">
          <div className="flex flex-row justify-center md:justify-between text-sm">
            <div className="py-3 px-1 md:px-2 mb-2 mx-0 md:mx-5">
              <DialogTitle className="inline-flex items-center space-x-2">
                <Search className="h-6 w-6 text-primary-500" />
                <p className="text-primary-500 text-lg md:text-2xl text-nowrap">Quick Search</p>
              </DialogTitle>
            </div>

            <div className="bg-[#fff4dd] rounded py-3 px-1 md:px-5 mx-5 md:mx-10 mb-3 md:mb-1 text-[#936b1c]">
              <Link
                href="/advanced-search"
                className="inline-flex text-base items-center space-x-2 pt-1 decoration-[#936b1c]"
              >
                <span className="text-xs md:text-lg underline underline-offset-4">Go to Advanced Search</span>
                <SearchCheck className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 justify-evenly gap-5">
          <div className="w-full text-sm flex justify-center">
            <form action="/search-ladies" method="POST" name="search" id="searchLadies" className="bg-gray-50 py-6 px-10 mb-4 shadow rounded-lg">
              <div>
                <h2 className="block text-gray-800 text-lg font-bold mb-4 text-center">
                  Basic Search Option
                </h2>
              </div>
              <div>
                <p className="block text-gray-800 text-sm font-bold mb-2">
                  AGE :
                </p>
              </div>
              <div className="flex flex-row gap-5 ">
                <div className="mb-4">
                  <Select>
                    <SelectTrigger className="w-[160px] rounded-full">
                      <SelectValue placeholder="Min Age" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="100">100</SelectItem>
                      <SelectItem value="200">200</SelectItem>
                      <SelectItem value="300">300</SelectItem>
                      <SelectItem value="400">400</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="mb-4">
                  <Select>
                    <SelectTrigger className="w-[160px] rounded-full">
                      <SelectValue placeholder="Max Age" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="100">100</SelectItem>
                      <SelectItem value="200">200</SelectItem>
                      <SelectItem value="300">300</SelectItem>
                      <SelectItem value="400">400</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <p className="block text-gray-800 text-sm font-bold mb-2">
                  WEIGHT :
                </p>
              </div>
              <div className="flex flex-row gap-5">
                <div className="mb-4">
                  <Select>
                    <SelectTrigger className="w-[160px] rounded-full">
                      <SelectValue placeholder="Min Weight " />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="100">100</SelectItem>
                      <SelectItem value="200">200</SelectItem>
                      <SelectItem value="300">300</SelectItem>
                      <SelectItem value="400">400</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="mb-4">
                  <Select>
                    <SelectTrigger className="w-[160px] rounded-full">
                      <SelectValue placeholder="Max Weight" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="100">100</SelectItem>
                      <SelectItem value="200">200</SelectItem>
                      <SelectItem value="300">300</SelectItem>
                      <SelectItem value="400">400</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <p className="block text-gray-800 text-sm font-bold mb-2">
                  REGION :
                </p>
              </div>
              <div className="flex justify-center">
                <div className="mb-4 w-full">
                  <Select required>
                    <SelectTrigger className="w-[350px] rounded-full">
                      <SelectValue placeholder="Preferred Ethnicity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="European">European</SelectItem>
                      <SelectItem value="Latin">Latin</SelectItem>
                      <SelectItem value="Asian">Asian</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <Button 
                type="submit"
                className="bg-secondary-500 hover:bg-secondary-700 w-full p-2 text-white text-sm rounded-full focus:outline-none focus:shadow-outline">
                  Submit
                </Button>
              </div>
            </form>
          </div>
          <div className="flex flex-col items-center w-full text-sm px-5">
            <form action="/search-ladies-id" method="POST" name="id">
              <div className="relative mt-2">
                <input
                  className="border pl-2 py-3 rounded-l-full"
                  placeholder="Enter ID number"
                />

                <button
                  type="submit"
                  className="border px-2 md:px-5 py-3 bg-primary-800 hover:bg-primary-700 text-white rounded-r-full"
                >
                  Search
                </button>
              </div>
            </form>
            <div className="pt-5">
              <ul className="flex flex-col gap-8 font-bold text-sm">
                <li>
                  <Link
                    href="/newest-profiles"
                    className="inline-flex text-sm text-gray-800 items-center space-x-2"
                  >
                    Newest Profiles
                    <CircleArrowRight className="h-4 w-4 ml-4 text-primary-700" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/womens-profiles"
                    className="inline-flex text-sm text-gray-800 items-center space-x-2"
                  >
                    Woman&apos;s Profiles
                    <CircleArrowRight className="h-4 w-4 ml-2 text-primary-700" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="weekly-auto-wizard"
                    className="inline-flex text-sm text-gray-800 items-center space-x-2"
                  >
                    Weekly Auto Match Wizard
                    <CircleArrowRight className="h-4 w-4 ml-2 text-primary-700" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/new-ladies-worldwide"
                    className="inline-flex text-sm text-gray-800 items-center space-x-2"
                  >
                    This Weeks New Girls Worldwide
                    <CircleArrowRight className="h-4 w-4 ml-2 text-primary-700" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/search-ladies-worldwide"
                    className="inline-flex text-sm text-gray-800 items-center space-x-2"
                  >
                    Want more? Search Women Worldwide
                    <CircleArrowRight className="h-4 w-4 ml-2 text-primary-700" />
                  </Link>
                </li>
              </ul>
            </div>
            <div className="pt-5">
              <Link href="/sign-up" className="primary-btn">
                Sign Up Today, It&apos;s Totally Free
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </>
  );
}

export default SearchLadiesModal;
