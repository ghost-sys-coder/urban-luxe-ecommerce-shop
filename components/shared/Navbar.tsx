"use client"

import React from 'react'
import Link from 'next/link'
import { LogIn, Search, ShoppingCart } from 'lucide-react'
import { Input } from '../ui/input'
import DropdownNavMenu from './DropdownMenu'
import { useUserContext } from '@/providers/context/UserContext'
import { UserButton } from '@clerk/nextjs'
import { Button } from '../ui/button'
import Sidebar from './Sidebar'
import ThreeDotsLoader from './ThreeDotsLoader'

const Navbar = () => {
    const { user, isLoggedIn, isLoaded } = useUserContext();
    const firstName = user?.firstName;
    return (
        <nav className='nav'>
            <Link href={"/"} className='text-primary text-2xl font-semibold'>UrbanLuxe</Link>
            <div className="search">
                <Input
                    type='search'
                    placeholder='Search UrbanLuxe...'
                />
                <Search />
            </div>
            <div className="flex gap-10 justify-between items-center max-lg:justify-end">
                <DropdownNavMenu
                    isSigned={isLoggedIn}
                    firstName={firstName}
                    isLoaded={isLoaded}
                />
                <Link href={"/returns"} className='xl:block hidden'>Returns & Orders</Link>
                <div className="cart">
                    <ShoppingCart size={30} className='text-primary' />
                    <span>0</span>
                </div>
                <div className="flex gap-1 justify-center items-center">
                    {isLoaded ? (
                      <ThreeDotsLoader />  
                    ) : (
                        isLoggedIn ? (
                            <UserButton />
                        ) : (
                            <Button className='bg-primary text-white py-2 rounded-md hover:bg-white' asChild>
                                <Link href={"/sign-in"}>
                                    <LogIn />
                                    <span>Sign In</span>
                                </Link>
                            </Button>
                        )
                    )}
                </div>
            </div>
            <Sidebar />
        </nav>
    )
}

export default Navbar