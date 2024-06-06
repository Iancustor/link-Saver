"use client";

import { findUniqueLink } from "@/actions/links";
import React, { useEffect, useState } from "react";

// Interface for the props expected by the ShareBtn component
interface ShareButtonProps {
  url?: string;
  name?: string;
}

interface ShareBtnProps extends ShareButtonProps {
  id: string;
}

const ShareBtn: React.FC<ShareBtnProps> = ({ id, url }) => {
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

  const shareLink = () => {
    if (loading) {
      return <div>Loading...</div>;
    }

    if (navigator.share) {
      navigator
        .share({
          url: singleLink || url || window.location.href, // Fallback to current URL if neither singleLink nor url is provided
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
  };

  return (
    <div>
      <button onClick={shareLink}>Share</button>
    </div>
  );
};

export default ShareBtn;
