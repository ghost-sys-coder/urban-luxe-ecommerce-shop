import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { LogOut, Menu, ShieldBan, ShoppingBag, ShoppingBasket, Undo2, UserPen } from 'lucide-react'
import Link from 'next/link'
import { SignOutButton } from '@clerk/nextjs'
import { Button } from '../ui/button'

const Sidebar = () => {
    return (
        <div className="">
            <Sheet>
                <SheetTrigger>
                    <Menu className='text-primary' />
                </SheetTrigger>
                <SheetContent className='bg-offwhite'>
                    <SheetHeader>
                        <SheetTitle className='text-primary text-2xl'>
                            UrbanLuxe
                        </SheetTitle>
                        <SheetDescription className='sidebar_links-container'>
                            <Link href={"/profile"}>
                                <UserPen />
                                <span>Profile</span>
                            </Link>
                            <Link href={"/orders"}>
                                <ShoppingBasket />
                                <span>Orders</span>
                            </Link>
                            <Link href={"/returns"}>
                                <Undo2 />
                                <span>Returns</span>
                            </Link>
                            <Link href={"/cart"}>
                                <ShoppingBag />
                                <span>Products in your Cart</span>
                            </Link>
                            <Link href={"/admin"}>
                                <ShieldBan />
                                <span>Admin</span>
                            </Link>
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
    )
}

export default Sidebar