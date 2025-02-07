"use client";

import React, { useCallback, useEffect, useState } from 'react'
import { supabase } from '@/utils/supabase/client'
import { Product } from '@/types/global';
import Image from 'next/image';
import { Button } from '../ui/button';


const Herobox = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [slidesToShow, setSlidesToShow] = useState<number>(1);

    const fetchProducts = useCallback(async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase.from("product").select("*, productImages(product_id, url)");

            if (error) throw error;

            console.log(data);
            setProducts(data || []);

        } catch (error) {
            console.log("Error fetching products", error)
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const goToNextSlide = () => {
        setCurrentIndex(prevSlide => (prevSlide + 1) % (products.length - slidesToShow));
    }

    const goToPreviousSlide = () => {
        setCurrentIndex(
            (prevSlide) => prevSlide === 0 ? products.length - slidesToShow : prevSlide - 1
        );
    }

    useEffect(() => {
        // Auto slide every 5 seconds
        const interval = setInterval(goToNextSlide, 5000);
        return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [products.length, slidesToShow]);


    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setSlidesToShow(3);
            } else if (window.innerWidth >= 768) {
                setSlidesToShow(2);
            } else {
                setSlidesToShow(1);
            }
        }
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [])

    if (isLoading) {
        return (
            <div className="w-full flex gap-4 h-[500px] p-4">
                {Array.from({ length: slidesToShow }).map((_, index) => (
                    <div key={index} className="bg-gray-300 h-full flex-1 rounded-md shadow-md animate-pulse px-4 flex justify-center items-center flex-col gap-10">
                        <div className="w-full h-[50px] shadow-lg animate-pulse mb-2 bg-offwhite rounded-sm"></div>
                        <div className="w-full h-[50px] shadow-lg animate-pulse mb-2 bg-offwhite rounded-sm"></div>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div
            className='flex-1 relative overflow-hidden h-[500px]'>
            <div className="flex transition-transform duration-500 ease-in-out h-full"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {products.map(({ id, productImages, name }) => {
                    const firstImage = productImages?.[0]?.url ?? "/placeholder.jpeg";

                    return (
                        <div key={id} className="w-full flex-shrink-0 flex justify-center items-center relative mr-4 rounded-md overflow-hidden"
                            style={{width: `${100 / slidesToShow}%`}}
                        >
                            <Image
                                key={firstImage}
                                src={firstImage}
                                alt='product image'
                                width={800}
                                height={500}
                                className='w-full h-full object-cover'
                            />
                            {/* center this */}
                            <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
                                <h2 className='text-xl font-bold mt-2'>{name}
                                </h2>
                                <Button className='mt-2'>Buy Product</Button>
                            </div>
                        </div>
                    )
                })}
            </div>

            <button
                type='button'
                onClick={goToPreviousSlide}
                className='absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full'
            >
                &lt;
            </button>
            <button
                type='button'
                onClick={goToNextSlide}
                className='absolute right-0 top-1/2 -translate-y-1/2 bg-gray-800 text-white rounded-full p-2'
            >
                &gt;
            </button>
        </div>
    )
}

export default Herobox