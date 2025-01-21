import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const AddCategoryForm = () => {
    return (
        <div className="create_category-form">
            <div className="input_container">
                <Label className='pb-2' htmlFor='category'>Add Category</Label>
                <Input
                    type='text'
                    placeholder='Category...'
                    id='category'
                />
            </div>
            <div className="input_container">
                <Label className='pb-2' htmlFor='category'>Slug</Label>
                <Input
                    type='text'
                    placeholder='Slug...'
                    id='slug'
                />
            </div>
            <div className="input_container">
                <Label htmlFor='category'>Add Sub Categories</Label>
                <span className='text-[10px] bg-primary text-white p-[6px] rounded-sm shadow-md w-[300px] my-2'>Split the subcategories by commas</span>
                <Input
                    type='text'
                    placeholder='Shoes, Sneakers'
                    id='sub-category'
                />
            </div>
            <Button type='submit'>
                Create Category
            </Button>
        </div>
    )
}

export default AddCategoryForm