"use client";

import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";

const NavbarCart = () => {
  const { cartTotalQty } = useCart();

  return (
    <Link href="/cart" className="relative">
      <div>
        <AiOutlineShoppingCart />
      </div>
      <span className="absolute -top-2 -right-2 bg-slate-700 text-white h-4 w-4 rounded-full flex items-center justify-center text-xs">
        {cartTotalQty}
      </span>
    </Link>
  );
};

export default NavbarCart;
