"use client"

import React from 'react'
import { Button } from '../ui/button'

const ExistingSubCategories = () => {
    const subCategories = ["Sneakers", "Sandals", "Men's Clothing", "Women's Clothing"]
    return (
        <div className='flex-1'>
            <h1 className='font-semibold pb-3'>Existing Sub Categories</h1>
            <p className='pb-2 font-medium'>Click a sub category to select it.</p>
            <div className="flex gap-3 flex-wrap">
                {subCategories.map(subCategory => (
                    <Button className='min-w-[200px] flex-1' type='button' key={subCategory}>{subCategory}</Button>
                ))}
            </div>
        </div>
    )
}

export default ExistingSubCategories