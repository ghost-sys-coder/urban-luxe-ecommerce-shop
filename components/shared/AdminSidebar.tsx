"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

import AdminSidebarFooter from './AdminSidebarFooter'
import { useUserContext } from '@/providers/context/UserContext'
import { adminParameters } from '@/constants'


const AdminSidebar = () => {
    const pathname = usePathname();
    const { user } = useUserContext();

    return (
        <Sidebar>
            <SidebarHeader className='text-white font-semibold text-xl pb-0 bg-primary py-[10px]'>
                <Link href={"/admin"} className='flex gap-3 justify-start items-start'>
                    UrbanLuxe <span className='bg-white py-1 px-3 rounded-sm text-theme-carbon_black text-sm font-sans'>Admin</span>
                </Link>
            </SidebarHeader>
            <SidebarContent className="bg-theme-carbon_black">
                <SidebarGroupContent className='overflow-y-scroll no-scrollbar px-3'>
                    <SidebarMenu>
                        {/* Add the parameters here */}
                        {adminParameters.map((parameter) => (
                            <React.Fragment key={parameter.category}>
                                <SidebarGroupLabel className='text-offwhite-cool font-medium mt-4 text-[15px]'>
                                    {parameter.category}
                                </SidebarGroupLabel>
                                {parameter.items.map((subItem) => (
                                    <SidebarMenuItem key={subItem.title}>
                                        <SidebarMenuButton asChild className={pathname === subItem.url ? "bg-primary text-white py-4 hover:bg-primary hover:text-white" : "hover:bg-primary hover:text-white hover:mt-1 py-4 text-offwhite"}>
                                            <Link href={subItem.url}>
                                                <subItem.icon className='h-10 w-10' />
                                                <span>{subItem.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </React.Fragment>
                        ))}
                        {/* Add the parameters here */}
                    </SidebarMenu>
                </SidebarGroupContent>
                <SidebarGroup />
            </SidebarContent>

            <AdminSidebarFooter username={user?.username} />
        </Sidebar>
    )
}

export default AdminSidebar
