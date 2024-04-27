import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

const links = [
  { name: "Journals", href: "/journal" },
  { name: "History", href: "/history" },
];

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="h-screen w-screen grid grid-cols-4">
      <aside className="col-span-1 border-r border-black/10">
        <div className="px-4 my-4">
          <span className="text-3xl">MOOD</span>
        </div>
        <div>
          <ul className="px-4">
            {links.map((link) => (
              <li key={link.name} className="text-xl my-4">
                <Link href={link.href}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <div className="col-span-3 h-full">
        <header className="h-[60px] border-b border-black/10">
          <nav className="px-4 h-full">
            <div className="flex items-center justify-end h-full">
              <UserButton afterSignOutUrl="/" />
            </div>
          </nav>
        </header>
        <div className="h-[calc(100vh-60px)] overflow-auto">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
