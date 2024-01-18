import ProductCard from "@/components/products/product-card";
import { products } from "@/utils/products";
import { truncateText } from "@/utils/truncate-text";

export default function Home() {
  return (
    <div>
      <div className="flex items-center justify-center w-full py-32 bg-rose-100 text-3xl font-bold mb-20">
        Banner
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 m-10">
        {products.map((product: any) => {
          return <ProductCard data={product} key={product.id} />
        })}
      </div>
    </div>
  );
}
