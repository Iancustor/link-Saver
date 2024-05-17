import {
  Cloud,
  CreditCard,
  Edit,
  Edit2,
  EllipsisVertical,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  Trash,
  Trash2,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteBtn from "./DeleteBtn";
import { getLinks } from "@/actions/links";
import Link from "next/link";
import EditBtn from "./EditBtn";

export async function Dropdown({ id }: { id: string }) {
  const links = await getLinks();
  // const id =links?.map((link)=>link.id)
  // console.log(id);
  return (
    <section>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="absolute bg-blue-100 py-2 px-2  rounded-full top-5 right-8 "
          >
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Edit2 className="mr-2 h-4 w-4" />
            <EditBtn />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Trash2 className="mr-2 h-4 w-4" />
            <DeleteBtn id={id} />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Cloud className="mr-2 h-4 w-4" />
            <button>Copy</button>
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <LogOut className="mr-2 h-4 w-4" />
            <button>Share</button>
            <DropdownMenuShortcut></DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* ))} */}
    </section>
  );
}
