"use client"

import React from 'react'
import { DataTable } from '@/app/(admin)/admin/products/_components/data-table'
import { columns } from '@/app/(admin)/admin/products/_components/columns';
import { useProducts } from '@/providers/context/ProductsContext';


const ProductsTable = () => {
    const { products, isProductsLoading } = useProducts();

    if (isProductsLoading) {
        <div className="w-full">
            Loading...
        </div>
    }
    return (
        <div>
            <DataTable columns={columns} data={products} />
        </div>
    )
}

export default ProductsTable