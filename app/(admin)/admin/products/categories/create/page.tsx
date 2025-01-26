import React from 'react'
import AddCategoryForm from './create_form'
import ExistingCategories from '@/components/shared/ExistingCategories'

const CreateCategory = () => {
    return (
        <div className='w-full'>
            <h1 className='font-semibold text-2xl pb-3'>Create a new Category</h1>
            <div className="flex gap-5">
                <AddCategoryForm />
                <ExistingCategories />
            </div>
        </div>
    )
}

export default CreateCategory