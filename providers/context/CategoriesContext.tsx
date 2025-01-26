"use client";

import { toastErrorOptions } from "@/constants";
import { supabase } from "@/utils/supabase/client";
import React, { useContext, createContext, ReactNode, useState, useCallback, useMemo } from "react";
import toast from "react-hot-toast";


interface Category {
    category: string;
    slug?: string;
    created_by: string;
}

interface CategoryContextProps {
    categories: Category[];
    fetchCategories: () => Promise<void>;
}

const CategoryContext = createContext<CategoryContextProps | undefined>(undefined);

export const CategoryProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [categories, setCategories] = useState<Category[]>([]);

    const fetchCategories = useCallback(async () => {
        const { data, error } = await supabase.from("category").select("*");

        if (error) {
            console.log("Error while fetching categories", error);
            toast.error("Failed to fetch Categories", toastErrorOptions);
            return;
        } else {
            setCategories(data || []);
        }
    }, []);

    // Memoize the context value to avoid any re-renders
    const contextValue = useMemo(() => ({ categories, fetchCategories }), [categories, fetchCategories]);

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