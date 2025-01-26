"use client";

import React from 'react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { LogOut, Menu, ShieldBan, ShoppingBag, ShoppingBasket, Undo2, UserPen } from 'lucide-react';
import Link from 'next/link';
import { SignOutButton, useUser } from '@clerk/nextjs';
import { Button } from '../ui/button';

const Sidebar = () => {

    const { user } = useUser();
    const isAdmin = user?.publicMetadata?.role === "admin";

    const sidebarLinks = [
        { href: "/profile", icon: <UserPen />, text: "Profile" },
        { href: "/orders", icon: <ShoppingBasket />, text: "Orders" },
        { href: "/returns", icon: <Undo2 />, text: "Returns" },
        { href: "/cart", icon: <ShoppingBag />, text: "Products in your Cart" },
        ...(isAdmin ? [{ href: "/admin", icon: <ShieldBan />, text: "Admin" }] : []),
    ];

    return (
        <div className="sidebar">
            <Sheet>
                <SheetTrigger aria-label="Open menu">
                    <Menu className='text-primary' />
                </SheetTrigger>
                <SheetContent className='bg-offwhite'>
                    <SheetHeader>
                        <SheetTitle className='text-primary text-2xl'>
                            UrbanLuxe
                        </SheetTitle>
                        <SheetDescription className='sidebar_links-container'>
                            {sidebarLinks.map((link, index) => (
                                <Link key={index} href={link.href} className="sidebar-link">
                                    {link.icon}
                                    <span>{link.text}</span>
                                </Link>
                            ))}
                            <SignOutButton>
                                <Button className='w-[300px] mx-auto my-3 bg-primary absolute bottom-0'>
                                    <LogOut />
                                    <span>Sign Out</span>
                                </Button>
                            </SignOutButton>
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default Sidebar;