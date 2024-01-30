"use client"

import { ColumnDef } from "@tanstack/react-table"



// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type TableProduct = {
  id: string
  name: string
  category: string
  inStock: boolean
}

export const columns: ColumnDef<TableProduct>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "category",
        header: "Category",
    },
    {
      accessorKey: "inStock",
      header: "In stock",
    },
]
