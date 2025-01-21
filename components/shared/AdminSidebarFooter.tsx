import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { User2, ChevronUp, LogOut } from 'lucide-react'
import { SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar'
import { SignOutButton } from '@clerk/nextjs'
import { Button } from '../ui/button'

interface AdminSidebarFooterProps {
    username?: string | null;
}

const AdminSidebarFooter: React.FC<AdminSidebarFooterProps> = ({username}) => {
    return (
        <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton>
                                <User2 /> 
                                <span>{username === null ? "Default" : username}</span>
                                <ChevronUp className="ml-auto" />
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            side="top"
                            className="w-[--radix-popper-anchor-width]"
                        >
                            <DropdownMenuItem>
                                <span>Account</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <span>Billing</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <SignOutButton signOutOptions={{redirectUrl: "/sign-in"}}>
                                    <Button variant={"destructive"} className='w-full'>
                                        <LogOut />
                                        <span>Sign Out</span>
                                    </Button>
                                </SignOutButton>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
    )
}

export default AdminSidebarFooter