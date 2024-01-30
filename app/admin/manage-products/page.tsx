// import { getCurrentUser } from "@/actions/getCurrentUser";
// import getProducts from "@/actions/getProducts";
// import NullData from "@/components/null-data";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import { FaEdit, FaTrash } from "react-icons/fa";

// const ManageProducts = async () => {
//   const products = await getProducts({ category: null });
//   const currentUser = await getCurrentUser();

//   if (!currentUser || currentUser.role !== "ADMIN") {
//     return <NullData title="Ops! Access denied!" />;
//   }

//   return (
//     <div className="mx-auto max-w-screen-sm border mt-20">
//       <div className="bg-slate-100 grid grid-cols-3">
//         <div className="w-full text-center">Name</div>
//         <div className="w-full text-center">Image</div>
//         <div className="w-full text-center">Actions</div>
//       </div>
//       {products.map((product) => (
//         <div key={product.id} className="grid grid-cols-3">
//           <div className="border-r border-t w-full flex items-center justify-center">
//             {product.name}
//           </div>
//           <div className="border-t text-center flex items-center justify-center relative min-h-20">
//             <Image
//               src={product.images[0].image}
//               alt=""
//               fill
//               className="object-cover absolute"
//             />
//           </div>
//           <div className="flex items-center justify-center gap-2">
//             <Button>
//               <FaTrash />
//             </Button>
//             <Button>
//               <FaEdit />
//             </Button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ManageProducts;

import getProducts from "@/actions/getProducts";
import { TableProduct, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<TableProduct[]> {
  // Fetch data from your API here.
  const products = await getProducts({ category: null });
  
  return products;
//   [
//     {
//       id: products.id,
//       name: "",
//       inStock: "yes",
//       category: "m@example.com",
//     },
//   ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="max-w-screen-lg mx-auto py-10">
        <h2 className="text-xl text-center mb-4">Manage products</h2>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
