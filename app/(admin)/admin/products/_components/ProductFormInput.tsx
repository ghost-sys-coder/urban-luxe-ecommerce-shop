import React from 'react'
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from '@/components/ui/input';
import { Control, FieldValues, Path } from 'react-hook-form';

interface FormInputProps<TFieldValues extends FieldValues>{
    name: Path<TFieldValues>;
    label: string;
    placeholder?: string;
    form: {
        control: Control<TFieldValues>
    }
}

const ProductFormInput = <TFieldValues extends FieldValues>({name, label, placeholder, form}: FormInputProps<TFieldValues>) => {
  return (
      <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
              <FormItem className='w-full'>
                  <FormLabel>{label}</FormLabel>
                  <FormControl>
                      <Input placeholder={placeholder} {...field} />
                  </FormControl>
                  <FormDescription>{`Enter ${label.toLowerCase()}`}</FormDescription>
                  <FormMessage />
              </FormItem>
          )}
      />
  )
}

export default ProductFormInput