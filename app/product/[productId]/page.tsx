import getProductById from "@/actions/getProductById";
import NullData from "@/components/null-data";
import ProductDetails from "./(components)/product-details";

interface IParams {
  productId?: string;
}

const ProductPage = async ({ params }: { params: IParams }) => {

  const product = await getProductById(params);

  if (!product) return <NullData title="There is no product" />;

  return (
    <>
      <ProductDetails product={product} />
    </>
  );
};

export default ProductPage;
