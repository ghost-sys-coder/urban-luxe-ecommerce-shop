"use client";

import React, { useEffect, useState } from 'react'
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { useCategories } from '@/providers/context/CategoriesContext';
import { useUser } from '@clerk/nextjs';
import ProductFormInput from '@/app/(admin)/admin/products/_components/ProductFormInput';
import toast from 'react-hot-toast';
import { toastErrorOptions } from '@/constants';
import { Loader2 } from 'lucide-react';


// form schema
const formSchema = z.object({
    productName: z.string().min(4, {
        message: "Product name must be at least 3 characters"
    }),
    description: z.string().min(4, {
        message: "Product description is required!"
    }),
    category: z.string().min(3, {
        message: "Product Category is required!"
    }),
    price: z.preprocess(
        (value) => (value ? parseFloat(value as string) : undefined),
        z.number().min(1, { message: "Product price is required!" })
    ),
    stockUnits: z.number().min(0, {
        message: "Product Quantity is required!"
    }),
    units_sold: z.number(),
    color: z.string().min(3, {
        message: "Product Color is reqiured!"
    }),
    brand: z.string(),
    created_by: z.string().email({
        message: "Provide a valid email"
    })
});



const CreateProductForm = () => {
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const { user } = useUser();
    const { fetchCategories } = useCategories();

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories])

    // define the form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            productName: "",
            description: "",
            category: "",
            price: 0,
            stockUnits: 0,
            units_sold: 0,
            brand: "",
            color: "",
            created_by: user?.primaryEmailAddress?.emailAddress
        }
    });

    // define a submit handler
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsCreating(true);
        try {
            console.log(values)
        } catch (error) {
            console.log("Product Creation failed", error);
            toast.error("Product Creation Failed", toastErrorOptions);
        } finally {
            setIsCreating(false);
        }
    }
    return (
        <div className='flex gap-5'>
            <div className="max-w-[700px] flex-1">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <ProductFormInput
                            name='productName'
                            label='Product Name'
                            placeholder='Product name'
                            form={form}
                        />
                    </form>
                </Form>
            </div>
            <div className="flex-1">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <ProductFormInput
                            name='price'
                            label='Product Price'
                            placeholder='$100'
                            form={form}
                        />
                        <Button type='submit' className={isCreating ? "bg-gray-400 w-full cursor-wait" : "w-full"} disabled={isCreating}>
                            {isCreating ? (
                                <>
                                    <Loader2 className='animate-spin' />
                                    <span>Creating...</span>
                                </>
                            ) : (<span>Create Product</span>)}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default CreateProductForm