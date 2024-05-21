import { fetchCategories } from "@/actions/categories";
import { getLinks } from "@/actions/links";
import { PopOver } from "@/components/PopOver";
import { link, linkCategory } from "@prisma/client";
import { Undo2 } from "lucide-react";
import Link from "next/link";
import React from "react";

async function page({ params: { slug } }: { params: { slug: string } }) {
  const links = await getLinks();
  const categories = await fetchCategories();
  // console.log(links);

  const cat = categories?.find(
    (category: linkCategory) => category.slug === slug
  );
  // console.log(cat);

  const data: any = links?.filter((link: link) => link.categoryId == cat?.id);
  // console.log(data);
  return (
    <section className="relative">
      <div className=" flex flex-col gap-4 relative">
        {data.length > 0 ? (
          <>
            {data?.map((link: link) => (
              <div key={link.id} className="relative">
                <div className=" bg-dark-blue-gradient  bg-neutral-300 dark text-black py-4 px-8 rounded-lg">
                  <h2 className="font-semibold">{link.name}</h2>
                  <p>{link.url}</p>
                </div>
                <PopOver id={link.id} />
              </div>
            ))}
          </>
        ) : (
          <p className="text-3xl font-bold text-center">No Links Sofar</p>
        )}
      </div>

      <div className="">
        <Link href="/">
          <Undo2 />
        </Link>
      </div>
    </section>
  );
}

export default page;
