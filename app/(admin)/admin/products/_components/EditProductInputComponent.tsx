import React from 'react'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Control, FieldValues, Path } from 'react-hook-form'


interface EditProductInputProps<TFieldValues extends FieldValues>{
    name: Path<TFieldValues>;
    label?: string;
    placeholder?: string;
    description?: string;
    form: {
        control: Control<TFieldValues>
    }
}

const EditProductInputComponent = <TFieldValues extends FieldValues>({ name, label, description, placeholder, form}: EditProductInputProps<TFieldValues>) => {
  return (
      <FormField
              control={form.control}
              name={name}
              render={({ field }) => (
                <FormItem className='flex-1 min-w-[500px'>
                      <FormLabel>{label}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={placeholder} {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {description}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
  )
}

export default EditProductInputComponent