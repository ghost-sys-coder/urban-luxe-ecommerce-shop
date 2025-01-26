"use client";

import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import FormInput from '@/components/shared/FormInput';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/utils/supabase/client';
import { useUser } from '@clerk/nextjs';
import toast, { Toaster } from "react-hot-toast";
import { toastSuccessOptions } from '@/constants';



const formSchema = z.object({
    category: z.string().min(4, {
        message: "Category must be at 4 characters"
    }),
    slug: z.string().min(2, {
        message: "Slug cannot be less than 2 characters"
    }),
    subcategory: z.string().min(2, {
        message: "sub category be less than 2 characters"
    }),
    created_by: z.string().email({
        message: "Provide a valid email"
    })
})

const AddCategoryForm = () => {
    const { user } = useUser();
    
    // define the form
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            category: "Clothing",
            slug: "clothing",
            subcategory: "Men's Clothing",
            created_by: user?.primaryEmailAddress?.emailAddress
        }
    });

    // define a submit handler
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsSubmitting(true);

        try {
            const { data, error } = await supabase.from('category').insert([values]);
            console.log({data});
            if (error) {
                throw error;
            }

            toast.success("Category successfully created!", toastSuccessOptions);

            form.reset();
        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    }
    return (
        <div className="create_category-form">
            <Toaster />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-3'>
                    <FormInput
                        name='category'
                        label='Category'
                        placeholder='Category...'
                        form={form}
                    />
                    <FormInput
                        name='slug'
                        label='Slug'
                        placeholder='Enter slug...'
                        form={form}
                    />
                    <FormInput
                        name='subcategory'
                        label='Sub Category'
                        placeholder='Comma separated sub categories'
                        form={form}
                    />
                    <Button
                        type='submit'
                        className={isSubmitting ? "bg-gray-400 cursor-wait" : "cursor-pointer"}
                        disabled={isSubmitting}
                    >
                    {isSubmitting ? (
                            <>
                            <Loader2 className='animate-spin' />
                            <span>Loading...</span>
                            </>
                        ) : (
                            <span>Create Category</span>
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default AddCategoryForm