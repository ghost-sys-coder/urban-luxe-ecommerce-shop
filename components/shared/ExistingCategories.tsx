"use client"

import React, { useEffect } from 'react'
import { useCategories } from '@/providers/context/CategoriesContext'
import EditCategory from './EditCategory'
import { Toaster } from 'react-hot-toast'

const ExistingSubCategories = () => {
    const { categories, fetchCategories, isLoading } = useCategories();

    useEffect(() => {
        fetchCategories()
    }, [fetchCategories])
    
    return (
        <div className='flex-1'>
            <Toaster />
            <h1 className='font-semibold pb-3'>Existing Categories</h1>
            <p className='pb-4 font-thin text-gray-400'>Categories are unique and not to be duplicated!.</p>
            {categories.length === 0 && isLoading === false &&(
                <div className="w-full flex justify-center items-center py-2 text-primary">
                    <p>No Categories added!</p>
                </div>
            )}
            <div className="flex gap-3 flex-wrap">
                {isLoading ? (
                    Array.from({ length: 5 }).map((_, index) => (
                        <div key={index} className="min-w-[200px] h-[45px] rounded-md shadow-lg animate-pulse bg-gray-200" />
                    ))
                ) : (
                    categories.map(({ category, slug, id }) => (
                        <EditCategory
                            key={category}
                            category={category}
                            slug={slug || ""}
                            id={id}
                        />
                    ))
                )}
            </div>
        </div>
    )
}

export default ExistingSubCategories