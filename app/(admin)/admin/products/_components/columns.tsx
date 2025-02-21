"use client"

import { Product } from "@/types/global"
import { ColumnDef } from "@tanstack/react-table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Copy, Edit, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import DeleteProduct from "./DeleteProduct";


export const columns: ColumnDef<Product>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: "Product Name",
        cell: ({ row }) => {
            const product = row.original;
            const image_url = product.productImages?.[0]?.url ?? "/placeholder.jpeg";

            return (
                <div className="flex items-center space-x-2">
                    {image_url && (
                        <Image
                            src={image_url}
                            alt="product image"
                            width={50} height={50}
                            className="object-cover rounded-md"
                        />
                    )}
                    <span>{product.name}</span>
                </div>
            )
        }
    },
    {
        accessorKey: "category",
        header: ({ column }) => {
            return (
                <Button
                    className="flex justify-start items-center"
                    variant={"ghost"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Category
                    <ArrowUpDown className="mr-2 w-4 h-4" />
                </Button>
            )
        }
    },
    {
        accessorKey: "stock_units",
        header: ({ column }) => {
            return (
                <Button
                    className="flex justify-start items-center"
                    variant={"ghost"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    <span>Stock</span>
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        }
    },
    {
        accessorKey: "price",
        header: ({ column }) => {
            return (
                <Button
                    className="flex justify-start items-center"
                    variant={"ghost"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    <span>Price</span>
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const price = parseFloat(row.getValue("price"));
            const formattedPrice = new Intl.NumberFormat("en-US", {
                currency: "UGX",
                style: "currency",
                minimumFractionDigits: 0
            }).format(price);
            return <div className="">{formattedPrice}</div>
        }
    },
    {
        accessorKey: "created_at",
        header: ({ column }) => {
            return (
                <Button
                    className="flex justify-start items-center"
                    variant={"ghost"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    <span>Date of Creation</span>
                    <ArrowUpDown className="ml-2 w-4 h-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const rawDate = new Date(row.getValue("created_at"));
            const formattedDate = rawDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric"
            });
            if (!rawDate) {
                return <span>-</span>
            }
            return (
                <div className="">
                    {formattedDate}
                </div>
            )
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const product = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="px-2" align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(product.id)}
                        >
                            <Button className="w-full" variant={"secondary"}>
                                <Copy />
                                <span>Copy product ID</span>
                            </Button>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="mt-2" asChild>
                            <Button asChild className="flex justify-start">
                                <Link
                                    href={`/admin/products/edit/${product.id}`}
                                    className="flex justify-start"
                                >
                                    <Edit />
                                    <span>Edit Product</span>
                                </Link>
                            </Button>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="mt-2" asChild>
                            <DeleteProduct productId={product.id} />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
