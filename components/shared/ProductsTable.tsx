"use client"

import React, { useCallback, useEffect, useState } from 'react'
import { DataTable } from '@/app/(admin)/admin/products/_components/data-table'
import { Product } from '@/types/global'
import toast from 'react-hot-toast';
import { toastErrorOptions } from '@/constants';
import { supabase } from '@/utils/supabase/client';
import { columns } from '@/app/(admin)/admin/products/_components/columns';

const ProductsTable = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchProducts = useCallback(async() => {
        setIsLoading(true);

        try {
           const { data, error } = await supabase.from("product").select("*, productImages(product_id, url)");

            if (error) {
                throw error;
                toast.error("Failed to fetch products", toastErrorOptions);
                return;
            }

            setProducts(data || []);
        } catch (error) {
            console.log("Something went wrong", error);
            toast.error("Something went wrong", toastErrorOptions);
        } finally {
            setIsLoading(false);
        }
    }, [])

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    if (isLoading) {
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