import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useFormContext, Controller } from 'react-hook-form';
import { Label } from '../ui/label';

interface Category {
    id: string;
    category: string;
    slug?: string;
    created_by: string;
}

interface ProductCategoryProps {
    categories: Category[];
    name: string;
    label?: string;
    description?: string;

}

const ProductCategory: React.FC<ProductCategoryProps> = ({ categories, name, label }) => {
    const { control } = useFormContext();

    return (
        <div className="flex-1 min-w-[300px]">
            {label && (<Label className=''>{label}</Label>)}
            <Controller
                name={name}
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <div className='my-1'>
                        <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className='w-full'>
                                <SelectValue placeholder="Select product Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Categories</SelectLabel>
                                    {categories?.map(({ category }) => (
                                        <SelectItem key={category} value={category}>{category}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {error && (
                            <p className='text-sm text-destructive mt-1'>{error.message}</p>
                        )}
                    </div>
                )}
            />
        </div>
    )
}

export default ProductCategory