/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect } from "react";
import { getSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { Button, Label, TextInput, Select, Textarea } from "flowbite-react";
import SidebarLayout from "@/components/layouts/SidebarLayout";

function AddProductTab() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const checkUserRole = async () => {
      const session = await getSession();
      console.log(session);
      if (!session || session?.user?.role < 2) {
        window.location.href = "/dashboard"; 
      }
    };

    checkUserRole();
  }, []);

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch("/api/add-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          brand: data.brand,
          price: data.price,
          category: data.category,
          amount: data.amount,
          itemWeight: data.itemWeight,
          description: data.description,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Product added successfully:", result);
        // Reset the form or show success feedback to the user
      } else {
        const errorData = await response.json();
        console.error("Error adding product:", errorData.error);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
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
                  helperText={errors.name && <span>{String(errors.name.message)}</span>}
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
                    errors.brand && <span>{String(errors.brand.message)}</span>
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
                    errors.price && <span>{String(errors.price.message)}</span>
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
                  <option value="">Select a Category</option>
                  <option value="4">Laptops</option>
                  <option value="5">Accessories</option>
                  <option value="6">Phones</option>
                  <option value="7">Wearables</option>
                  <option value="8">Smart Home</option>
                  <option value="9">Tablets</option>
                </Select>
                {errors.category && (
                  <span className="text-red-600">
                    {String(errors.category.message)}
                  </span>
                )}
              </div>

              {/* Amount */}
              <div className="w-full">
                <Label htmlFor="amount" value="Amount in Stock" />
                <TextInput
                  id="amount"
                  type="number"
                  placeholder="Enter the amount in stock"
                  {...register("amount", { required: "Amount is required" })}
                  color={errors.amount ? "failure" : "gray"}
                  helperText={
                    errors.amount && <span>{String(errors.amount.message)}</span>
                  }
                />
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
                      <span>{String(errors.itemWeight.message)}</span>
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
                      <span>{String(errors.description.message)}</span>
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
