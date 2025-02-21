"use client";

import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useProducts } from '@/providers/context/ProductsContext'
import { DeleteIcon, MoveLeft } from 'lucide-react';
import { Toaster } from 'react-hot-toast';


const DeleteProduct = ({ productId }: { productId: string }) => {
    const { setOpenProductDeletionBox, handleDeleteProduct } = useProducts();
    return (
        <>
            <Toaster />
            <AlertDialog onOpenChange={() => setOpenProductDeletionBox(false)}>
                <AlertDialogTrigger asChild>
                    <Button className='my-2 w-full flex justify-start' variant="outline">
                        <DeleteIcon />
                        <span>Delete Product</span>
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the product from the database.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className='flex justify-between items-center w-full mt-10'>
                        <AlertDialogCancel>
                            <MoveLeft />
                            <span>Return to Products</span>
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => handleDeleteProduct(productId)}
                        >Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default DeleteProduct