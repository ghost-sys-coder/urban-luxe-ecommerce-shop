import React, { useCallback, useContext, ReactNode, useState, useEffect, useMemo, createContext, FC } from "react";
import toast from "react-hot-toast";
import { supabase } from "@/utils/supabase/client";
import { toastErrorOptions, toastSuccessOptions } from "@/constants";
import { District, Areas } from "@/types/global";


interface LocationContextProps {
    districts: District[];
    areas: Areas[];
    
}


const LocationContext = createContext<LocationContextProps | undefined>(undefined);


export const LocationProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [districts, setDistricts] = useState<District[]>([]);
    const [areas, setAreas] = useState<Areas[]>([]);
    const [newDistrict, setNewDistrict] = useState("");
    const [newArea, setNewArea] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
    const [isFetchingDistricts, setIsFetchingDistricts] = useState<boolean>(false);
    const [isFetchingAreas, setIsFetchingAreas] = useState<boolean>(false);
    const [isCreatingAreas, setIsCreatingAreas] = useState(false);
    const [isCreatingDistricts, setIsCreatingDistricts] = useState<boolean>(false);


    return (
        <LocationContext.Provider value={{}}>
            {children}
        </LocationContext.Provider>
    )
}