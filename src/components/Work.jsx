import React, { useEffect, useRef } from 'react'
import data from '../data.json'
const Work = ({DefaultHoverHandler,HoverHandler}) => {

    return (
        <div className='w-full min-h-screen flex justify-between'>
            <div className='w-full relative -left-3 min-h-screen'>
                <div className='h-fit w-full mt-3'>
                    <span style={{ 'wordSpacing': '0.2rem', }} className='opacity-50 pl-48  text-[0.5rem] tracking-[0.16rem]' >
                        FEATURED PROJECTS
                    </span>
                </div>

                <div className='w-full h-full py-11'>
                    {
                        data.map((elem) => {
                            return (<div onMouseEnter={()=>{HoverHandler(elem.bg , elem.bgColor,elem.matcap)}} onMouseLeave={DefaultHoverHandler} key={elem.id} className='cursor-pointer my-20 flex gap-16 w-full h-fit hover:**:opacity-75 **:transition-all **:duration-300 text-[##FAF9F6]'>
                                <span className='uppercase opacity-25 text-[0.7rem] tracking-[0.16rem] italic font-GT-Bold pt-2'>
                                    ${elem.small}
                                </span>
                                <h1 className='text-[4.75rem] font-[50] tracking-widest opacity-15'>
                                    {elem.title}
                                </h1>
                            </div>)
                        })
                    }
                </div>

            </div>


        </div>
    )
}

export default Work
