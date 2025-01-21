import React, { ReactNode } from 'react'
import Navbar from '@/components/shared/Navbar'

const FrontendLayout = ({ children }: { children: ReactNode }) => {

    return (
        <main className='root'>
            <Navbar />
            {children}
        </main>
    )
}

export default FrontendLayout;