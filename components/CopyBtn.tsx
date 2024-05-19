"use client";
import { findUniqueLink } from "@/actions/links"; // Ensure this is correctly imported
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

function CopyBtn({ id }: { id: string }) {
  const [copied, setCopied] = useState(false);
  const [singleLink, setSingleLink] = useState<string | null>(null); // Simplified to string or null
  const [loading, setLoading] = useState(true); // Add loading state
  const router = useRouter();

  useEffect(() => {
    async function fetchLink() {
      try {
        // console.log(`Fetching link for id: ${id}`);
        const link = await findUniqueLink(id);
        if (link && link.url) {
          // console.log("Fetched link:", link);
          setSingleLink(link.url);
        } else {
<<<<<<< HEAD
          console.error("Link not found or URL is missing");
=======
          // console.error("Link not found or URL is missing");
>>>>>>> b7a2a31ce2a9d99f6967abaca47be3554e9f0451
          // toast.error("Link not found or URL is missing");
        }
      } catch (error) {
        console.error("Failed to fetch link", error);
        // toast.error("Failed to fetch link");
        
      } finally {
        setLoading(false);
      }
    }
    fetchLink();
  }, [id]);

  function CopyLink() {
    if (singleLink) {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(singleLink).then(
          () => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
            toast.success("Link copied successfully");
            router.refresh();
          },
          (error) => {
            console.error("Copy failed", error);
            toast.error("Copy failed");
          }
        );
      }
<<<<<<< HEAD
    } else {
      // toast.error("URL not available to copy");
    }
=======
    } 
>>>>>>> b7a2a31ce2a9d99f6967abaca47be3554e9f0451
  }

  return (
    <div>
      <button onClick={CopyLink}>Copy</button>
    </div>
  );
}

export default CopyBtn;
