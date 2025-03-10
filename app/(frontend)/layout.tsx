import React, { ReactNode } from 'react'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/frontend/Footer';

const FrontendLayout = ({ children }: { children: ReactNode }) => {

    return (
        <main className='root'>
            <Navbar />
            {children}
            <Footer />
        </main>
    )
}

export default FrontendLayout;