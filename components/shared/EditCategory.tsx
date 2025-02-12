import React, { useState } from 'react';
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
} from '@/components/ui/alert-dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { supabase } from '@/utils/supabase/client';
import toast from 'react-hot-toast';
import { toastErrorOptions, toastSuccessOptions } from '@/constants';
import { Loader } from 'lucide-react';
import { useCategories } from '@/providers/context/CategoriesContext';
import ImageUploader from './ImageUploader';

interface EditCategoryProps {
    category: string;
    slug: string;
    id: string;
}

const EditCategory = ({ category, slug, id }: EditCategoryProps) => {
    const [editedCategory, setEditedCategory] = useState(category);
    const [editedSlug, setEditedSlug] = useState(slug);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [image, setImage] = useState<File | null>(null);

    const { fetchCategories } = useCategories();

    // Handle updating categories
    const handleCategoryUpdate = async () => {
        if (!editedCategory.trim() || !editedSlug.trim()) {
            toast.error('Category and Slug cannot be empty!');
            return;
        }

        setIsLoading(true);

        try {
            let imageUrl = null;

            // upload the image if a new file was selected
            if (image) {
                const { data, error} = await supabase.storage.from("categoryImages")
                    .upload(`categories/${id}-${image.name}`, image, { cacheControl: '3600', upsert: true });
                
                if (error) throw error;

                toast.success("Image successfully uploaded!", toastSuccessOptions);

                imageUrl = supabase.storage.from("categoryImages").getPublicUrl(data.path);
            }
            // Update category in the database
            const { error } = await supabase
                .from('category')
                .update({
                    category: editedCategory,
                    slug: editedSlug,
                    image_url: imageUrl || undefined
                })
                .eq('id', id);

            if (error) throw error;

            fetchCategories();
            toast.success('Category updated successfully!', toastSuccessOptions);
            
        } catch (error) {
            console.error('Error updating category:', error);
            toast.error('Failed to update category', toastErrorOptions);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle deleting categories
    const handleDelete = async () => {
        setIsDeleting(true);

        try {
            const { error } = await supabase.from('category').delete().eq('id', id);

            if (error) throw error;

            fetchCategories();
            toast.success('Category deleted successfully!', toastSuccessOptions);
        } catch (error) {
            console.error('Error deleting category:', error);
            toast.error('Failed to delete category', toastErrorOptions);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger className="min-w-[200px] h-[45px] rounded-md shadow-md bg-primary cursor-pointer text-offwhite">
                {category}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Edit this Category</AlertDialogTitle>
                    <AlertDialogDescription asChild className="flex flex-col gap-3">
                        <div className="w-full">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="category">Category</Label>
                                <Input
                                    type="text"
                                    id="category"
                                    value={editedCategory}
                                    onChange={(e) => setEditedCategory(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="slug">Slug</Label>
                                <Input
                                    type="text"
                                    id="slug"
                                    value={editedSlug}
                                    onChange={(e) => setEditedSlug(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <h2 className="font-thin">Upload Category Image</h2>
                                <ImageUploader onChange={setImage} />
                            </div>
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex w-full justify-between items-center gap-5">
                    <div className="flex-1">
                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="bg-red-500 hover:bg-black"
                        >
                            {isDeleting ? (
                                <>
                                    <Loader className="animate-spin" />
                                    <span>Deleting...</span>
                                </>
                            ) : (
                                <span>Delete Category</span>
                            )}
                        </AlertDialogAction>
                    </div>
                    <div className="flex gap-2">
                        <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            disabled={isLoading}
                            onClick={handleCategoryUpdate}
                            aria-busy={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader className="animate-spin" />
                                    <span>Updating...</span>
                                </>
                            ) : (
                                'Continue'
                            )}
                        </AlertDialogAction>
                    </div>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default EditCategory;