"use client";

import React, { useContext, createContext, ReactNode, useState, useCallback, useMemo } from "react";
import { toastErrorOptions } from "@/constants";
import { supabase } from "@/utils/supabase/client";
import toast from "react-hot-toast";


interface Category {
    id: string;
    category: string;
    slug?: string;
    created_by: string;
    image_url?: string;
}

interface CategoryContextProps {
    categories: Category[];
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    fetchCategories: () => Promise<void>;
}

const CategoryContext = createContext<CategoryContextProps | undefined>(undefined);

export const CategoryProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchCategories = useCallback(async () => {
        setIsLoading(true);

        try {
            const { data, error } = await supabase.from("category").select("*"); 
            if (error) {
                console.log("Error while fetching categories", error);
                toast.error("Failed to fetch Categories", toastErrorOptions);
                return;
            } else {
                console.log(data);
                setCategories(data || []);
            }
        } catch (error) {
            console.log("Unexpected Error occurred", error);
            toast.error("An unexpected error occurred!", toastErrorOptions);
        } finally {
            setIsLoading(false);
        }


        
    }, []);

    // Memoize the context value to avoid any re-renders
    const contextValue = useMemo(() => ({ categories, fetchCategories, isLoading, setIsLoading }), [categories, fetchCategories, isLoading]);

    return (
        <CategoryContext.Provider
            value={contextValue}
        >
            {children}
        </CategoryContext.Provider>
    )
}

export const useCategories = () => {
    const context = useContext(CategoryContext);
    if (context === undefined) {
        throw new Error("useCategories must be used within a category provider");
    }

    return context;
}