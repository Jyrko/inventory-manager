"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import Link from "next/link";
import Image from "next/image";
import LenifyLogo from "@/public/images/lenify-logo.webp";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormData>();
  const [registrationError, setRegistrationError] = useState("");

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
        }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        window.location.href = "/login";
      } else {
        setRegistrationError(result.message);
      }
    } catch (error) {
      console.log(error.message);
      setRegistrationError("An error occurred. Please try again later.");
    }
  };
  
  
  

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <Image
            src={LenifyLogo}
            alt="Lenify Logo"
            className="h-8 w-8 mr-2 object-contain"
          />
          Lenify
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <Label htmlFor="email" value="Your email" />
                <TextInput
                  type="email"
                  id="email"
                  placeholder="name@company.com"
                  {...register("email", { required: "Email is required" })}
                  color={errors.email ? "failure" : "gray"}
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="password" value="Password" />
                <TextInput
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  color={errors.password ? "failure" : "gray"}
                />
                {errors.password && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="confirm-password" value="Confirm password" />
                <TextInput
                  type="password"
                  id="confirm-password"
                  placeholder="••••••••"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === getValues("password") ||
                      "Passwords do not match",
                  })}
                  color={errors.confirmPassword ? "failure" : "gray"}
                />
                {errors.confirmPassword && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
              <div className="flex items-start">
                <Checkbox
                  id="terms"
                  {...register("acceptTerms", {
                    required: "You must accept the terms and conditions",
                  })}
                />
                <Label
                  htmlFor="terms"
                  className="ml-2 text-sm font-light text-gray-500 dark:text-gray-300"
                >
                  I accept the{" "}
                  <Link
                    href="/terms-conditions"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Terms and Conditions
                  </Link>
                </Label>
                {errors.acceptTerms && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.acceptTerms.message}
                  </p>
                )}
              </div>
              {registrationError && (
                <p className="text-red-600 text-sm mt-1">{registrationError}</p>
              )}
              <Button type="submit" className="w-full">
                Create an account
              </Button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
