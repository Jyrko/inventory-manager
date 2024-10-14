"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Button, Label, TextInput, Select, Textarea } from "flowbite-react";
import SidebarLayout from "@/components/layouts/SidebarLayout";

function AddProductTab() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission logic here
  };

  return (
    <SidebarLayout>
      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Add a new product
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              {/* Product Name */}
              <div className="sm:col-span-2">
                <Label htmlFor="name" value="Product Name" />
                <TextInput
                  id="name"
                  placeholder="Type product name"
                  {...register("name", {
                    required: "Product name is required",
                  })}
                  color={errors.name ? "failure" : "gray"}
                  helperText={errors.name && <span>{errors.name.message}</span>}
                />
              </div>

              {/* Brand */}
              <div className="w-full">
                <Label htmlFor="brand" value="Brand" />
                <TextInput
                  id="brand"
                  placeholder="Product brand"
                  {...register("brand", { required: "Brand is required" })}
                  color={errors.brand ? "failure" : "gray"}
                  helperText={
                    errors.brand && <span>{errors.brand.message}</span>
                  }
                />
              </div>

              {/* Price */}
              <div className="w-full">
                <Label htmlFor="price" value="Price" />
                <TextInput
                  id="price"
                  type="number"
                  placeholder="$2999"
                  {...register("price", { required: "Price is required" })}
                  color={errors.price ? "failure" : "gray"}
                  helperText={
                    errors.price && <span>{errors.price.message}</span>
                  }
                />
              </div>

              {/* Category */}
              <div className="w-full">
                <Label htmlFor="category" value="Category" />
                <Select
                  id="category"
                  {...register("category", {
                    required: "Category is required",
                  })}
                >
                  <option value="">Select category</option>
                  <option value="TV">TV/Monitors</option>
                  <option value="PC">PC</option>
                  <option value="GA">Gaming/Console</option>
                  <option value="PH">Phones</option>
                </Select>
                {errors.category && (
                  <span className="text-red-600">
                    {errors.category.message}
                  </span>
                )}
              </div>

              {/* Item Weight */}
              <div className="w-full">
                <Label htmlFor="item-weight" value="Item Weight (kg)" />
                <TextInput
                  id="item-weight"
                  type="number"
                  placeholder="12"
                  {...register("itemWeight", {
                    required: "Item weight is required",
                  })}
                  color={errors.itemWeight ? "failure" : "gray"}
                  helperText={
                    errors.itemWeight && (
                      <span>{errors.itemWeight.message}</span>
                    )
                  }
                />
              </div>

              {/* Description */}
              <div className="sm:col-span-2">
                <Label htmlFor="description" value="Description" />
                <Textarea
                  id="description"
                  placeholder="Your description here"
                  rows={8}
                  {...register("description", {
                    required: "Description is required",
                  })}
                  color={errors.description ? "failure" : "gray"}
                  helperText={
                    errors.description && (
                      <span>{errors.description.message}</span>
                    )
                  }
                />
              </div>
            </div>

            <Button type="submit" className="mt-4 sm:mt-6">
              Add product
            </Button>
          </form>
        </div>
      </section>
    </SidebarLayout>
  );
}

export default AddProductTab;
