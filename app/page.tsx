// "use client";
import { getLinks } from "@/actions/links";
import { Dropdown } from "@/components/Dropdown";
import {
  CirclePlus,
  EllipsisVertical,
  Home,
  Plus,
  Search,
  Settings,
} from "lucide-react";
import Link from "next/link";
import React from "react";

async function page() {
  const links = await getLinks();
  // console.log(links);
  return (
    <main className="flex min-h-96 flex-col gap-5 py-4 relative">
      <header>
        <h2 className="text-center font-semibold">Link Keeper</h2>
        <nav className="items-center justify-between flex  ">
          <button className="bg-blue-300 py-2 px-8 rounded-md">
            <Home />
          </button>
          <div></div>
          <button className="bg-blue-300 py-2 px-4 rounded-md">
            <Plus />
          </button>
        </nav>
      </header>
      <section className="flex flex-col gap-4 relative">
        {links?.map((link, i) => (
          <div key={i} className="relative">
            <div className="bg-blue-200 py-4 px-8 rounded-lg">
              <h2 className="font-semibold">{link.name}</h2>
              <p>{link.url}</p>
            </div>
            <Dropdown id={link.id} key={i} />
          </div>
        ))}
      </section>
      <footer className="items-center justify-between flex  ">
        <div className="flex gap-4">
          <button>
            {" "}
            <Settings />
          </button>

          <button>
            <Search />
          </button>
        </div>
        <div className="bg-blue-300 py-2 px-4 rounded-md">
          <Link href="/addLink">
            <CirclePlus />
          </Link>
        </div>
      </footer>
    </main>
  );
}

export default page;
