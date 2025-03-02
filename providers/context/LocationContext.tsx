"use client"

import React, { useCallback, useContext, ReactNode, useState, useEffect, useMemo, createContext, FC, Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import { supabase } from "@/utils/supabase/client";
import { toastErrorOptions, toastSuccessOptions } from "@/constants";
import { District, Areas } from "@/types/global";


interface LocationContextProps {
    districts: District[];
    areas: Areas[];
    newDistrict: string | undefined;
    setNewDistrict: Dispatch<SetStateAction<string | undefined>>
    newArea: string | undefined;
    setNewArea: Dispatch<SetStateAction<string | undefined>>;
    selectedDistrict: string | null;
    setSelectedDistrict: Dispatch<SetStateAction<string | null>>;
    isFetchingDistricts: boolean;
    isFetchingAreas: boolean;
    setIsFetchingDistricts: Dispatch<SetStateAction<boolean>>;
    isCreatingDistricts: boolean;
    setIsCreatingDistricts: Dispatch<SetStateAction<boolean>>;
    isCreatingAreas: boolean;
    handleFetchDistricts: () => Promise<void>;
    handleCreateDistricts: () => Promise<string | undefined>;
    handleCreateAreas: () => Promise<string | undefined>;
    handleFetchAreas: () => Promise<void>;
}


const LocationContext = createContext<LocationContextProps | undefined>(undefined);


export const LocationProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [districts, setDistricts] = useState<District[]>([]);
    const [areas, setAreas] = useState<Areas[]>([]);
    const [newDistrict, setNewDistrict] = useState<string | undefined>("");
    const [newArea, setNewArea] = useState<string | undefined>("");
    const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
    const [isFetchingDistricts, setIsFetchingDistricts] = useState<boolean>(false);
    const [isFetchingAreas, setIsFetchingAreas] = useState<boolean>(false);
    const [isCreatingAreas, setIsCreatingAreas] = useState(false);
    const [isCreatingDistricts, setIsCreatingDistricts] = useState<boolean>(false);



    // handle fetch districts
    const handleFetchDistricts = useCallback(async () => {
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
    }, []);

    useEffect(() => {
        handleFetchDistricts();
    }, [handleFetchDistricts]);


    // handle creating districts
    const handleCreateDistricts = useCallback(async () => {
        if (!newDistrict?.trim()) {
            return toast.error("The district field is required", toastErrorOptions);
        }

        setIsCreatingDistricts(true);

        try {
            const { error } = await supabase.from("districts").insert([{ district: newDistrict }]);

            if (error) {
                console.log("Failed to create the district", error);
                toast.error("Failed to create a district", toastErrorOptions);
                return;
            }

            toast.success("District has been added!", toastSuccessOptions);

            handleFetchDistricts();
            setNewDistrict("");

        } catch (error) {
            console.log("An error occured!", error);
            toast.error("Something went wrong!", toastErrorOptions);
            return;
        } finally {
            setIsCreatingDistricts(false);
        }
    }, [handleFetchDistricts, newDistrict])


    // handle fetch areas
    const handleFetchAreas = useCallback(async () => {
        setIsFetchingAreas(true);

        try {
            const { data, error } = await supabase.from("areas").select("*"); 

            if (error) {
                console.log("Supabase Error", error);
                toast.error("Failed to fetch from client locations from supabase", toastErrorOptions);
                return;
            }

            setAreas(data);
        } catch (error) {
            console.log("There was an error fetching client locations", error);
            toast.error("An error occured!", toastErrorOptions);
            return;
        } finally {
            setIsFetchingAreas(false);
        }
    }, [])


    // handle creating new areas
    const handleCreateAreas = useCallback(async () => {

        if (!selectedDistrict) {
            return toast.error("Select a district", toastErrorOptions);
        }

        if (!newArea?.trim()) {
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
        } finally {
            setIsCreatingAreas(false);
        }
    }, [newArea, selectedDistrict, handleFetchAreas])


    // separating setters
    const state = useMemo(() => ({
        districts,
        areas,
        newDistrict,
        newArea,
        selectedDistrict,
        isFetchingAreas,
        isFetchingDistricts,
        isCreatingAreas,
        isCreatingDistricts
    }), [
        districts,
        areas,
        newDistrict,
        newArea,
        selectedDistrict,
        isFetchingAreas,
        isFetchingDistricts,
        isCreatingAreas,
        isCreatingDistricts
    ]);


    const actions = useMemo(() => ({
        handleFetchDistricts,
        handleCreateDistricts,
        handleFetchAreas,
        handleCreateAreas,
        setNewArea,
        setNewDistrict,
        setSelectedDistrict,
        setIsCreatingAreas,
        setIsCreatingDistricts,
        setIsFetchingAreas,
        setIsFetchingDistricts
    }), [
        handleFetchDistricts,
        handleCreateDistricts,
        handleFetchAreas,
        handleCreateAreas,
    ])


    // Memoize the context value to avoid any re-renders
    const contextValue = useMemo(() => ({
        ...state,
        ...actions
    }), [state, actions])


    return (
        <LocationContext.Provider value={contextValue}>
            {children}
        </LocationContext.Provider>
    )
}


export const useLocation = () => {
    const context = useContext(LocationContext);
    if (context === undefined) {
        throw new Error("useLocation must be used within a Location provider");
    }

    return context;
}