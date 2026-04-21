import React from 'react'
const About = () => {
    return (
        <div className='w-full h-full box-border flex justify-between items-center'>

            <div id='right' className='w-1/2 h-full '></div>

            <div id='left' className='w-1/2 h-full pt-16 pr-4'>
                <div className='w-[28.438rem] h-fit text-start flex flex-col gap-6'>
                    <h3 title='Tomorrowland' className='w-fit mx-auto text-[1.45rem] font-[350] tracking-wide text-[#f0eded]'>Dogstudio is a multidisciplinary  <br />
                        creative studio at the intersection <br />
                        of art, design and technology.</h3>

                    <p className='w-fit mx-auto text-[1rem] font-[350] tracking-tight text-[#a3a3a3] leading-[1.6]'>Our goal is to deliver amazing experiences that make <br />
                        people talk, and build strategic value for brands, tech, <br />
                        entertainment, arts & culture.</p>

                    <span className='w-fit mx-auto text-[0.89rem] font-[350] tracking-wide text-[#ffff] leading-[1.6]'>Facebook /
                        Instagram / 
                        Dribbble /
                        Twitter /
                        Newsletter</span>

                </div>
            </div>
        </div>
    )
}

export default About
