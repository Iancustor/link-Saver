"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Cloud, Edit2, EllipsisVertical, LogOut, Trash2 } from "lucide-react";
import Link from "next/link";
import DeleteBtn from "./DeleteBtn";
import CopyBtn from "./CopyBtn";

export function PopOver({ id }: { id: string }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="absolute bg-blue-100 py-2 px-2  rounded-full top-5 right-8 "
        >
          <EllipsisVertical />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle> Link Options</SheetTitle>
          <div className="flex flex-col gap-4 mt-2">
            <div className="flex gap-3 items-center">
              <Edit2 className="mr-2 h-4 w-4 font-bold" />
              <Link href={`/editLink/${id}`} className="font-bold">
                Edit
              </Link>
            </div>
            <div className="flex gap-3 items-center font-bold">
              <Trash2 className="mr-2 h-4 w-4 font-bold text-red-600" />
              <DeleteBtn id={id} />
            </div>
            <div className="flex gap-3 items-center font-bold">
              <Cloud className="mr-2 h-4 w-4 font-bold" />
              <CopyBtn id={id}/>
            </div>
            <div aria-disabled className="flex gap-3 items-center  ">
              <LogOut className="mr-2 h-4 w-4 " />
              <p>Share</p>
            </div>
          </div>
        </SheetHeader>
        <SheetFooter className="font-semibold mt-2">
          {" "}
          <Link
            className="text-sm text-muted-foreground hover:text-blue-600 text-black font-semibold"
            href={"https://custordev.vercel.app/"}
          >
            Developed with 💖 by CustorDev{" "}
          </Link>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
