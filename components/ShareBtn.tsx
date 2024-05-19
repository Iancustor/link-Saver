"use client";
import { findUniqueLink } from "@/actions/links";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface ShareButtonProps {
  url: string;
  title?: string;
  text?: string;
}

const ShareBtn = ({
  id,
  url,
  title,
  text,
}: { id: string } & ShareButtonProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [singleLink, setSingleLink] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLink() {
      try {
        const link = await findUniqueLink(id);
        if (link && link.url) {
          setSingleLink(link.url);
        } else {
          console.error("Link not found or URL is missing");
        }
      } catch (error) {
        console.error("Failed to fetch link", error);
      } finally {
        setLoading(false);
      }
    }
    fetchLink();
  }, [id]);

  function shareLink() {
    if (navigator.share) {
      navigator
        .share({
          title: title || document.title,
          text: text || "",
          url: singleLink || url,
        })
        .then(() => {
          console.log("Shared successfully");
        })
        .catch((error) => {
          console.error("Share failed", error);
        });
    } else {
      alert("Web Share API is not supported in your browser.");
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button onClick={shareLink}>Share</button>
    </div>
  );
};

export default ShareBtn;
