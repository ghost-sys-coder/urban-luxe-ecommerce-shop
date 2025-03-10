import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import Image from 'next/image'

const Footer = () => {
    return (
        <footer className='mt-10 bg-shades-dark py-10 px-5'>
            <div className="flex gap-10 justify-between items-start flex-wrap">
                <h3 className='text-offwhite font-bold text-2xl'>UrbanLuxe256</h3>
                <div className="min-w-[350px] flex-1">
                    <h4 className='text-offwhite-warm text-sm font-medium'>NEW TO URBANLUXE256</h4>
                    <div className="">
                        <Label className='text-offwhite-cool text-sm font-thin' htmlFor='subscribe'>Subscribe to our newsletter</Label>
                        <div className="flex flex-col sm:flex-row gap-2 sm:h-[40px] my-4">
                            <Input
                                className='h-full sm:w-[300px] bg-offwhite-warm'
                                type='email'
                                id='subscribe'
                                placeholder='Enter your E-mail Address'
                            />
                            <Button variant={"outline"} className="h-full bg-transparent text-offwhite" type='submit'>Subscribe</Button>
                        </div>
                        <div className="flex justify-start items-start gap-2">
                            <Input
                                type='checkbox'
                                className='h-5 w-5 bg-transparent'
                            />
                            <p className='text-gray-400 text-[12px]'>I agree to UrbanLuxe256 Privacy and Cookie Policy. You can unsubscribe from the newsletter any time.</p>
                        </div>
                    </div>
                </div>
                <div className="">
                    <h5 className='uppercase text-sm text-offwhite-cool font-medium'>Download the UrbanLuxe256 Free App</h5>
                    <div className="my-3">
                        <div className="flex gap-2 items-center">
                            <Image
                                src={"/google-play.png"}
                                alt='google play'
                                width={50}
                                height={50}
                            />
                            <div className="">
                                <span className='text-white text-sm'>GET IT ON</span>
                                <p className='text-offwhite text-sm'>Google Play</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer