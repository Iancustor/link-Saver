"use client";
import { findUniqueLink } from "@/actions/links";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

function CopyBtn({ id }: { id: string }) {
  const [copied, setCopied] = useState(false);
  const router = useRouter();
  // const singleLink = findUniqueLink(id);
  // console.log(singleLink);
  function CopyLink() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(id).then(
        () => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
          toast.success("Link Copied successfully");
          router.refresh();
        },
        (error) => {
          console.error("Copy failed", error);
        }
      );
    } else {
      alert("Clipboard API not supported in your browser.");
    }
  }
  return (
    <div>
      <button onClick={CopyLink}>Copy</button>
    </div>
  );
}

export default CopyBtn;
