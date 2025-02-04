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
import toast, { Toaster } from 'react-hot-toast';
import { toastErrorOptions, toastSuccessOptions } from '@/constants';
import { Loader2 } from 'lucide-react';
import TipTap from './TipTap';
import ProductCategory from './ProductCategory';
import { supabase } from '@/utils/supabase/client';
import ProductImagesModal from './ProductImagesModal';


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
    stockUnits: z.preprocess(
        (value) => (value ? parseFloat(value as string) : undefined),
        z.number().min(1, {message: "Stock units are required!"})
    ),
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
    const [showImagesModal, setShowImagesModal] = useState<boolean>(false);
    const [createdProductId, setCreatedProductId] = useState<string | null>(null);

    const { user } = useUser();
    const { fetchCategories, categories } = useCategories();

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
            brand: "",
            color: "",
            created_by: user?.primaryEmailAddress?.emailAddress
        }
    });

    // define a submit handler
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsCreating(true);
        try {
            // upload product to supabase -- product
            const { data, error } = await supabase.from("product").insert([{
                name: values.productName,
                description: values.description,
                category: values.category,
                price: values.price,
                stock_units: values.stockUnits,
                color: values.color,
                brand: values.brand,
                created_by: values.created_by
            }]).select();

            if (error) {
                toast.error("Something went wrong", toastErrorOptions);
                throw error;
            }
            toast.success("Product successfully created!", toastSuccessOptions);
            console.log("Product created!", data);

            // set the created product id
            if (data && data[0]?.id) {
                setCreatedProductId(data[0]?.id);
            }

            // launch the add images modal once the product has been create 
            setShowImagesModal(true);
        } catch (error) {
            console.log("Product Creation failed", error);
            toast.error("Product Creation Failed", toastErrorOptions);
        } finally {
            setIsCreating(false);
        }
    }
    return (
        <div className='flex gap-5'>
            <Toaster />
            <div className="max-w-[700px] flex-1">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <ProductFormInput
                            name='productName'
                            label='Product Name'
                            placeholder='Product name'
                            form={form}
                        />
                        <div className="mb-4">
                            <TipTap
                                label='Product Description'
                                name='description'
                                placeholder='Enter product description...'
                                content={form.watch("description")}
                                onChange={(newContent: string) => {
                                    form.setValue("description", newContent)
                                }}
                            />
                        </div>
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
                        <ProductCategory
                            categories={categories}
                            name="category"
                            label="Product Category"
                        />
                        <ProductFormInput
                            name='color'
                            label='Product Color(s)'
                            placeholder='black, white, blue'
                            form={form}
                        />
                        <ProductFormInput
                            name='brand'
                            label='Product brand'
                            placeholder='Enter product brand'
                            form={form}
                        />
                        <ProductFormInput
                            name='stockUnits'
                            label='Stock Units'
                            placeholder='Available stock units'
                            form={form}
                        />
                        <Button
                            type='submit' className={isCreating ? "bg-gray-400 w-full cursor-wait" : "w-full"} disabled={isCreating}>
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
            {/* Product Images Modal */}
            {showImagesModal && createdProductId && (
                <ProductImagesModal
                    productId={createdProductId}
                    onClose={()=> setShowImagesModal(false)}
                />
            )}
        </div> 
    )
}

export default CreateProductForm