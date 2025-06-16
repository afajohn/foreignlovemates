"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

interface FormData {
  email: string;
  code: string;
}

const VerifyPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const router = useRouter();

  const onSubmit = (data: FormData) => {
    const isVerified = data.code === "123456"; // Replace with actual verification logic

    if (isVerified) {
      router.push("../data/success");
    } else {
      alert("Verification failed. Please check your code.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Verify Your Account</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email:
            </label>
            <Input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
              className={`mt-1 ${
                errors.email ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring focus:ring-blue-500`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="code"
              className="block text-sm font-medium text-gray-700"
            >
              Verification Code:
            </label>
            <Input
              type="text"
              id="code"
              {...register("code", {
                required: "Verification code is required",
              })}
              className={`mt-1 ${
                errors.code ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring focus:ring-blue-500`}
            />
            {errors.code && (
              <p className="mt-1 text-sm text-red-500">{errors.code.message}</p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full bg-primary-500 text-white hover:bg-primary-800"
          >
            Verify
          </Button>
        </form>
      </div>
    </div>
  );
};

export default VerifyPage;
