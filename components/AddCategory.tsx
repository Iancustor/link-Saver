import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CategoryForm from "@/app/addCategory/page";

export function AddCategory() {
  return (
    <div className="">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="dark:text-slate-100">Add Category</Button>
        </DialogTrigger>
        <DialogContent>
          <CategoryForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}
