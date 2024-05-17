"use client";
import { deleteLink } from "@/actions/links";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function DeleteBtn({ id }: { id: string }) {
  console.log(id);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const router = useRouter();

  async function handleDelete(deleteId: string) {
    console.log(deleteId);
    setDeleteLoading(true);
    await deleteLink(deleteId);
    // location.reload();
    router.refresh();
    setDeleteLoading(false);
  }

  return (
    <div>
      <button
        className="flex items-center gap-3"
        onClick={() => handleDelete(id)}
      >
        Delete
        {deleteLoading && <Loader className="size-3 animate-spin" />}
      </button>
    </div>
  );
}

export default DeleteBtn;
