import { fetchCategories } from "@/actions/categories";
import LinkForm from "@/components/link-form";
import React from "react";

export default async function page() {
  const categories = await fetchCategories();
  return (
    <div>
      <LinkForm categoriesData={categories} />
    </div>
  );
}
