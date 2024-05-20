"use client";
import { createNewLink } from "@/actions/links";
import { FormValues } from "@/types/types";
import { Check, Loader, Undo2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function Page() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  async function onSubmit(data: FormValues) {
    setLoading(true);
    // console.log(data);
    try {
      await createNewLink(data);
      reset();
      setLoading(false);
      toast.success("Link Created successfully");
      router.push("/");
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
        className="bg-neutral-300 text-black rounded-md py-12 px-8 flex flex-col gap-6 lg:w-[65vw] w-screen"
      >
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold">Add New Link Details</h2>
          <p>Enter Your Link Details</p>
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="font-semibold">
            Name
          </label>
          <input
            {...register("name", { required: true })}
            id="name"
            type="name"
            placeholder=" Enter your Link Name  "
            className="py-2 px-2 rounded-sm dark:text-slate-300"
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
            placeholder=" Enter your Url  "
            className="py-2 px-2 rounded-sm dark:text-slate-300"
          />
          {errors.url && <p className="text-red-400">Please enter Url</p>}
        </div>
        <div className="flex justify-between items-center">
          <button className="flex gap-3 items-center bg-blue-300 py-2 px-6 rounded-lg">
            ADD LINK
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

export default Page;
