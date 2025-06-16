import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import React from "react";
import SignUpModal from "./signUpModal";

function LoginModal() {
  return (
    <>
      <DialogContent className="overflow-auto">
        <DialogHeader className="text-2xl">
          <DialogTitle className="text-primary-500 inline-flex items-center space-x-2">
            <Image
              src="/images/loveme-icon.png"
              alt="Love Me Logo"
              width={150}
              height={150}
              className="w-[2rem] mr-3"
            />
            Member&apos;s Login
          </DialogTitle>
          <div className="text-sm italic">
            <p>
              Fields marked with <span className="text-red-600">*</span> are
              required!
            </p>
            <p>
              Fill in the form below and press the button to access your account
            </p>
          </div>

          <form action="/sign-in" method="POST" name="signIn" id="signIn">
            <div className="flex flex-col py-2">
              <label className="text-base" htmlFor="email">
                Email Address: <span className="text-red-600">*</span>
              </label>
              <input
                className="text-sm border py-2 px-2 rounded-lg"
                type="email"
                placeholder="Enter email address"
                required
              />
            </div>
            <div className="flex flex-col py-2">
              <label className="text-base mb-2" htmlFor="password">
                Password: <span className="text-red-600">*</span>
              </label>
              <input
                className="text-sm border py-2 px-2 rounded-lg"
                type="password"
                placeholder="Enter password"
                required
              />
            </div>

            
            <button type="submit" className="py-3 mt-2 px-8 bg-primary-500 hover:bg-primary-700 text-white rounded-full text-sm">
              Access Account
            </button>
          </form>
        </DialogHeader>
        <div className="text-sm">
          <span>Not a member yet? </span>
          <Dialog>
            <DialogTrigger className="text-blue-800">
              Click here to register
            </DialogTrigger>

            <SignUpModal />
          </Dialog>
        </div>
      </DialogContent>
    </>
  );
}

export default LoginModal;
