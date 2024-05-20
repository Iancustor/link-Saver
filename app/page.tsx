// "use client";
import { getLinks } from "@/actions/links";
import { PopOver } from "@/components/PopOver";
// import { ModeToggle } from "@/components/Toggle";
import { CirclePlus, Home, Search, Settings } from "lucide-react";
import Link from "next/link";
import React from "react";

async function page() {
  const links = await getLinks();
  // console.log(links);
  return (
    <main className="flex lg:px-64 flex-col gap-5 py-4 relative">
      <header>
        <nav className=" ">
          <div>
            <div className=" py-2 px-2 rounded-full">
              <Link href="/addLink" className=" rounded-full">
                <CirclePlus />
              </Link>
            </div>
          </div>
        </nav>
      </header>
      <section className="flex flex-col gap-4 relative">
        {links?.map((link, i) => (
          <div key={i} className="relative">
            <div className=" bg-dark-blue-gradient  bg-neutral-300 dark text-black py-4 px-8 rounded-lg">
              <h2 className="font-semibold">{link.name}</h2>
              <p>{link.url}</p>
            </div>
            <PopOver id={link.id} />
          </div>
        ))}
      </section>
    </main>
  );
}

export default page;
