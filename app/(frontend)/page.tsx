import CategoriesSidebar from '@/components/frontend/CategoriesSidebar'
import CategoriesSlider from '@/components/frontend/CategoriesSlider'
import Herobox from '@/components/frontend/Herobox'
import React from 'react'

const Home = () => {
  return (
    <div className="px-4">
      <div className="flex">
      <CategoriesSidebar />
      <Herobox />
      </div>
      <CategoriesSlider />
    </div>
  )
}

export default Home