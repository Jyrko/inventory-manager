"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Button, Label, TextInput, Textarea } from "flowbite-react";
import SidebarLayout from "@/components/layouts/SidebarLayout";

function AddCategoryTab() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    // Handle category submission logic here (e.g., API call)
    reset(); // Reset the form fields after submission
  };

  return (
    <SidebarLayout>
      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Add a new category
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 sm:grid-cols-1">
              {/* Category Name */}
              <div className="sm:col-span-2">
                <Label htmlFor="name" value="Category Name" />
                <TextInput
                  id="name"
                  placeholder="Type category name"
                  {...register("name", {
                    required: "Category name is required",
                  })}
                  color={errors.name ? "failure" : "gray"}
                  helperText={errors.name && <span>{String(errors.name.message)}</span>}
                />
              </div>

              {/* Description */}
              <div className="sm:col-span-2">
                <Label htmlFor="description" value="Category Description" />
                <Textarea
                  id="description"
                  placeholder="Enter category description"
                  rows={6}
                  {...register("description", {
                    required: "Description is required",
                  })}
                  color={errors.description ? "failure" : "gray"}
                  helperText={
                    errors.description && (
                      <span>{String(errors.description.message)}</span>
                    )
                  }
                />
              </div>
            </div>

            <Button type="submit" className="mt-4 sm:mt-6">
              Add Category
            </Button>
          </form>
        </div>
      </section>
    </SidebarLayout>
  );
}

export default AddCategoryTab;
