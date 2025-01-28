import React from 'react'
import CreateProductForm from '@/components/shared/CreateProductForm';



const CreateNewProduct = () => {

  return (
    <div className='w-full'>
      <h1 className='py-2 font-medium text-primary text-xl text-pretty'>Create a new product</h1>
      <CreateProductForm />
    </div>
  )
}

export default CreateNewProduct