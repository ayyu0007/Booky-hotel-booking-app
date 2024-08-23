"use client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import Link from "next/link";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs"; 

import { FaCalendarCheck, FaHome, FaSignOutAlt } from "react-icons/fa";
const Dropdown = ({ user }: { user: any }) => {
 
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-2 cursor-pointer">
          {/* avtar */}
          <Avatar>
            <AvatarImage src={user.picture} />
            <AvatarFallback className="bg-red-500 text-white">{`${user.given_name[0]} ${user.family_name[0]}`}</AvatarFallback>
          </Avatar>
          {/* name and Email */}
          <div>
            <div className="flex gap-1 font-bold">
              <p>{user.given_name}</p>
              <p>{user.family_name}</p>
            </div>
            <p className="font-semibold text-sm">{user.email}</p>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-72 mt-4 p-4 flex flex-col gap-2 "
        align="start"
      >
        <DropdownMenuLabel className="text-base">My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="flex flex-col gap-2">
          <Link href="/">
            <DropdownMenuItem>
              Homepage
              <DropdownMenuShortcut className="text-red-500 text-lg">
                <FaHome />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <Link href="/dashboard">
            <DropdownMenuItem>
              My Bookings
              <DropdownMenuShortcut className="text-red-500 text-lg">
                <FaCalendarCheck />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <LogoutLink>
          <DropdownMenuItem>
            Log Out
            <DropdownMenuShortcut className="text-lg text-red-500">
              <FaSignOutAlt/>
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </LogoutLink>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
