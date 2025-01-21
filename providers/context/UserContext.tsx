"use client";

import React, { useContext, createContext } from "react";
import { useUser } from "@clerk/nextjs";


interface UserContextProps {
    user: ReturnType<typeof useUser>["user"],
    isLoggedIn: boolean,
    isLoaded: boolean
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isLoaded, isSignedIn, user } = useUser();

    return (
        <UserContext.Provider
            value={{
                user: user || null,
                isLoggedIn: isSignedIn || false,
                isLoaded: !isLoaded
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error("useUserContext must be used within a userProvider")
    }

    return context;
}