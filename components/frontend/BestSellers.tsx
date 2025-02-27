"use client"

import React, { useEffect } from 'react'
import { useProducts } from '@/providers/context/ProductsContext'
import { priceFormatter } from '@/lib/utils';
import { ProductBox } from './ProductBox';


const BestSellers = () => {
    const { isLoadingBestSellers, bestSellers, handleFetchBestSellers } = useProducts();


    useEffect(() => {
        handleFetchBestSellers();
    }, [handleFetchBestSellers]);

    return (
        <div
            className='w-full my-10 md:px-10'
        >
            <h2 className='font-medium text-center pb-4 text-2xl'>Best Sellers</h2>
            {isLoadingBestSellers ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
                    {[...Array(4)].map((_, index) => (
                        <div className="w-full h-[250px] rounded-md shadow-md bg-gray-200 animate-pulse" key={index}></div>
                    ))}
                </div>
            ) : (
                bestSellers.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
                        {bestSellers.map(({ id, productImages, name, price, stock_units }) => {
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
                                />
                            )
                        })}
                    </div>
                )
            )}
        </div>
    )
}

export default BestSellers