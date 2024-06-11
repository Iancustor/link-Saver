"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { linkCategory } from "@prisma/client";
import { CategoryValues, LinkValues } from "@/types/types";
import { auth } from "@clerk/nextjs/server";

export async function createCategory(data: CategoryValues) {
  // console.log(data);
  const slug = data.slug;
  try {
    // existing
    const existingCat = await db.linkCategory.findUnique({
      where: {
        slug,
      },
    });
    const newCategory = await db.linkCategory.create({ data });
    revalidatePath("/");
    // console.log(`Created New Category Sucessfully: ${newCategory}`);
    return newCategory;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create link");
  }
}

export async function fetchCategories() {
  try {
    const categories = await db.linkCategory.findMany();
    // console.log(`Categories fetched sucessfully ${fetchCategories}`);
    return categories;
  } catch (error) {
    console.error(error);
  }
}

export async function getCategoryBySlug(slug: string) {
  try {
    const category = await db.linkCategory.findUnique({
      where: {
        slug,
      },
    });
    // console.log(`category fetched sucessfully ${fetchcategory}`);
    return category;
  } catch (error) {
    console.error(error);
  }
}
export async function getLinksByCategory(catId: string) {
  try {
    const links = await db.link.findMany({
      where: {
        categoryId: catId,
      },
    });
    // console.log(`Categories fetched sucessfully ${fetchCategories}`);
    return links;
  } catch (error) {
    console.error(error);
  }
}
