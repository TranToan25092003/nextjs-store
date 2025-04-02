"use client";
import { adminLinks } from "@/utils/links";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside>
      {adminLinks.map(({ href, label }) => {
        const activePage = pathname === href;

        const variant = activePage ? "default" : "ghost";

        return (
          <Button
            asChild
            key={href}
            className="w-full mb-2 capitalize font-normal"
            variant={variant}
          >
            <Link href={href}>{label}</Link>
          </Button>
        );
      })}
    </aside>
  );
};

export default Sidebar;
