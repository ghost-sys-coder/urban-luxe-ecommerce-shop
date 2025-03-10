"use client";

import React, { useCallback, useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast';
import { toastErrorOptions, toastSuccessOptions } from '@/constants';
import { supabase } from '@/utils/supabase/client';

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Form } from '@/components/ui/form';
import EditProductInputComponent from './EditProductInputComponent';
import ProductCategory from '@/components/shared/ProductCategory';
import { useCategories } from '@/providers/context/CategoriesContext';
import TipTap from '@/components/shared/TipTap';
import { Edit } from 'lucide-react';
import ProductImages from './ProductImages';



const formSchema = z.object({
  name: z.string().min(2, {
    message: "Product name cannot be missing"
  }),
  price: z.preprocess(
    (value) => (value ? parseFloat(value as string) : undefined),
    z.number().min(1, {
      message: "Product price is required"
    })
  ),
  brand: z.string(),
  color: z.string().min(3, {
    message: 'Product color is required!'
  }),
  stock_units: z.preprocess(
    (value) => (value ? parseFloat(value as string) : undefined),
    z.number().min(1, {message: "Product price is required"})
  ),
  units_sold: z.preprocess(
    (value) => (value ? parseFloat(value as string) : undefined),
    z.number()
  ),
  category: z.string().min(3, {
    message: "Product Category is required!"
  }),
  size: z.string(),
  description: z.string().min(4, {
    message: "Product Description is required",
  }),
  tags: z.string().optional()
})


const ProductUpdateForm = () => {
  const [isFetchingProduct, setIsFetchingProduct] = useState<boolean>(false);
  const [isUpdatingProduct, setIsUpdatingProduct] = useState<boolean>(false);
  const [productImagesArray, setProductImagesArray] = useState<{ product_id: string; url: string}[]>([]);

  const pathname = usePathname();
  const router = useRouter();
  const { categories, fetchCategories } = useCategories();

  const productId = pathname.split("/")[(pathname.split("/").length) - 1];


  // Define the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
      brand: "",
      color: "",
      stock_units: 0,
      units_sold: 0,
      category: "",
      size: "",
      description: "",
      tags: ""
    }
  });


  useEffect(() => {
    fetchCategories();
  }, [fetchCategories])

  const getProduct = useCallback(async () => {
    setIsFetchingProduct(true)
    try {
      const { data, error } = await supabase.from("product").select("*, productImages(product_id, url)").eq("id", productId).single();

      if (error) {
        console.error("Error fetching product", error);
        toast.error("Failed to fetch product", toastErrorOptions);
        return null;
      }

      if (data) {
        form.setValue("name", data.name);
        form.setValue("price", data.price);
        form.setValue("brand", data.brand);
        form.setValue("color", data.color);
        form.setValue("stock_units", data.stock_units);
        form.setValue("units_sold", data.units_sold);
        form.setValue("category", data.category);
        form.setValue("size", data.size);
        form.setValue("description", data.description);
        form.setValue("tags", data.tags);
      }

      // if product images existed
      if (data && data?.productImages) {
        setProductImagesArray(data?.productImages);
      }

    } catch (error) {
      console.log("Failed to fetch product with id:" + productId, error);
      return null;
    } finally {
      setIsFetchingProduct(false);
    }
  }, [form, productId])

  useEffect(() => {
    getProduct();
  },[getProduct])


  // Define a submit handler
  const onSubmit = async(values: z.infer<typeof formSchema>) => {
    setIsUpdatingProduct(true);

    try {
      const { error } = await supabase.from("product").update(values).eq("id", productId);

      if (error) {
        console.log(`Supabase failed to update the product with product ID:${productId}`, error);
        toast.error(`Supabase failed to update product with product ID: ${productId}`, toastErrorOptions);
        return;
      }

      toast.success("Product successfully updated!", toastSuccessOptions);

      // run this piece of code after 3 seconds
      setTimeout(() => {
        router.push("/admin")
      }, 3000);
    } catch (error) {
      console.log("An error occurred!", error);
      toast.error("Failed to update product", toastErrorOptions);
      return;
    } finally {
      setIsUpdatingProduct(false);
    }
  }

  // if loading 
  if (isFetchingProduct) {
    return (
      <div className="">
        loading products...
      </div>
    )
  }

  return (
    <div className='w-full'>
      <Toaster />
      <h1 className="text-left font-medium text-xl pb-5">Edit Product with ID: {productId}</h1>
      <div className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex gap-5 w-full flex-wrap">
            <EditProductInputComponent
              name="name"
              placeholder='Product Name'
              description='Product Name...'
              form={form}
            />
            <EditProductInputComponent
              name="price"
              placeholder='ugx 50000'
              description='Product Price'
              form={form}
            />

            </div>
            <div className="flex gap-5 w-full">
            <EditProductInputComponent
              name='brand'
              placeholder='Nike, Adidas, New Balance'
              description='Product Brand'
              form={form}
            />
            <EditProductInputComponent
              name='color'
              placeholder='Black, White, Gray'
              description='Separate color names by commas ie Black, White'
              form={form}
            />
            </div>
            <div className="flex gap-5 w-full">
            <EditProductInputComponent
              name='stock_units'
              placeholder="50 units"
              description='Currently availble units'
              form={form}
            />
            <EditProductInputComponent
              name='units_sold'
              placeholder="50 units"
              description='Units already sold'
              form={form}
            />
            </div>
            <div className="flex gap-5 w-full justify-between items-center">
              <ProductCategory
                name='category'
                description='Product Category...'
                categories={categories}
                label='Update the Product Category'
              />
              <EditProductInputComponent
                name='size'
                placeholder='XXL, XL, 40, 42, 45'
                description='Separate sizes by commas'
                form={form}
              />
            </div>
            <div className="my-4">
              <TipTap
                label='Edit Product Description'
                name='description'
                placeholder='Edit Product Description'
                content={form.watch("description")}
                onChange={(newContent) => {
                  form.setValue("description", newContent)
                }}
              />
            </div>
            <EditProductInputComponent
              name='tags'
              label='Product Tags'
              description="Separate tags with commas ie Men's Clothing, Shoes"
              placeholder="Men's Shoes, Shoes"
              form={form}
            />
            <div className="my-10">
              <h2 className='text-sm font-thin text-left pb-1'>Edit Product Images</h2>
              <ProductImages
                images={productImagesArray}
                id={productId}
                setImages={setProductImagesArray}
              />
            </div>
            <Button
              disabled={isUpdatingProduct}
              className='md:w-[300px] w-full flex justify-center items-center mx-auto' type="submit">
              {isUpdatingProduct ? (
                <>
                  <Edit className='animate-spin w-8 h-8' size={30} />
                  <span>Updating Product...</span>
                </>
              ) : (<span>Update Product</span>)}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default ProductUpdateForm