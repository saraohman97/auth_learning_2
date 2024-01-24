'use client'

import Link from "next/link";
import AdminNavItem from "./admin-nav-item";
import { usePathname } from "next/navigation";
import {MdDashboard, MdDns, MdFormatListNumbered, MdLibraryAdd} from 'react-icons/md'

const AdminNavbar = () => {
  const pathname = usePathname();
  return (
    <div className="w-full shadow-sm top-20 border-b pt-4">
      <div className="flex flex-row items-center justify-between md:justify-center gap-8 md:gap-12 flex-nowrap">
        <Link href="/admin">
          <AdminNavItem
            label="Summary"
            icon={MdDashboard}
            selected={pathname === "/admin"}
          />
        </Link>
        <Link href="/admin/add-products">
          <AdminNavItem
            label="Add Products"
            icon={MdLibraryAdd}
            selected={pathname === "/admin/add-products"}
          />
        </Link>
        <Link href="/admin/manage-products">
          <AdminNavItem
            label="Manage products"
            icon={MdDns}
            selected={pathname === "/admin/manage-products"}
          />
        </Link>
        <Link href="/admin/manage-orders">
          <AdminNavItem
            label="Manage orders"
            icon={MdFormatListNumbered}
            selected={pathname === "/admin/manage-orders"}
          />
        </Link>
      </div>
    </div>
  );
};

export default AdminNavbar;
