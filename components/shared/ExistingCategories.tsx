"use client"

import React, { useEffect } from 'react'
import { Button } from '../ui/button'
import { useCategories } from '@/providers/context/CategoriesContext'

const ExistingSubCategories = () => {
    const { categories, fetchCategories } = useCategories();

    useEffect(() => {
        fetchCategories()
    }, [fetchCategories])
    return (
        <div className='flex-1'>
            <h1 className='font-semibold pb-3'>Existing Categories</h1>
            <p className='pb-4 font-thin text-gray-400'>Categories are unique and not to be duplicated!.</p>
            <div className="flex gap-3 flex-wrap">
                {categories.map(({category}) => (
                    <Button className='min-w-[200px] flex-1' type='button' key={category}>{category}</Button>
                ))}
            </div>
        </div>
    )
}

export default ExistingSubCategories