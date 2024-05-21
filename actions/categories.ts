"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { linkCategory } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

export async function createCategory(data: linkCategory) {
  // console.log(data);
  try {
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
    const categories = await db.linkCategory.findMany({});
    // console.log(`Categories fetched sucessfully ${fetchCategories}`);
    return categories;
  } catch (error) {
    console.error(error);
  }
}
