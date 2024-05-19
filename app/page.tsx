// "use client";
import { getLinks } from "@/actions/links";
import { PopOver } from "@/components/PopOver";
import { CirclePlus, Home, Search, Settings } from "lucide-react";
import Link from "next/link";
import React from "react";

async function page() {
  const links = await getLinks();
  // console.log(links);
  return (
    <main className="flex lg:px-80 flex-col gap-5 py-4 relative">
      <header>
        <h2 className="text-center font-semibold uppercase">Link Keeper</h2>
        <nav className="items-center justify-between flex  ">
          <button className="bg-neutral-300 py-2 px-4 rounded-md">
            <Home />
          </button>
          <div>
            <div className="bg-neutral-300 py-2 px-2 rounded-full">
              <Link href="/addLink" className=" rounded-full">
                <CirclePlus />
              </Link>
            </div>
          </div>
          {/* <button className="bg-blue-300 py-2 px-4 rounded-md">
            <Plus />
          </button> */}
        </nav>
      </header>
      <section className="flex flex-col gap-4 relative">
        {links?.map((link, i) => (
          <div key={i} className="relative">
            <div className="bg-neutral-300 py-4 px-8 rounded-lg">
              <h2 className="font-semibold">{link.name}</h2>
              <p>{link.url}</p>
            </div>
            <PopOver id={link.id} key={i} />
          </div>
        ))}
      </section>
      <footer className="items-center justify-between flex  ">
        {/* <div className="flex gap-4">
          <button>
            {" "}
            <Settings />
          </button>

          <button>
            <Search />
          </button>
        </div> */}
      </footer>
    </main>
  );
}

export default page;
