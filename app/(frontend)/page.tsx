import CategoriesSidebar from '@/components/frontend/CategoriesSidebar'
import Herobox from '@/components/frontend/Herobox'
import React from 'react'

const Home = () => {
  return (
    <div className="flex px-4">
      <CategoriesSidebar />
      <Herobox />
    </div>
  )
}

export default Home