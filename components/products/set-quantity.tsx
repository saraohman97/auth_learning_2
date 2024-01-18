"use client";

import { CartProductType } from "@/app/product/[productId]/page";

interface SetQuantityProps {
  cartCounter?: boolean;
  cartProduct: CartProductType;
  handleQtyIncrease: () => void;
  handleQtyDecrease: () => void;
}

const btnStyles = 'border border-slate-300 px-2 rounded'

const SetQuantity: React.FC<SetQuantityProps> = ({
  cartCounter,
  cartProduct,
  handleQtyIncrease,
  handleQtyDecrease,
}) => {
  return (
    <div className="flex gap-8 items-center">
      {cartCounter ? null : <div className="font-semibold">QUANTITY: </div>}
      <div className="flex gap-4 items-center text-base">
        <button className={btnStyles} onClick={handleQtyDecrease}>-</button>
        <button className={btnStyles}>{cartProduct.quantity}</button>
        <button className={btnStyles} onClick={handleQtyIncrease}>+</button>
      </div>
    </div>
  );
};

export default SetQuantity;
