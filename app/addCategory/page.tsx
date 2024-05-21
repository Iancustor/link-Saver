"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { CategoryValues } from "@/types/types";
import { createCategory } from "@/actions/categories";
import { Check, Loader, Undo2 } from "lucide-react";
import { generateSlug } from "@/lib/generateSlug";

function CategoryForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryValues>();

  async function onSubmit(data: CategoryValues) {
    data.slug = generateSlug(data.name);
    setLoading(true);
    try {
      await createCategory(data);
      reset();
      setLoading(false);
      toast.success("Category created successfully");
      router.push("/addLink");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center py-8 gap-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className=" rounded-md   flex flex-col gap-8 "
      >
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold">Add Link Category </h2>
          <p>Enter Category Details</p>
        </div>
        <div className="flex flex-col">
          <label htmlFor="name" className="font-semibold">
            Category Name
          </label>
          <input
            {...register("name", { required: true })}
            id="name"
            type="name"
            placeholder=" Enter your category Name  "
            className="py-2 px-2 rounded-sm bg-neutral-300 placeholder:text-black"
          />
          {errors.name && (
            <p className="text-red-600 text-sm">
              Please insert in a category name
            </p>
          )}
        </div>
        <div className="flex gap-12 items-center">
          <button className="flex gap-3 items-center bg-amber-300 py-2 px-6 rounded-lg">
            ADD CATEGORY
            {loading ? (
              <Loader className="size-4 animate-spin" />
            ) : (
              <Check className="size-4" />
            )}
          </button>
          <Link href="/">
            <Undo2 />
          </Link>
        </div>
      </form>
    </div>
  );
}

export default CategoryForm;
