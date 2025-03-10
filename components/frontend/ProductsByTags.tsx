"use client"
import React, { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabase/client'
import { Product } from '@/types/global'
import { ProductBox } from './ProductBox'
import { priceFormatter } from '@/lib/utils'

const ProductsByTags = ({ tags, title }: {tags: string, title: string}) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const handleFetchProductsByTags = async () => {
            setIsLoading(true);
            try {
                // I want to retrieve this tag "Men's Sneakers" but the Women's Sneakers are showing up -- fix it
                const { data, error } = await supabase.from("product").select("*, productImages(product_id, url)").ilike("tags", `%${tags}%`);

                if (error) {
                    console.log("Failed to products by tags", error);
                    return;
                };

                console.log({data})
                setProducts(data);
            } catch (error) {
                console.log("Failed to load products by tag", error);
                return;
            } finally {
                setIsLoading(false);
            }
        };
        handleFetchProductsByTags();
    }, [tags])

    return (
        <div className='my-10 py-10 bg-white w-full'>
            <h3 className='font-medium text-center pb-4 text-2xl'>{title}</h3>
            {isLoading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
                    {[...Array(4)].map((_, index) => (
                        <div className="w-full h-[250px] rounded-md shadow-md bg-gray-200 animate-pulse" key={index}></div>
                    ))}
                </div>
            ) : (
                products.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
                        {products.map(({ id, productImages, name, price, stock_units }) => {
                            const firstImage = productImages?.[0]?.url ?? "/placeholder.jpeg";

                            const formattedPrice = priceFormatter(price)

                            return (
                                <ProductBox
                                    key={id}
                                    id={id}
                                    stock_units={stock_units ?? 0}
                                    name={name}
                                    formattedPrice={formattedPrice}
                                    firstImage={firstImage}
                                    className='px-2'
                                />
                            )
                        })}
                    </div>
                )
            )}
        </div>
    )
}

export default ProductsByTags