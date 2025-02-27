import React, { ChangeEvent, useState } from 'react'
import toast from 'react-hot-toast';
import { toastErrorOptions } from '@/constants';
import Image from 'next/image';
import { X } from 'lucide-react';
import { Button } from '../ui/button';

interface ImageUploaderProps {
    onChange: (file: File | null) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({onChange}) => {   
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // validate file type and size
        if (!["image/png", "image/jpeg", "image/jpg", "image/gif", "image/webp"].includes(file.type)) {
            toast.error("Only PNG, JPEG, JPG, and GIF formats are allowed", toastErrorOptions);
            setPreview(null);
            onChange(null);
            return;
        }

        if (file.size > 800 * 1024) {
            toast.error("File size exceeds limit", toastErrorOptions);
            return;
        }

        setPreview(URL.createObjectURL(file));
        onChange(file);
    }
    return (

        <div className="">
            {preview ? (
                <div className="w-full h-[250px] relative">
                    <Image
                        src={preview}
                        alt='category image'
                        width={200}
                        height={200}
                        className='w-full h-full object-cover rounded-md'
                    />
                    <Button
                        className="flex gap-2 absolute top-1 right-1 text-sm"
                        variant={"destructive"}
                        onClick={() => {
                            setPreview(null);
                            onChange(null);
                        }}
                    >
                        <X />
                        <span>Change or delete image</span>
                    </Button>
                </div>
            ) : (
                <div className="flex items-center justify-center w-full">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                        <input
                            id="dropzone-file"
                            type="file"
                            className="hidden"
                            onChange={handleFileUpload}
                        />
                    </label>
                </div>
            )}
        </div>

    )
}

export default ImageUploader