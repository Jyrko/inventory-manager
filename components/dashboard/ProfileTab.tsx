"use client";
import SidebarLayout from "@/components/layouts/SidebarLayout";
import React, { useState } from "react";
import { TextInput, Label, Button, Checkbox, Alert } from "flowbite-react";
import { useForm } from "react-hook-form";

const ProfileTab = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [isPasswordResetVisible, setIsPasswordResetVisible] = useState(false); // Track visibility of password fields

  // Function to handle form submission
  const onSubmit = (data) => {
    console.log("Updated Data: ", data);
    setIsAlertVisible(true); // Show confirmation alert
    setTimeout(() => {
      setIsAlertVisible(false); // Hide alert after 3 seconds
    }, 3000);
    reset();
  };

  const password = watch("newPassword"); // Get the new password value for validation

  return (
    <SidebarLayout>
      <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Edit Profile
        </h2>

        {/* Success Alert */}
        {isAlertVisible && (
          <Alert color="success" onDismiss={() => setIsAlertVisible(false)}>
            <span>
              <span className="font-medium">Profile updated!</span> Your changes
              have been saved successfully.
            </span>
          </Alert>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <div>
            <Label htmlFor="name" value="First Name" />
            <TextInput
              id="name"
              type="text"
              placeholder="Enter your first name"
              {...register("name", { required: "First Name is required" })}
              color={errors.name ? "failure" : "gray"}
            />
            {errors.name && (
              <span className="text-red-600">{errors.name.message}</span>
            )}
          </div>

          {/* Surname Field */}
          <div>
            <Label htmlFor="surname" value="Last Name" />
            <TextInput
              id="surname"
              type="text"
              placeholder="Enter your last name"
              {...register("surname", { required: "Last Name is required" })}
              color={errors.surname ? "failure" : "gray"}
            />
            {errors.surname && (
              <span className="text-red-600">{errors.surname.message}</span>
            )}
          </div>

          {/* Email Field */}
          <div>
            <Label htmlFor="email" value="Email" />
            <TextInput
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Please enter a valid email address",
                },
              })}
              color={errors.email ? "failure" : "gray"}
            />
            {errors.email && (
              <span className="text-red-600">{errors.email.message}</span>
            )}
          </div>

          {/* Reset Password Button */}
          <Button
            type="button"
            className="bg-gray-700 hover:bg-gray-800 text-white"
            onClick={() => setIsPasswordResetVisible(!isPasswordResetVisible)}
          >
            {isPasswordResetVisible ? "Cancel Password Reset" : "Reset Password"}
          </Button>

          {/* Password Fields (Visible only after clicking "Reset Password") */}
          {isPasswordResetVisible && (
            <>
              {/* New Password Field */}
              <div>
                <Label htmlFor="newPassword" value="New Password" />
                <TextInput
                  id="newPassword"
                  type="password"
                  placeholder="Enter a new password"
                  {...register("newPassword", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                  })}
                  color={errors.newPassword ? "failure" : "gray"}
                />
                {errors.newPassword && (
                  <span className="text-red-600">
                    {errors.newPassword.message}
                  </span>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <Label htmlFor="confirmPassword" value="Confirm Password" />
                <TextInput
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your new password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  color={errors.confirmPassword ? "failure" : "gray"}
                />
                {errors.confirmPassword && (
                  <span className="text-red-600">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>
            </>
          )}

          {/* Email Notifications */}
          <div className="flex items-center gap-2">
            <Checkbox {...register("notifications")} id="notifications" />
            <Label htmlFor="notifications">Enable email notifications</Label>
          </div>

          {/* Save Button */}
          <Button
            type="submit"
            className="bg-primary-700 hover:bg-primary-800 text-white"
          >
            Save Changes
          </Button>
        </form>
      </div>
    </SidebarLayout>
  );
};

export default ProfileTab;
