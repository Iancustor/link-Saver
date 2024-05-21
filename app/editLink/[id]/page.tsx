import { fetchCategories } from "@/actions/categories";
import { findUniqueLink } from "@/actions/links";
import LinkForm from "@/components/link-form";
import React from "react";

export default async function Page({ params: { id } }: any) {
  const singleLink = await findUniqueLink(id);
  // console.log(singleLink);
  const categories:any = await fetchCategories();
  // console.log(categories);
  return (
    <div>
      <LinkForm initialData={singleLink} categoriesData={categories} />
    </div>
  );
}
