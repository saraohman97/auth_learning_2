import getProducts from "@/actions/getProducts";
import { TableProduct, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<TableProduct[]> {
  // Fetch data from your API here.
  const products = await getProducts({ category: null });

  return products;
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="max-w-screen-lg mx-auto py-10">
      <h2 className="text-xl text-center mb-4">Manage products</h2>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
