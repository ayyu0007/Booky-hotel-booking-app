"use client";

import Link from "next/link";
import { redirect, usePathname } from "next/navigation";

const links = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Restaurant",
    href: "/restaurant",
  },
  {
    name: "Pool",
    href: "/pool",
  },
  {
    name: "Offers",
    href: "/best-deals",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

const Nav = ({ isUserAuthenticated }: { isUserAuthenticated: boolean }) => {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex flex-col lg:flex-row gap-6">
        {links.map((link, index) => (
          <li key={index}>
            <Link href={link.href} className="font-bold text-[13px] uppercase tracking-[3px] hover:text-accent-hover transition-all">
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
      {/* Redirecting */}
      {!isUserAuthenticated && pathname === "/dashboard" && redirect("/")}
    </nav>
  );
};

export default Nav;
