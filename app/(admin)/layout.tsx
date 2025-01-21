import React, { ReactNode } from 'react'
import { cookies } from 'next/headers'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import AdminSidebar from '@/components/shared/AdminSidebar'
import AdminNavbar from '@/components/shared/AdminNavbar'


const AdminLayout = async ({ children }: { children: ReactNode }) => {
    const cookieStore = await cookies();
    const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";
    return (
        <SidebarProvider defaultOpen={defaultOpen}>
            <AdminSidebar /> 
            <main className='w-full relative bg-offwhite'>
                <SidebarTrigger className='absolute bottom-0 left-0' />
                <AdminNavbar />
                <div className="bg-offwhite p-4">
                 {children}
                </div>
            </main>
        </SidebarProvider>
    )
}

export default AdminLayout