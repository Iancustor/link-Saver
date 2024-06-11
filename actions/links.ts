"use server";

import { db } from "@/lib/db";
import { link } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { LinkValues } from "@/types/types";

const rawLinks = [
  {
    // id: "664cce160a48d907177330c8",
    name: "Giphy animations",
    url: "https://giphy.com/reactions",
    userId: "user_2giijZ1jRfOCbBKdO2sQPIUPeC4",
    categoryId: "664c5ab3bcfb9f963de53511",
  },
  {
    // id: "664d452f2bf040f6b1288039",
    name: "Custom Drawer Navigation in React Native | Expo Router V3",
    url: "https://www.youtube.com/watch?v=Bc-Uc_qxL78",
    userId: "user_2gmdnG0oIkmEwZLk1IhtJB6NIeI",
    categoryId: "664c5890bcfb9f963de53510",
  },
  {
    // id: "664d6f4b5b11d32524092645",
    name: "Web Pixels",
    url: "https://webpixels.io/sections",
    userId: "user_2gmdnG0oIkmEwZLk1IhtJB6NIeI",
    categoryId: "664c5ab3bcfb9f963de53511",
  },
  {
    // id: "664d719ebbeb5f54e0fb020a",
    name: "Ui8",
    url: "https://ui8.net/category/coded-templates",
    userId: "user_2gmdnG0oIkmEwZLk1IhtJB6NIeI",
    categoryId: "664c5ab3bcfb9f963de53511",
  },
  {
    // id: "664e0a8f56b41773f163d565",
    name: "kooza collinz",
    url: "https://namelix.com/",
    userId: "user_2gpNKweii5CrPXn8jNvhhH8DToL",
    categoryId: "664c5890bcfb9f963de53510",
  },
  {
    // id: "664ebca9e8c2a1c5f456e255",
    name: "Unified",
    url: "https://unifiedpractice.com/resources/",
    userId: "user_2gmdnG0oIkmEwZLk1IhtJB6NIeI",
    categoryId: "664c8e6b3c7d5bc20ec88789",
  },
  {
    // id: "664ebf89730d1f0ae8f20970",
    name: "UnifiedPractice Demo",
    url: "https://vimeo.com/227310002",
    userId: "user_2gmdnG0oIkmEwZLk1IhtJB6NIeI",
    categoryId: "664c8e6b3c7d5bc20ec88789",
  },
  {
    // id: "664ebfac9d8862101b3679a1",
    name: "Unified Practice demo 2",
    url: "https://vimeo.com/172068023",
    userId: "user_2gmdnG0oIkmEwZLk1IhtJB6NIeI",
    categoryId: "664c8e6b3c7d5bc20ec88789",
  },
  {
    // id: "6650b83d7139cbdbd4feb48a",
    name: "canva designs",
    url: "https://www.canva.com/p/templates/EAFxtVt_uxM-red-and-white-illustrative-important-announcement-instagram-post/",
    userId: "user_2giijZ1jRfOCbBKdO2sQPIUPeC4",
    categoryId: "664c5ab3bcfb9f963de53511",
  },
  {
    // id: "6650b890fffc1c519356108b",
    name: "canva designs 2",
    url: "https://www.canva.com/p/templates/EAE2b3LNi7g-brown-boho-instagram-posts-template/",
    userId: "user_2giijZ1jRfOCbBKdO2sQPIUPeC4",
    categoryId: "664c5ab3bcfb9f963de53511",
  },
  {
    // id: "665449da361bc9e5e019771a",
    name: "Shortcut",
    url: "https://www.shortcut.com/pricing",
    userId: "user_2gmdnG0oIkmEwZLk1IhtJB6NIeI",
    categoryId: "664c8e6b3c7d5bc20ec88789",
  },
  {
    // id: "665845304cb631e91cb80326",
    name: "Animate style",
    url: "https://animate.style/#documentation",
    userId: "user_2giijZ1jRfOCbBKdO2sQPIUPeC4",
    categoryId: "665845094cb631e91cb80325",
  },
  {
    // id: "6658997573fd63f1af09e39f",
    name: "Form Saas",
    url: "https://www.saasui.design/application/makeforms",
    userId: "user_2gmdnG0oIkmEwZLk1IhtJB6NIeI",
    categoryId: "664c5ab3bcfb9f963de53511",
  },
  {
    // id: "66596cbdc545d184a53248bb",
    name: "CV Generator",
    url: "https://aiapply.co/resume-builder",
    userId: "user_2gmdnG0oIkmEwZLk1IhtJB6NIeI",
    categoryId: "664c8e6b3c7d5bc20ec88789",
  },

  {
    // id: "6659bc8a63eeb8c7fb832257",
    name: "Link Keeper",
    url: "https://link-keeper.vercel.app/",
    userId: "user_2giijZ1jRfOCbBKdO2sQPIUPeC4",
    categoryId: "664c8e6b3c7d5bc20ec88789",
  },
  {
    // id: "6659ce4dd92c7d165244f387",
    name: "Clone portfolio",
    url: "https://themejunction.net/html/gerold/demo/#",
    userId: "user_2giijZ1jRfOCbBKdO2sQPIUPeC4",
    categoryId: "664c8e6b3c7d5bc20ec88789",
  },
  {
    // id: "665e94f30af0a5eb2c9bb4eb",
    name: "Drag and Drop Kanban",
    url: "https://www.youtube.com/watch?v=RG-3R6Pu_Ik&t=2081s",
    userId: "user_2gmdnG0oIkmEwZLk1IhtJB6NIeI",
    categoryId: "664c8e6b3c7d5bc20ec88789",
  },
  {
    // id: "665ec1e6cc28ec3631ccdf92",
    name: "Personal Portfolio",
    url: "https://jamir-muhumuza.vercel.app",
    userId: "user_2hPBdPum7Z9zMY0FWQI6PcKpZZZ",
    categoryId: "664c5adebcfb9f963de53513",
  },
  {
    // id: "665fc2c451e79ac2a19131fd",
    name: "Mobile App ecommerce ui design",
    url: "https://dribbble.com/shots/20461079-Kopag-Mobile-POS-App",
    userId: "user_2gmdnG0oIkmEwZLk1IhtJB6NIeI",
    categoryId: "664c8e6b3c7d5bc20ec88789",
  },
  {
    // id: "665fffdc1d2d95eb9831e870",
    name: "shad components",
    url: "https://awesome-shadcn-ui.vercel.app/",
    userId: "user_2giijZ1jRfOCbBKdO2sQPIUPeC4",
    categoryId: "664ca65e3c7d5bc20ec8878b",
  },
  {
    // id: "66600527368eaf7b753c14d0",
    name: "coffee api",
    url: "https://coffee-recipes.onrender.com/",
    userId: "user_2giijZ1jRfOCbBKdO2sQPIUPeC4",
    categoryId: "664c5ab3bcfb9f963de53511",
  },
  {
    // id: "666005670e92aa2ada7bb11a",
    name: "Next Js Starter Template By Rasmic",
    url: "https://starter.rasmic.xyz/",
    userId: "user_2gmdnG0oIkmEwZLk1IhtJB6NIeI",
    categoryId: "664c5ab3bcfb9f963de53511",
  },
  {
    // id: "66600594368eaf7b753c14d1",
    name: "Shadcn Components",
    url: "https://github.com/birobirobiro/awesome-shadcn-ui?tab=readme-ov-file",
    userId: "user_2gmdnG0oIkmEwZLk1IhtJB6NIeI",
    categoryId: "664c5ab3bcfb9f963de53511",
  },
  {
    // id: "666005cc0e92aa2ada7bb11b",
    name: "Magic Ui",
    url: "https://magicui.design/",
    userId: "user_2gmdnG0oIkmEwZLk1IhtJB6NIeI",
    categoryId: "664c5ab3bcfb9f963de53511",
  },
  {
    // id: "666005e80e92aa2ada7bb11c",
    name: "Syntax UI",
    url: "https://syntaxui.com/",
    userId: "user_2gmdnG0oIkmEwZLk1IhtJB6NIeI",
    categoryId: "664c5ab3bcfb9f963de53511",
  },
  {
    // id: "66600cdfeda41bb1c0790512",
    name: "Rasmus Starter kit Github",
    url: "https://github.com/michaelshimeles/nextjs-starter-kit",
    userId: "user_2gmdnG0oIkmEwZLk1IhtJB6NIeI",
    categoryId: "664c5ab3bcfb9f963de53511",
  },
  {
    // id: "66600d658023636dab55a3fe",
    name: "Generate Landing Page",
    url: "https://www.passionfroot.me/rasmic",
    userId: "user_2gmdnG0oIkmEwZLk1IhtJB6NIeI",
    categoryId: "664c5ab3bcfb9f963de53511",
  },
  {
    // id: "66600e33eda41bb1c0790513",
    name: "Passion Froot",
    url: "https://www.passionfroot.me/",
    userId: "user_2gmdnG0oIkmEwZLk1IhtJB6NIeI",
    categoryId: "664c5ab3bcfb9f963de53511",
  },
  {
    // id: "66600f7a817b83173bc43ef5",
    name: "more components",
    url: "https://shadcnui-expansions.typeart.cc/docs/floating-label-input",
    userId: "user_2giijZ1jRfOCbBKdO2sQPIUPeC4",
    categoryId: "664c5ab3bcfb9f963de53511",
  },
  {
    // id: "666012cf8023636dab55a3ff",
    name: "step by step ",
    url: "https://shadcn-stepper.vercel.app/",
    userId: "user_2giijZ1jRfOCbBKdO2sQPIUPeC4",
    categoryId: "664c5ab3bcfb9f963de53511",
  },
  {
    // id: "6660177d2100c3b85e1796f8",
    name: "texts with framer",
    url: "https://variantvault.chrisabdo.dev/text-variants",
    userId: "user_2giijZ1jRfOCbBKdO2sQPIUPeC4",
    categoryId: "664c5ab3bcfb9f963de53511",
  },
  {
    // id: "66601c07ebde1987a1fdc371",
    name: "cv Forger",
    url: "https://www.cvforge.app/",
    userId: "user_2giijZ1jRfOCbBKdO2sQPIUPeC4",
    categoryId: "664c5adebcfb9f963de53513",
  },
  {
    // id: "6660727ee079d732cf33445e",
    name: "twitter",
    url: "https://greeninguganda.com/",
    userId: "user_2hSoIeoBlwFXbCUNjqFKmm2y8wz",
    categoryId: "664ca65e3c7d5bc20ec8878b",
  },
  {
    // id: "666168e2ce4d33550c6f9197",
    name: "Reference",
    url: "https://theonetechnologies.com/blog",
    userId: "user_2giijZ1jRfOCbBKdO2sQPIUPeC4",
    categoryId: "664c5ab3bcfb9f963de53511",
  },
  {
    // id: "6661b6dc2b7fa3dc3ccf4695",
    name: "locomotive",
    url: "https://locomotivemtl.github.io/locomotive-scroll/",
    userId: "user_2giijZ1jRfOCbBKdO2sQPIUPeC4",
    categoryId: "665845094cb631e91cb80325",
  },
  {
    // id: "6663d72191e966e66fe7739e",
    name: "Sst",
    url: "https://sst.dev/",
    userId: "user_2gmdnG0oIkmEwZLk1IhtJB6NIeI",
    categoryId: "664c8e6b3c7d5bc20ec88789",
  },
  {
    // id: "6663d75920f4f775758c3d88",
    name: "Coolify",
    url: "https://coolify.io/",
    userId: "user_2gmdnG0oIkmEwZLk1IhtJB6NIeI",
    categoryId: "664c8e6b3c7d5bc20ec88789",
  },
  {
    // id: "6663dc0309a4fe522f732186",
    name: "Hetzner",
    url: "https://www.hetzner.com/cloud/",
    userId: "user_2gmdnG0oIkmEwZLk1IhtJB6NIeI",
    categoryId: "664c8e6b3c7d5bc20ec88789",
  },
  {
    // id: "6663e53dcb37dd075a044551",
    name: "Cloud Hosting",
    url: "https://www.youtube.com/watch?v=SANSysQlS18",
    userId: "user_2gmdnG0oIkmEwZLk1IhtJB6NIeI",
    categoryId: "664c8e6b3c7d5bc20ec88789",
  },
  {
    // id: "6663e5635a58831c8e6f06bc",
    name: "Fireship Interview",
    url: "https://www.youtube.com/watch?v=QSqK3AWcmwU",
    userId: "user_2gmdnG0oIkmEwZLk1IhtJB6NIeI",
    categoryId: "664c8e6b3c7d5bc20ec88789",
  },
  {
    // id: "66657eeafe75c05c231ffc82",
    name: "Repaire templates",
    url: "https://autofix-templates.webflow.io/",
    userId: "user_2giijZ1jRfOCbBKdO2sQPIUPeC4",
    categoryId: "664c5ab3bcfb9f963de53511",
  },
];
export async function createNewLink(data: LinkValues) {
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
export async function createManyLinks() {
  try {
    for (const category of rawLinks) {
      await createNewLink(category);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getLinks() {
  // const id = "user_2gmdnG0oIkmEwZLk1IhtJB6NIeI";
  const { userId }: { userId: string | null } = auth();
  // console.log(userId)
  if (!userId) {
    throw new Error("User is not authenticated");
  }

  try {
    const links = await db.link.findMany({
      where: { userId },
      include: { linkCategory: true },
      orderBy: { createdAt: "desc" },
    });

    return links;
  } catch (error) {
    console.error(error);
  }
}

// export async function getLinks() {
//   try {
//     const links = await db.link.findMany();
//     console.log(links);
//     return links;
//   } catch (error) {
//     console.log(error);
//   }
// }

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

// async function fetchLinks() {
//   const links = await db.link.findMany({
//     take: 100,
//     skip: 0,
//     select: {
//       id: true,
//       name: true,
//       url: true,
//       userId: true,
//       categoryId: true,
//       linkCategory: {
//         select: {
//           id: true,
//           name: true,
//         },
//       },
//       createdAt: true,
//       updatedAt: true,
//     },
//   });
//   return links;
// }

// fetchLinks()
//   .then((links) => console.log(links))
//   .catch((error) => console.error("Error fetching links:", error))
//   .finally(async () => {
//     // const disconectedLinks = await db.$disconnect();
//     // console.log(` the disconected links${disconectedLinks}`);
//   });
