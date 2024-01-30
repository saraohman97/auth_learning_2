import getProducts, { IProductParams } from "@/actions/getProducts";
import NullData from "@/components/null-data";
import ProductCard from "@/components/products/product-card";
import { truncateText } from "@/utils/truncate-text";

interface HomeProps {
  searchParams: IProductParams
}

export default async function Home({searchParams}: HomeProps) {
  const products = await getProducts(searchParams)

  if(products.length === 0) {
    return <NullData title="There is no products available. " />
  }

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
