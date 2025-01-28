import React, { useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { supabase } from '@/utils/supabase/client'
import toast from 'react-hot-toast'
import { toastErrorOptions, toastSuccessOptions } from '@/constants'
import { Loader } from 'lucide-react'
import { useCategories } from '@/providers/context/CategoriesContext'


const EditCategory = ({ category, slug, id }: { category: string, slug: string, id:string }) => {

    const [editedCategory, setEditedCategory] = useState(category);
    const [editedSlug, setEditedSlug] = useState(slug);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const { fetchCategories } = useCategories();

    // handle updating categories
    const handleCategoryUpdate = async () => {
        if (!editedCategory.trim()) {
            toast.error("Category cannot be empty!");
            return;
        }

        setIsLoading(true);

        try {
            const { data, error } = await supabase.from("category").update({
                category: editedCategory,
                slug: editedSlug
            }).eq("id", id);

            if (error) {
                console.log("Category update failed", error);
                toast.error("Failed to update category", toastErrorOptions);
            } else {
                console.log({ data });
                fetchCategories();
                toast.success("Category has been updated successfully!", toastSuccessOptions);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    // handle deleting categories
    const handleDelete = async () => {
        setIsDeleting(true);

        try {
            const { error } = await supabase.from("category").delete().eq("id", id);

            if (error) {
                console.log("An error occurred!", error);
                toast.error("Failed to delete category", toastErrorOptions);
                return;
            }

            fetchCategories();
            toast.success("Category successfully deleted!", toastSuccessOptions);
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete category!", toastErrorOptions);
        } finally {
            setIsDeleting(false);
        }
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger className='min-w-[200px] h-[45px] rounded-md shadow-md bg-primary cursor-pointer text-offwhite'>{category}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Edit this Category</AlertDialogTitle>
                    <AlertDialogDescription asChild className='flex flex-col gap-3'>
                        <div className="w-full">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor='category'>Category</Label>
                                <Input
                                    type='text'
                                    id='category'
                                    value={editedCategory}
                                    onChange={(e) => setEditedCategory(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor='slug'>Slug</Label>
                                <Input type='text' value={editedSlug} id={"slug"} onChange={e => setEditedSlug(e.target.value)} />
                            </div>
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className='flex w-full justify-between items-center gap-5'>
                    <div className="flex-1">
                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className='bg-red-500 hover:bg-black'
                        >
                            {isDeleting ? (<>
                                <Loader className='animate-spin' />
                                <span>Deleting...</span>
                            </>) : (<span>Delete Category</span>)}
                    </AlertDialogAction>
                    </div>
                    <div className="flex gap-2">
                    <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        disabled={isLoading}
                        onClick={handleCategoryUpdate}>
                        {isLoading ? (<>
                            <Loader className='animate-spin' />
                            <span>Updating...</span>
                        </>) : ("Continue")}
                    </AlertDialogAction>
                    </div>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default EditCategory