import React from 'react'
import { ThreeDots } from 'react-loader-spinner'
const ThreeDotsLoader = () => {
    return (
        <ThreeDots
            visible={true}
            height="60"
            width="60"
            color="#D3D3D3"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
    )
}

export default ThreeDotsLoader