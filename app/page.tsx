// "use client";
import { fetchCategories } from "@/actions/categories";
import { getLinks } from "@/actions/links";
import { PopOver } from "@/components/PopOver";
import { CirclePlus } from "lucide-react";
import Link from "next/link";
import React from "react";
import { AddCategory } from "@/components/AddCategory";

async function page() {
  const links = await getLinks();
  // console.log(links);

  const categories = await fetchCategories();

  const linkCategories = Array.from(
    new Set(links?.map((link) => link.linkCategory))
  );

  // console.log(linkCategories);

  return (
    <main className="flex  flex-col gap-5 py-4 relative">
      <header>
        <nav className="flex flex-col gap-4 ">
          <div className="flex justify-between items-center">
            {" "}
            <div className="">
              <Link
                href="/addLink"
                className=" flex gap-3 font-bold dark:hover:bg-neutral-900 dark:border-neutral-800 border-neutral-100 border hover:bg-slate-100 py-1.5 px-5  rounded-md"
              >
                <CirclePlus />
                Link
              </Link>
            </div>
            <AddCategory />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:grid-cols-5">
            {linkCategories?.map((item, i) => (
              <Link
                href={`category/${item.slug}`}
                key={i}
                className="py-2 px-3 bg-amber-500 text-sm font-semibold text-white rounded-md"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      </header>
      <section className="flex flex-col gap-4 relative">
        {links?.map((link, i) => (
          <div className="flex relative">
            <Link
              href={link.url}
              key={i}
              className=" w-full bg-dark-blue-gradient  bg-neutral-300 dark text-black py-4 px-8 rounded-lg"
            >
              <h2 className="font-semibold">{link.name}</h2>
              <p className="break-all">{link.url}</p>
            </Link>
            <PopOver id={link.id} />
          </div>
        ))}
      </section>
    </main>
  );
}

export default page;
