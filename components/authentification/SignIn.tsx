"use client";
import { useState } from "react";
import { Button, Checkbox, Label, TextInput, Modal } from "flowbite-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import LenifyLogo from "@/public/images/lenify-logo.webp";
import Image from "next/image";

interface FormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

function SignIn() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [formData] = useState<FormData>({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [isForgotPasswordClicked, setIsForgotPasswordClicked] = useState(false);

  const onSubmit = (data: FormData) => {
    // Handle form submission logic here
    console.log("Form Data: ", data);
  };

  const handleForgotPasswordClick = () => {
    setIsForgotPasswordClicked(true);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <Image src={LenifyLogo} alt="Lenify Logo" className="h-8 w-8 mr-2 object-contain" />
          Lenify
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
                  <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="password" value="Password" />
                <TextInput
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  {...register("password", { required: "Password is required" })}
                  color={errors.password ? "failure" : "gray"}
                />
                {errors.password && (
                  <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <Checkbox
                    id="remember"
                    {...register("rememberMe")}
                    defaultChecked={formData.rememberMe}
                  />
                  <Label htmlFor="remember" className="ml-2 text-sm font-light text-gray-500 dark:text-gray-300">
                    Remember me
                  </Label>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  onClick={handleForgotPasswordClick}
                >
                  Forgot password?
                </a>
              </div>
              <Button type="submit" className="w-full">
                Sign in
              </Button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link href="/sign-up" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Register here
                </Link>
              </p>
            </form>
          </div>
        </div>

        {/* Modal or Message for "Forgot Password" */}
        {isForgotPasswordClicked && (
          <Modal show={isForgotPasswordClicked} onClose={() => setIsForgotPasswordClicked(false)}>
            <Modal.Header>Forgot Password</Modal.Header>
            <Modal.Body>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                Oh, what a pity! How could this have happened to someone like you? 
                But don&apos;t worry, we’ll help you get back on track (No).
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => setIsForgotPasswordClicked(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    </section>
  );
}

export default SignIn;
