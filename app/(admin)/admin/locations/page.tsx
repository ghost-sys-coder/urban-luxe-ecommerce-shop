import React from 'react'
import LocationForm from './LocationForm'

const page = () => {
    return (
        <div className='w-full'>
            <div className="w-full flex flex-col gap-3 mb-10">
                <h1 className='text-xl font-semibold'>Add a new location</h1>
                <p className='font-thin'>These are possible client locations for delivery and pick up.</p>
            </div>
            <LocationForm />
        </div>
    )
}

export default page