import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const productTypes = [
  { type: "Clothing", value: "clothing" },
  {type: "Electronics", value: "electronics"}
]

const CreateNewProduct = () => {
  return (
    <div className='w-full'>
      <Tabs defaultValue="clothing" className="w-full">
        <TabsList>
          {productTypes.map(({ type, value }) => (
            <TabsTrigger value={value} key={value}>{type}</TabsTrigger>  
          ))}
        </TabsList>
        <TabsContent value="clothing">Make changes to your account here.</TabsContent>
        <TabsContent value="electronics">Change your password here.</TabsContent>
      </Tabs>

    </div>
  )
}

export default CreateNewProduct