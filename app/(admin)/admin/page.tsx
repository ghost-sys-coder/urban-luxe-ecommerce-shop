import ProductsTable from '@/components/shared/ProductsTable'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const AdminPanel = () => {
  return (
    <div>
      <div className="flex gap-10 items-center justify-between">
        <h1 className='font-semibold text-2xl'>Products</h1>
        <div className="flex gap-5 justify-center items-center">
          <Button asChild className='bg-blue-400'>
            <Link href={"/admin/products/categories/create"}>Add New Category</Link>
          </Button>
          <Button asChild className='bg-primary'>
            <Link href={"/admin/products/create"}>New Product</Link>
          </Button>
        </div>
      </div>
      <ProductsTable />
    </div>
  )
}

export default AdminPanel