import React, { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import { Trash2, Upload } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/utils/supabase/client';
import toast, { Toaster } from 'react-hot-toast';
import { toastErrorOptions } from '@/constants';

interface ImageProps {
    product_id: string;
    url: string;
}

interface ProductImagesComponentProps {
    images: ImageProps[];
    id: string;
    setImages: React.Dispatch<React.SetStateAction<ImageProps[]>>;
}

const ProductImages: React.FC<ProductImagesComponentProps> = ({ images, id, setImages }) => {
    const [isUploading, setIsUploading] = useState<boolean>(false);

    // Handle delete product images
    const handleDeleteProductImages = async (productId: string, url: string) => {
        try {

            // Extract the file path from the URL
            // const filePath = url.split('/productImages')[1];
            const filePath = "/product/14/Screenshot 2025-03-02 154208.png";
            console.log(filePath)

            if (!filePath) {
                console.log("Invalid file path extracted from URL:", url);
                toast.error("Failed to extract file path from URL", toastErrorOptions);
                return;
            }


            // Delete the image from Supabase storage
            const { error } = await supabase.storage.from('productImages').remove([filePath]);

            if (error) {
                console.error('Failed to delete image', error);
                toast.error('Failed to delete image', toastErrorOptions);
                return;
            }

            // delete the image record from the images table
            const { error: dbError } = await supabase.from("productImages").delete().eq("url", url);

            if (dbError) {
                console.log("Failed to delete image record", dbError);
                toast.error("Failed to delete image record", toastErrorOptions);
                return;
            }

            // Update the state to remove the deleted image
            setImages((prev) => prev.filter((image) => image.url !== url));
            toast.success('Image deleted successfully!');
        } catch (error) {
            console.error('Error deleting image:', error);
            toast.error('An error occurred while deleting the image', toastErrorOptions);
        }
    };

    // Handle file upload
    const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const files = Array.from(e.target.files);
        setIsUploading(true);

        try {
            const uploadedImages: ImageProps[] = [];

            for (const file of files) {
                const filePath = `/product/${id}/${file.name}`;

                // Upload the file to Supabase storage
                const { error } = await supabase.storage.from('productImages').upload(filePath, file);

                if (error) {
                    console.error('Failed to upload image', error);
                    toast.error('Failed to upload image', toastErrorOptions);
                    continue; // Skip this file and continue with the next one
                }

                // Construct the full URL of the uploaded image
                const url = `${process.env.NEXT_PUBLIC_IMAGE_PATH_URL}/productImages${filePath}`;
                
                // Insert the image record into the productImages table
                const { error: dbError } = await supabase.from("productImages").insert([{ product_id: id, url }]);
                
                if (dbError) {
                    console.log("Failed to save image url to database!", error);
                    toast.error("Failed to save image url to database", toastErrorOptions);
                    continue;
                }
                
                uploadedImages.push({ product_id: id, url });
            }

            // Update the state with the new images
            setImages((prev) => [...prev, ...uploadedImages]);
            toast.success('Images uploaded successfully!');
        } catch (error) {
            console.error('Error uploading images:', error);
            toast.error('An error occurred while uploading images', toastErrorOptions);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {/* Upload Button */}
            <Label
                htmlFor='file-upload'
                className='w-full h-full bg-gray-200 rounded-md shadow-lg flex flex-col justify-center items-center gap-2 cursor-pointer hover:bg-gray-300 transition-colors'
            >
                {isUploading ? (
                    <div className='animate-spin'>
                        <Upload />
                    </div>
                ) : (
                    <>
                        <Upload />
                        <span>Upload Product Images</span>
                    </>
                )}
                <Input
                    className='hidden'
                    type='file'
                    multiple
                    accept='image/*'
                    id='file-upload'
                    onChange={handleFileUpload}
                    disabled={isUploading}
                />
            </Label>

            {/* Display Uploaded Images */}
            {images.length > 0 &&
                images.map((image, index) => (
                    <div className='w-full h-[200px] relative rounded-md overflow-hidden' key={index}>
                        <Image
                            src={image.url}
                            alt='product image'
                            width={200}
                            height={200}
                            className='w-full h-full object-cover'
                        />
                        <Trash2
                            className='text-destructive absolute top-2 left-2 cursor-pointer hover:text-red-700 transition-colors'
                            onClick={() => handleDeleteProductImages(image.product_id, image.url)}
                        />
                    </div>
                ))}
            <Toaster />
        </div>
    );
};

export default ProductImages;