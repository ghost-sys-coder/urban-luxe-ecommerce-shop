"use client"

import React from 'react'
import { Input } from '../ui/input'
import { Bell, MessageSquare, Search } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import { useUserContext } from '@/providers/context/UserContext'
import ThreeDotsLoader from './ThreeDotsLoader'

const AdminNavbar = () => {
  const { user, isLoaded } = useUserContext();
  const username = user?.username;

  return (
    <nav className='flex justify-between items-center gap-5 px-4 py-4 bg-white'>
      <div className="flex items-center justify-center relative">
        <Input
          type='search'
          placeholder='Search UrbanLuxe Admin....'
          className='h-[50px] w-[500px]'
        />
        <Search className='absolute right-5 cursor-pointer' />
      </div>
      <div className="notifications_container">
        <div className="bar">
          <Bell />
          <span className='bg-red-500 text-white'>1</span>
        </div>
        <div className="bar">
          <MessageSquare />
          <span className='bg-blue-600 text-white'>1</span>
        </div>
      </div>
      <div className="flex gap-5">
        {isLoaded ? (
          <ThreeDotsLoader />
        ) : (
          <>
            <UserButton />
            <div className="">
              <p className='text-sm font-semibold'>{username}</p>
              <span className='text-gray-700 text-sm'>Admin</span>
            </div>
          </>
        )}
      </div>
    </nav>
  )
}

export default AdminNavbar