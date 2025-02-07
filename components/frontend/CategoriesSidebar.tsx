"use client";

import React, { useCallback, useEffect, useState } from 'react'
import { supabase } from '@/utils/supabase/client';
import { Button } from '../ui/button';
import { Category } from '@/types/global';

const CategoriesSidebar = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchSidebarCategories = useCallback(async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase.from("category").select("*");

            if (error) {
                console.log("Error fetching categories", error);
            } else {
                setCategories(data || []);
            }
        } catch (error) {
            console.log("Fetching products failed", error);
        } finally {
            setIsLoading(false);
        }
    }, [])

    useEffect(() => {
        fetchSidebarCategories();
    }, [fetchSidebarCategories])

    // handle category search 
    const handleProductSearchByCategory = (category: string) => {
        console.log(category)
    }

    return (
        <div className='w-[250px] bg-white rounded-b-lg p-4 shadow-md'>
            <ul className='w-full flex flex-col gap-4'>
                {isLoading ? (
                    Array.from({ length: 5 }).map((_, index) => (
                        <li key={index}>
                            <Button className='bg-gray-100 animate-pulse w-full hover:bg-gray-100' />
                        </li>
                    ))
                ) : (
                    categories.map(({ category }) => (
                        <li key={category}>
                            <Button
                                className='w-full flex justify-start outline-none border-none shadow-none hover:text-primary font-thin' variant={"outline"}
                                onClick={()=> handleProductSearchByCategory(category)}
                            >{category}</Button>
                        </li>
                    ))
                )}
            </ul>
        </div>
    )
}

export default CategoriesSidebar