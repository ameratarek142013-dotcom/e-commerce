'use client'
import React from 'react'
import { ThreeDots } from 'react-loader-spinner'

export default function loading() {
    return (
        <>
            <div className='h-screen flex items-center justify-center'>
                <div>
                    <ThreeDots
                        visible={true}
                        height="80"
                        width="80"
                        color="#4fa94d"
                        radius="9"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>

            </div>
        </>
    )
}

