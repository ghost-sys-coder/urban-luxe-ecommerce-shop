"use client"

import React, {useEffect} from 'react'
import { DataTable } from '@/app/(admin)/admin/products/_components/data-table'
import { columns } from '@/app/(admin)/admin/products/_components/columns';
import { useProducts } from '@/providers/context/ProductsContext';


const ProductsTable = () => {
    const { products, isProductsLoading, fetchProducts } = useProducts();

    useEffect(() => {
        fetchProducts()
    }, [fetchProducts])

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