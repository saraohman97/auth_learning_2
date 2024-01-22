"use client";

import ItemContent from "@/components/products/item-content";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { SafeUser } from "@/types";
import { formatPrice } from "@/utils/format-price";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AiOutlineArrowLeft } from "react-icons/ai";

interface CartPageProps {
  currentUser: SafeUser | null;
}

const CartPage: React.FC<CartPageProps> = ({ currentUser }) => {
  const { cartProducts, handleClearCart, cartTotalAmount } = useCart();
  const router = useRouter();

  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="flex flex-col items-center mt-10">
        <div className="text-2xl">Your cart is empty</div>
        <div>
          <Link
            href="/"
            className="text-slate-500 flex items-center gap-1 mt-2"
          >
            <AiOutlineArrowLeft />
            <span>Start shopping</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-10">
      <h2 className="text-2xl font-semibold text-center mb-8">Shopping cart</h2>
      <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center">
        <div className="col-span-2 justify-self-start">PRODUCT</div>
        <div className="justify-self-center">PRICE</div>
        <div className="justify-self-center">QUANTITY</div>
        <div className="justify-self-end">TOTAL</div>
      </div>
      <div>
        {cartProducts &&
          cartProducts.map((item) => {
            return <ItemContent item={item} key={item.id} />;
          })}
      </div>
      <div className="border-t border-slate-200 py-4 flex justify-between gap-4">
        <div>
          <Button variant="outline" onClick={() => handleClearCart()}>
            Clear cart
          </Button>
        </div>
        <div className="text-sm flex flex-col gap-1 items-start">
          <div className="flex justify-between w-4 text-base font-semibold gap-2">
            <span>Subtotal: </span>
            <span>{formatPrice(cartTotalAmount)}</span>
          </div>
          <p className="text-slate-500">
            Taxes and shipping calculated at checkout.
          </p>
          <Button
            onClick={() => {
              currentUser ? router.push("/checkout") : router.push("/login");
            }}
          >
            {currentUser ? "Checkout" : "Login to checkout"}
          </Button>
          <Link
            href="/"
            className="text-slate-500 flex items-center gap-1 mt-2"
          >
            <AiOutlineArrowLeft />
            <span>Continue shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
