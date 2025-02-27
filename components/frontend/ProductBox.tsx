import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface ProductBoxProps {
    id: string;
    firstImage: string;
    name: string;
    formattedPrice: string;
    stock_units: number;
}

export const ProductBox: React.FC<ProductBoxProps> = ({ id, firstImage, name, formattedPrice, stock_units }) => {
    return (
        <Link
            href={`/products/product/${id}`}
            className="w-full relative bg-offwhite hover:translate-x-2 hover:translate-y-2 rounded-md overflow-hidden"
            key={id}>
            <Image
                src={firstImage}
                alt={name}
                width={300}
                height={400}
                className='w-full h-[200px] object-cover'
            />
            <div className="pb-3 py-2">
                <h3 className='text-gray-700 font-thin text-sm'>{name}</h3>
                <h4 className='text-gray-700 font-thin py-1'>{formattedPrice}</h4>
                <p className='text-gray-700 font-thin text-sm'>{stock_units} items left</p>
            </div>
        </Link>
    )
}
