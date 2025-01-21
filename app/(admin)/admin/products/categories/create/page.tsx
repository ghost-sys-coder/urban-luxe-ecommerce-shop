import React from 'react'
import AddCategoryForm from './create_form'
import ExistingSubCategories from '@/components/shared/ExistingSubCategories'

const CreateCategory = () => {
    return (
        <div className='w-full'>
            <h1 className='font-semibold text-2xl pb-3'>Create a new Category</h1>
            <div className="flex gap-5">
                <AddCategoryForm />
                <ExistingSubCategories />
            </div>
        </div>
    )
}

export default CreateCategory