"use client"

import React from 'react'
import { Toaster } from 'react-hot-toast';
import { Loader, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';


import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { useLocation } from '@/providers/context/LocationContext';

const LocationForm = () => {
    const {
        newDistrict, newArea, setSelectedDistrict,
        setNewDistrict, setNewArea,
        isCreatingAreas, isCreatingDistricts, 
        handleCreateAreas, handleCreateDistricts,
        districts
    } = useLocation();
    return (
        <div className='w-full'>
            <Toaster />
            <div className="mt-4">
                <Label htmlFor='district'>Add a new District</Label>
                <Input
                    type='text'
                    id='district'
                    placeholder='New District'
                    value={newDistrict}
                    onChange={(e) => setNewDistrict(e.target.value)}
                />
                <Button
                    type='button'
                    disabled={isCreatingDistricts}
                    onClick={handleCreateDistricts}
                    className='my-2 flex gap-2'>
                    {isCreatingDistricts ? (
                        <>
                            <Loader className='animate-spin' />
                            <span>Adding...</span>
                        </>
                    ) : (
                        <span>Add District</span>
                    )}
                </Button>
            </div>

            <div className="mt-5">
                <Label htmlFor='area'>Add a new Area</Label>
                <Select onValueChange={(value) => setSelectedDistrict(value ?? null)}>
                    <SelectTrigger className="w-[300px]">
                        <SelectValue placeholder="Select District or Region" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {districts?.length > 0 && (
                                districts.map(({ district, id}) => (
                                    <SelectItem key={id} value={id}>{district}</SelectItem>
                                ))
                            )}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Input
                    className='my-3'
                    id='area'
                    placeholder='Add a new Area'
                    value={newArea}
                    onChange={(e)=> setNewArea(e.target.value)}
                />
                <Button
                    type='button'
                    disabled={isCreatingAreas}
                    onClick={handleCreateAreas}
                >
                    {isCreatingAreas ? (
                        <>
                            <Loader2 className='animate-spin' />
                            <span>Creating...</span>
                        </>
                    ): (
                    <span>Add Area</span>
                )} 
                </Button>
            </div>
        </div>
    )
}

export default LocationForm