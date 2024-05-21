"use client";
import { updateLink } from "@/actions/links";
import { LinkValues } from "@/types/types";
import { Loader, Undo2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AddCategory } from "./AddCategory";
import ShadSelectInput from "./shadcn-select-input";

function EditLink(
  { singleLink }: any,
  {
    categoriesData,
    initialData,
  }: {
    categoriesData: any;
    initialData?: any;
  }
) {
  const router = useRouter();
  // console.log(id);
  const [loading, setLoading] = useState(false);
  const [categoryId, setCategoryId] = useState<string>(
    initialData?.categoryId || ""
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>({
    defaultValues: singleLink,
  });

  async function onSubmit(data: LinkValues) {
    data.categoryId = categoryId;
    setLoading(true);
    try {
      await updateLink(singleLink.id, data); // Update the link
      reset();
      setLoading(false);
      toast.success("Link Updated successfully");
      router.push("/");
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  }

  return (
    <div className="flex items-center justify-center flex-col py-12 gap-4 px-5">
      <h2 className="font-bold text-2xl">UPDATE LINK</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className="bg-neutral-300 text-black py-12 lg:px-8 flex flex-col gap-6 lg:w-[65vw] w-screen px-6"
      >
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold">Edit Link Details</h2>
          <p>Update Your Link Here </p>
        </div>
        <div className="flex flex-col  ">
          <label htmlFor="" className="font-semibold">
            Name
          </label>
          <input
            {...register("name", { required: true })}
            id="name"
            type="text"
            placeholder=" Enter Link Name  "
            className="py-2 px-2 rounded-sm  dark:text-slate-300"
          />
          {errors.name && (
            <p className="text-red-600 text-sm">Please insert in Name</p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="font-semibold">
            URL
          </label>
          <input
            {...register("url", { required: true })}
            id="url"
            type="url"
            placeholder=" Enter  Url  "
            className="py-2 px-2 rounded-sm dark:text-slate-300"
          />
          {errors.url && <p className="text-red-400">Please enter Url</p>}
        </div>
        <div className="flex items-center gap-4 lg:gap-40">
          <div className=" ">
            <ShadSelectInput
              label="Choose Category"
              optionTitle="Select from below"
              options={categoriesData.map((category: any) => ({
                value: category.id,
                label: category.name,
              }))}
              selectedOption={categoriesData}
              setSelectedOption={setCategoryId}
            />
          </div>
          <div className="mt-8">
            <AddCategory />
          </div>
        </div>
        <div className="flex justify-between">
          {loading ? (
            <button className="text-white py-2 flex gap-2 px-10 bg-amber-600 rounded-md">
              <Loader className="animate-spin text-white" />
              Updating ...
            </button>
          ) : (
            <button className="text-white py-2 bg-amber-600 rounded-md px-6">
              Submit
            </button>
          )}

          <Link href="/">
            <Undo2 />
          </Link>
        </div>
      </form>
    </div>
  );
}

export default EditLink;
