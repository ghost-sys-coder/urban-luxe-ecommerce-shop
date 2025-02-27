"use client"

import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { Loader, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toastErrorOptions, toastSuccessOptions } from '@/constants';
import { Areas, District } from '@/types/global'
import { supabase } from '@/utils/supabase/client';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


const LocationForm = () => {
    
    useEffect(() => {
        handleFetchDistricts();
    }, [])


    // create districts 
    const handleCreateDistricts = async () => {

        if (!newDistrict.trim()) {
            return toast.error("The district field is required!", toastErrorOptions);
        }

        setIsCreatingDistricts(true);

        try {
            const { error } = await supabase.from("districts").insert([{ district: newDistrict }]);

            if (error) {
                console.log("Failed to create a district", error);
                toast.error("Failed to create a district", toastErrorOptions);
            }
           
            toast.success("District has been addedd!", toastSuccessOptions);

            handleFetchDistricts();
            setNewDistrict("")

        } catch (error) {
            console.log("An error occured!", error);
            toast.error("Something went wrong!", toastErrorOptions);
        } finally {
            setIsCreatingDistricts(false);
        }
    }

    // handle fetch products
    const handleFetchDistricts = async () => {
        setIsFetchingDistricts(true);

        try {
            const { data, error } = await supabase.from("districts").select("*");

            if (error) {
                console.log("Failed to fetch districts", error);
                toast.error("Failed to fetch districts", toastErrorOptions);
            }
            setDistricts(data || []);
        } catch (error) {
            console.log("An error occurred!", error);
            toast.error("An error occurred!", toastErrorOptions);
        } finally {
            setIsFetchingDistricts(false);
        }
    }


    // create new areas
    const handleCreateAreas = async () => {

        if (!selectedDistrict) {
            return toast.error("Select a district", toastErrorOptions);
        }

        if (!newArea.trim()) {
            return toast.error("The area cannot be empty!", toastErrorOptions);
        }
        setIsCreatingAreas(true);

        try {
            const { error } = await supabase.from("areas").insert([{
                area: newArea,
                district_id: selectedDistrict
            }]);

            if (error) {
                console.log("Failed to create a new area", error);
                toast.error("Failed to create a new area", toastErrorOptions);
                return;
            }

            toast.success("New area has been added!", toastSuccessOptions);

            handleFetchAreas();
            setNewArea("")

        } catch (error) {
            console.log("An error occured!", error);
            toast.error("Something went wrong!", toastErrorOptions);
            return;
        } finally {
            setIsCreatingAreas(false);
        }
    }

    // handle fetch areas
    const handleFetchAreas = async () => {
        setIsFetchingAreas(true);

        try {
            const { data, error } = await supabase.from("districts").select("*");

            if (error) {
                console.log("Failed to fetch areas", error);
                toast.error("Failed to fetch areas", toastErrorOptions);
            }
            setAreas(data || []);
        } catch (error) {
            console.log("An error occurred!", error);
            toast.error("An error occurred!", toastErrorOptions);
        } finally {
            setIsFetchingAreas(false);
        }
    }
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
                <Select onValueChange={setSelectedDistrict}>
                    <SelectTrigger className="w-[300px]">
                        <SelectValue placeholder="Select District or Region" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {districts.length > 0 && (
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