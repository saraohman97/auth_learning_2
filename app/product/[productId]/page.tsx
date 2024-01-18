"use client";

import ListRating from "@/components/products/list-rating";
import ProductImage from "@/components/products/product-image";
import SetColor from "@/components/products/set-color";
import SetQuantity from "@/components/products/set-quantity";
import { Button } from "@/components/ui/button";
import { product } from "@/utils/product";
import { useCallback, useState } from "react";

interface IParams {
  productId?: string;
}

const Horizontal = () => {
  return <hr className="w-[300px] my-2" />;
};

export type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedImg: selectedImgType;
  quantity: number;
  price: number;
};
export type selectedImgType = {
  color: string;
  colorCode: string;
  image: string;
};

const ProductPage = ({ params }: { params: IParams }) => {
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImg: { ...product.images[0] },
    quantity: 1,
    price: product.price,
  });

  const handleColorSelect = useCallback(
    (value: selectedImgType) => {
      setCartProduct((prev) => {
        return { ...prev, selectedImg: value };
      });
    },
    [setCartProduct]
    // [cartProduct.selectedImg]
  );

  const handleQtyIncrease = useCallback(() => {
    if (cartProduct.quantity === 50) return;

    setCartProduct((prev) => {
      return { ...prev, quantity: prev.quantity++ };
    });
  }, [setCartProduct, cartProduct.quantity]);

  const handleQtyDecrease = useCallback(() => {
    if (cartProduct.quantity === 1) return;

    setCartProduct((prev) => {
      return { ...prev, quantity: prev.quantity-- };
    });
  }, [setCartProduct, cartProduct.quantity]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 p-10">
        <ProductImage
          cartProduct={cartProduct}
          product={product}
          handleColorSelect={handleColorSelect}
        />

        <div className="flex flex-col gap-1 text-slate-500 text-sm">
          <h2 className="text-3xl font-medium text-slate-700">
            {product.name}
          </h2>
          <div>{product.reviews.length} reviews</div>
          <Horizontal />
          <div className="text-justify">{product.description}</div>
          <Horizontal />
          <div>
            <span className="font-semibold">CATEGORY: </span>
            {product.category}
          </div>
          <div>
            <span className="font-semibold">BRAND: </span>
            {product.brand}
          </div>
          <div className={product.inStock ? "text-teal-400" : "text-rose-400"}>
            {product.inStock ? "In stock" : "Out of stock"}
          </div>
          <Horizontal />
          <SetColor
            cartProduct={cartProduct}
            images={product.images}
            handleColorSelect={handleColorSelect}
          />
          <Horizontal />
          <SetQuantity
            cartProduct={cartProduct}
            handleQtyIncrease={handleQtyIncrease}
            handleQtyDecrease={handleQtyDecrease}
          />
          <Horizontal />
          <Button>ADD TO CART</Button>
        </div>
      </div>
      <div className="flex flex-col mt-20 gap-4 p-10">
        <div>Add rating</div>
        <ListRating product={product} />
      </div>
    </>
  );
};

export default ProductPage;
