import BestSellers from '@/components/frontend/BestSellers'
import CategoriesSidebar from '@/components/frontend/CategoriesSidebar'
import CategoriesSlider from '@/components/frontend/CategoriesSlider'
import Herobox from '@/components/frontend/Herobox'
import ProductsByTags from '@/components/frontend/ProductsByTags'
import React from 'react'

const Home = () => {
  return (
    <div className="px-4">
      <div className="flex">
      <CategoriesSidebar />
      <Herobox />
      </div>
      <CategoriesSlider />
      <BestSellers />
      <ProductsByTags tags='boys' title="Men's Sneakers" />
      <ProductsByTags tags='Women' title="Women's Sneakers" />
    </div>
  )
}

export default Home