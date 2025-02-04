import React, { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation';
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
} from "@/components/ui/alert-dialog"
import { useDropzone } from "react-dropzone";
import { Loader2, UploadCloud, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { toastErrorOptions, toastSuccessOptions } from '@/constants';
import { supabase } from '@/utils/supabase/client';
import { Button } from '../ui/button';
import Image from 'next/image';

interface ProductImagesProps {
    productId: string;
    onClose: () => void;
}


const ProductImagesModal: React.FC<ProductImagesProps> = ({ productId, onClose }) => {
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const router = useRouter();


    // handle file upload with react-dropzone
    const onDrop = useCallback((acceptedFiles: File[]) => {
        setUploadedFiles((prevFiles) => [...prevFiles, ...acceptedFiles])
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp"] }
    });

    // remove a file from the uploaded files list
    const removeFile = (index: number) => {
        setUploadedFiles(
            (prevFiles) => prevFiles.filter((_, i) => i !== index)
        )
    };

    // handle image upload to supabase
    const handleUpload = async () => {
        if (uploadedFiles.length === 0) {
            toast.error("Please upload at least one image!", toastErrorOptions);
            return;
        }
        setIsUploading(true);
        try {
            const uploadedPromises = uploadedFiles.map(async (file) => {
                const filepath = `product/${productId}/${file.name}`;
                const { error: uploadError } = await supabase.storage.from("productImages").upload(filepath, file);

                if (uploadError) {
                    throw uploadError;
                }
                
                // Generate a public url for the uploaded image
                const { data: urlData } = supabase.storage.from("productImages").getPublicUrl(filepath);

                // save the image url and product_id to the productImages table
                const { error: dbError } = await supabase.from("productImages").insert([{ url: urlData.publicUrl, product_id: productId }]);

                if (dbError) {
                    throw dbError;
                }

                return urlData.publicUrl;
            });

            await Promise.all(uploadedPromises);
            toast.success("Images successfully uploaded!", toastSuccessOptions); 
            router.push("/");
        } catch (error) {
            console.log("There was an error", error);
            toast.error("There was an error uploading images", toastErrorOptions);
        } finally {
            setIsUploading(false);
        }
    }

    return (
        <div className=''>
            <AlertDialog open={true} onOpenChange={onClose}>
            <AlertDialogTrigger>Open</AlertDialogTrigger>
            <AlertDialogContent> 
                <AlertDialogHeader>
                    <AlertDialogTitle>Upload product Images</AlertDialogTitle>
                    <AlertDialogDescription>
                        Upload images for the product with product ID: ${productId}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                {/* Drag-and-drop upload area */}
                <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50"
                        }`}
                >
                    <input {...getInputProps()} />
                    <UploadCloud className="w-10 h-10 mx-auto text-gray-400" />
                    <p className="mt-2 text-gray-600">
                        {isDragActive
                            ? "Drop the files here..."
                            : "Drag & drop images here, or click to select files"}
                    </p>
                    <p className="text-sm text-gray-500">Supports PNG, JPG, JPEG, WEBP</p>
                </div>

                {/* Uploaded files preview */}
                {uploadedFiles.length > 0 && (
                    <div className="mt-4 space-y-2">
                        <h3 className="font-medium text-gray-700">Uploaded Files:</h3>
                        <div className="space-y-2 grid grid-cols-3 gap-4 relative">
                            {uploadedFiles.map((file, index) => (
                                <div
                                    key={index}
                                    className="relative group border rounded-lg overflow-hidden"
                                >
                                    <Image
                                        src={URL.createObjectURL(file)}
                                        alt={file.name}
                                        width={200}
                                        height={200}
                                        className='w-full h-32 object-cover'
                                    />
                                    <button
                                        type='button'
                                        onClick={() => removeFile(index)}
                                        className="absolute bottom-0 left-0 rounded-tr-md p-1 hover:text-red-500 inline-flex justify-between items-center gap-1 bg-red-400 text-white"
                                    >
                                        <X className="w-4 h-4" />
                                        <span className='text-sm'>Close</span>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Modal footer */}

                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleUpload} asChild>
                        <Button onClick={handleUpload} disabled={uploadedFiles.length === 0 || isUploading}>
                            {isUploading ? (
                                <>
                                    <Loader2 className='animate-spin h-4 w-4 mr-2' />
                                    <span>Uploading...</span>
                                </>
                            ) : (
                                <span>Upload Images</span>
                            )}
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        </div>
    )
}

export default ProductImagesModal