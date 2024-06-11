"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { LinkValues } from "@/types/types";
import { useRouter } from "next/navigation";
import { createNewLink, updateLink } from "@/actions/links";
import { Check, Loader, Undo2 } from "lucide-react";
import ShadSelectInput from "@/components/shadcn-select-input";
import { AddCategory } from "./AddCategory";

interface LinkFormProps {
  categoriesData: any[];
  initialData?: any;
}

function LinkForm({ categoriesData, initialData }: LinkFormProps) {
  const { userId } = useAuth();

  const [categoryId, setCategoryId] = useState<string>(
    initialData?.categoryId || ""
  );
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LinkValues>({ defaultValues: { ...initialData } });

  async function onSubmit(data: LinkValues) {
    setLoading(true);
    data.categoryId = categoryId;

    if (!userId) {
      toast.error("User is not authenticated.");
      setLoading(false);
      return;
    }

    const userData: any = { ...data, userId };
    try {
      if (initialData && initialData.id) {
        // Update the link
        await updateLink(initialData.id, userData);
        toast.success("Link updated successfully");
      } else {
        // Create a new link
        await createNewLink(userData);
        toast.success("Link created successfully");
      }
      reset();
      setLoading(false);
      router.push("/");
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error("An error occurred");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center py-8 gap-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className="bg-neutral-300 text-black rounded-md py-12 px-8 flex flex-col gap-6 lg:w-[65vw] w-screen"
      >
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold">Add New Link Details</h2>
          <p>Enter Your Link Details</p>
        </div>
        <div className="flex flex-col">
          <label htmlFor="name" className="font-semibold">
            Name
          </label>
          <input
            {...register("name", { required: "Please insert a name" })}
            id="name"
            type="text"
            placeholder="Enter your Link Name"
            className="py-2 px-2 rounded-sm dark:text-slate-300"
          />
          {errors.name && (
            <p className="text-red-600 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="url" className="font-semibold">
            URL
          </label>
          <input
            {...register("url", { required: "Please enter a URL" })}
            id="url"
            type="url"
            placeholder="Enter your URL"
            className="py-2 px-2 rounded-sm dark:text-slate-300"
          />
          {errors.url && (
            <p className="text-red-600 text-sm">{errors.url.message}</p>
          )}
        </div>

        <div className="flex items-center gap-4 lg:gap-40">
          <div className="">
            {categoriesData && Array.isArray(categoriesData) ? (
              <ShadSelectInput
                label="Choose Category"
                optionTitle="Select from below"
                options={categoriesData.map((category: any) => ({
                  value: category.id,
                  label: category.name,
                }))}
                selectedOption={categoryId}
                setSelectedOption={setCategoryId}
                initialData={initialData?.categoryId} // Pass initialData here
              />
            ) : (
              <p className="text-red-600 text-sm">No categories available</p>
            )}
          </div>
          <div className="mt-8">
            <AddCategory />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <button className="flex gap-3 items-center bg-amber-300 py-2 px-6 rounded-lg">
            {initialData ? "UPDATE LINK" : "ADD LINK"}
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

export default LinkForm;
