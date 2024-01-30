'use client'

import {TableProduct} from './columns'
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCallback } from "react";
import { toast } from "react-toastify";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { useRouter } from "next/navigation";
import axios from "axios";
import firebaseApp from '@/lib/firebase'

interface CellActionProps {
    data: TableProduct;
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
    const storage = getStorage(firebaseApp);
    const router = useRouter();
  
    const handleDelete = useCallback(async (id: string) => {
      toast("Deleting product, please wait!");
  
    //   const handleImageDelete = async () => {
    //     try {
    //       for (const item of images) {
    //         if (item.image) {
    //           const imageRef = ref(storage, item.image);
    //           await deleteObject(imageRef);
    //           console.log("Image deleted", item.image);
    //         }
    //       }
    //     } catch (error) {
    //       return console.log("Deleting images error", error);
    //     }
    //   };
    //   await handleImageDelete();
  
      axios.delete(`/api/product/${id}`)
      .then((res) => {
        toast.success("Product status changed");
        router.refresh;
      })
      .catch ((error) => {
          toast.error('Failed to delete product')
          console.log(error)
      })
    }, [router.refresh, storage]);


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(data.id)}
        >
          Copy product ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleDelete(data.id)}>Delete product</DropdownMenuItem>
        <DropdownMenuItem>Edit product</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
 
export default CellAction;