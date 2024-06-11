"use client";
import { createManyLinks } from "@/actions/links";
import React from "react";

export default function CreateButtton() {
  async function createMany() {
    try {
      const createdLinks = await createManyLinks();
      console.log(`createdlinks ${createdLinks}`);
      console.log("clicked");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <button className="" onClick={createMany}>
      Create Many
    </button>
  );
}
