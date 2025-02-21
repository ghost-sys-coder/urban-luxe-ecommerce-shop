"use client"

import React, { useCallback, useContext, ReactNode, useState, useMemo, createContext, useEffect } from "react";
import { toastErrorOptions } from "@/constants";
import { supabase } from "@/utils/supabase/client";
import toast from "react-hot-toast";
import { Product } from "@/types/global";

interface ProductContextProps {
    products: Product[];
    isProductsLoading: boolean;
    setIsProductsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    fetchProducts: () => Promise<void>;
    isDeleting: boolean;
    setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>;
    handleDeleteProduct: (productId: string) => Promise<void>; 
    openProductDeletionBox: boolean;
    setOpenProductDeletionBox: React.Dispatch<React.SetStateAction<boolean>>;
    setIsFetching: React.Dispatch<React.SetStateAction<boolean>>;
    isFetching: boolean;
}


const ProductContext = createContext<ProductContextProps | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isProductsLoading, setIsProductsLoading] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [openProductDeletionBox, setOpenProductDeletionBox] = useState<boolean>(false);
    const [isFetching, setIsFetching] = useState<boolean>(false);



    // fetch products
    const fetchProducts = useCallback(async () => {
        setIsProductsLoading(true);

        try {
            const { data, error } = await supabase.from("product").select("*, productImages(product_id, url)");

            if (error) {
                console.log("Error while fetching products", error);
                toast.error("Failed to fetch products", toastErrorOptions);
                return;
            } else {
                setProducts(data);
            }

        } catch (error) {
            console.log("Failed to fetch products", error);
        } finally {
            setIsProductsLoading(false);
        }
    }, [])

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // delete product
    const handleDeleteProduct = useCallback(async (productId: string) => {
        setIsDeleting(true);

        try {
            // fetch the images associated with the product
            const { data: images, error: imageError } = await supabase.from("productImages").select("url").eq("product_id", productId);

            if (imageError) {
                console.log("Error fetching product images", imageError);
                toast.error("Failed to fetch product images", toastErrorOptions);
                return;
            }

            // Extract image paths from the URLS
            if (images && images.length > 0) {
                const imagePaths = images.map((img) => img.url);
                const { error: storageError } = await supabase.storage.from("productImages").remove(imagePaths);

                if (storageError) {
                    console.log("Error deleting images from storage", storageError);
                    toast.error("Failed to delete images from storage", toastErrorOptions);
                    return;
                }
            }

            // Delete records from productImages table
            const { error: deleteImagesError } = await supabase.from("productImages").delete().eq("product_id", productId);

            if (deleteImagesError) {
                console.log("Error deleting product images from database", deleteImagesError);
                toast.error("Failed to delete product images", toastErrorOptions);
                return;
            }

            // Update the product record from the database
            const { error: deleteProductError } = await supabase.from("product").delete().eq("id", productId);

            if (deleteProductError) {
                console.log("Error deleting product", deleteProductError);
                toast.error("Failed to delete product", toastErrorOptions);
                return;
            }

            // Update the products 
            setProducts(prev => prev.filter(product => product.id !== productId));

        } catch (error) {
            console.log("Unexpected error deleting product", error);
            toast.error("Something went wrong", toastErrorOptions);
        } finally {
            setIsDeleting(false);
        }
    }, [])



    // Memoize the context value to avoid any re-renders
    const contextValue = useMemo(() => ({
        products, 
        fetchProducts, 
        isProductsLoading, 
        setIsProductsLoading, 
        isDeleting, 
        setIsDeleting, 
        handleDeleteProduct, 
        openProductDeletionBox, 
        setOpenProductDeletionBox, 
        isFetching,
        setIsFetching,
    }), [
        products, 
        fetchProducts, 
        isProductsLoading, 
        isDeleting, 
        handleDeleteProduct, 
        openProductDeletionBox, 
        isFetching,
    ])

    return (
        <ProductContext.Provider
            value={contextValue}
        >
            {children}
       </ProductContext.Provider>
   ) 
}


export const useProducts = () => {
    const context = useContext(ProductContext);
    if (context === undefined) {
        throw new Error("useProducts must be used within a products provider")
    }

    return context; 
}