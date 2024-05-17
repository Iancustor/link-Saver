"use client";
import { createNewLink } from "@/actions/links";
import { FormValues } from "@/types/types";
import { Check, Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

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
      router.push("/");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col items-center py-8 gap-5">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="font-semibold">Add Link</h2>
        <div className="flex flex-col gap-3">
          <div>
            <input
              {...register("name", { required: true })}
              id="name"
              type="text"
              placeholder="Title"
              className="bg-neutral-300 border-black text-black py-2 placeholder:text-black px-5 rounded-sm"
            />
            {errors.name && <p className="text-red-400">Please enter Name</p>}
          </div>
          <div>
            <input
              {...register("url", { required: true })}
              id="url"
              type="url"
              placeholder="URL (example.com)"
              className="bg-neutral-300 border-black text-black py-2 placeholder:text-black px-5 rounded-sm"
            />
            {errors.url && <p className="text-red-400">Please enter Url</p>}
          </div>
        </div>
        <div>
          <button className="flex gap-3 items-center bg-blue-300 py-2 px-6 rounded-lg">
            ADD LINK
            {loading ? (
              <Loader className="size-4 animate-spin" />
            ) : (
              <Check className="size-4" />
            )}
          </button>
        </div>
      </form>
      <div className="flex flex-col space-y-2">
        <Link href="/">Back</Link>
      </div>
    </div>
  );
}

export default Page;
