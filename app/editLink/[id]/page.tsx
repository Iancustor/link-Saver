import { findUniqueLink } from "@/actions/links";
import EditLink from "@/components/Edit";
import React from "react";

export default async function Page({ params: { id } }: any) {
  const singleLink = await findUniqueLink(id);

  return (
    <div>
      <EditLink singleLink={singleLink} />
    </div>
  );
}
