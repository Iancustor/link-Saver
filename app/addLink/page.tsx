"use client";
import {
  createNewLink,
  deleteLink,
  getLinks,
  updateLink,
} from "@/actions/links";
import { FormValues } from "@/types/types";
import { link } from "@prisma/client";
import { Check, Delete, Edit, Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

function Page() {
  const [loading, setLoading] = useState<boolean>(false);
  // const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [links, setLinks] = useState<any>([]);
  const [initialData, setInitialData] = useState<any>({});

  const [id, setId] = useState<string>("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  //   useEffect(() => {
  //     const fetchLinks = async () => {
  //       try {
  //         const data = await getLinks();
  //         setLinks(data);
  //       } catch (error) {
  //         console.error("Failed to fetch links:", error);
  //       }
  //     };

  //     fetchLinks();
  //   }, []);

  //   console.log(initialData);

  //   useEffect(() => {
  //     if (id) {
  //       const foundLink = links.find((link: any) => link.id === id);
  //       setInitialData(foundLink);
  //       if (foundLink) {
  //         reset(foundLink);
  //       }
  //     }
  //   }, [id, links, reset]);

  // async function handleDelete(linkId: string) {
  //   setDeleteLoading(true);
  //   await deleteLink(linkId);
  //   location.reload();
  //   setDeleteLoading(false);
  // }

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
        {/* {links?.map((link: link) => (
          <>
            <div className="flex justify-between items-center">
              <h1 className="font-bold">{link.name}</h1>
              <button
                className="flex items-center gap-3"
                onClick={() => handleDelete(`${link.id}`)}
              >
                <Delete className="size-4" />
                {deleteLoading && <Loader className="size-3 animate-spin" />}
              </button>
              <button onClick={() => setId(`${link.id}`)}>
                <Edit className="size-4" />
              </button>
            </div>
            <p>{link.url}</p>
          </>
        ))} */}
      </div>
    </div>
  );
}

export default Page;
