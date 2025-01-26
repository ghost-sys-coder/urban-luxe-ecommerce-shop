"use client"

import React, { useEffect } from 'react'
import { Button } from '../ui/button'
import { useCategories } from '@/providers/context/CategoriesContext'

const ExistingSubCategories = () => {
    const { categories, fetchCategories, isLoading } = useCategories();

    useEffect(() => {
        fetchCategories()
    }, [fetchCategories])
    return (
        <div className='flex-1'>
            <h1 className='font-semibold pb-3'>Existing Categories</h1>
            <p className='pb-4 font-thin text-gray-400'>Categories are unique and not to be duplicated!.</p>
            <div className="flex gap-3 flex-wrap">
                {isLoading ? (
                    Array.from({ length: 5 }).map((_, index) => (
                        <div key={index} className="min-w-[200px] h-[45px] rounded-md shadow-lg animate-pulse bg-gray-200" />
                    ))
                ) : (
                    categories.map(({ category }) => (
                        <Button className='min-w-[200px] flex-1' type='button' key={category}>{category}</Button>
                    ))
                )}
            </div>
        </div>
    )
}

export default ExistingSubCategories