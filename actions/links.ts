"use server";

import { db } from "@/lib/db";
import { link } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

export async function createNewLink(data: link) {
  // console.log(data);
  try {
    const newLink = await db.link.create({ data });
    revalidatePath("/");
    // console.log(newLink);
    return newLink;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create link");
  }
}

export async function getLinks() {
  const { userId }: { userId: string | null } = auth();
  // console.log(userId)
  if (!userId) {
    throw new Error("User is not authenticated");
  }

  try {
    const links = await db.link.findMany({
      where: { userId },
    });
    return links;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteLink(id: string) {
  // console.log(id);
  try {
    const link = await db.link.delete({
      where: {
        id,
      },
    });
    // console.log(`deleted the Following Link: ${link}`);
    revalidatePath("/");
    return link;
  } catch (error) {
    console.log(error);
  }
}

export async function updateLink(linkId: string, data: link) {
  try {
    const existingLink = await db.link.findUnique({
      where: {
        id: linkId,
      },
    });

    if (!existingLink) {
      console.log(`No Link has been found belonging to this ${linkId}`);
      return null;
    }

    // Remove the id field from the data object if it exists
    const { id, ...updateData } = data;

    const updatedLink = await db.link.update({
      where: {
        id: linkId,
      },
      data: updateData,
    });

    console.log(`Updated the Following Link: ${updatedLink}`);
    revalidatePath("/");
    return updatedLink;
  } catch (error) {
    console.log(error);
  }
}

export async function findUniqueLink(id: string) {
  // console.log(linkId);
  try {
    const link = await db.link.findUnique({
      where: {
        id: id,
      },
    });

    // console.log(`Link: ${link}`);
    return link;
  } catch (error) {
    console.log(error);
  }
}
