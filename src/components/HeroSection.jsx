import React from 'react'
const HeroSection = () => {
    return (
        <>
        <div className='w-full h-full box-border flex justify-between items-center'>
            
            <div id='left' className='w-1/2 h-full pt-16 pr-4'>
                <div className='w-fit h-fit float-end text-end text-[7rem] tracking-tight flex flex-col gap-0 leading-26 font-GT-Bold font-semibold'>
                    <h1>We</h1>
                    <h1>Make</h1>
                    <h1>Good</h1>
                    <h1>Shit</h1>
                </div>
            </div>

            <div id='right' className='w-1/2 h-full '></div>
        </div>
        </>


    )
}

export default HeroSection
