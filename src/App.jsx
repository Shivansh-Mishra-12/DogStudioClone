  import { useEffect, useRef, useState } from 'react'
  import './App.css'
  import { Canvas } from '@react-three/fiber'
  import Model from './components/Model'
  import Header from './components/Header'
  import HeroSection from './components/HeroSection'
  import About from './components/About'
  import Work from './components/Work'
 

  function App() {
    const [canvasBg, setcanvasBg] = useState('/background-l.png')
    const [newCanvasBg, setnewCanvasBg] = useState(null)
    const [fade, setfade] = useState(false)
    const [Texture1, setTexture1] = useState(2)
    const [Texture2, setTexture2] = useState(19)
    const [bgcolor, setbgcolor] = useState('black')
    const [animate, setanimate] = useState(false)
    const [material, setmaterial] = useState({
      uMatcap1: { value: Texture1 },
      uMatcap2: { value: Texture2 },
      uProgress: { value: 1.0 }
    })


    function Animation(texture) {
      setanimate(true)
      // setTexture2(texture)
      
    }
    const DefaultHoverHandler = () => {
      HoverHandler('background-l.png', 'black', 2) 
    }
    const HoverHandler = (path, color, texture) => {
      if (path == canvasBg) { return }
      setTexture2(texture)
      Animation(texture)
      // setanimate(true)
      setnewCanvasBg(path)
      setfade(true)
      setbgcolor(color)


      setTimeout(() => {
        setcanvasBg(path)
        setnewCanvasBg(null)
        setfade(false)
      });
    }

    return (
      <>
        <main className='w-screen min-h-screen relative '>

          <Canvas className='fixed! inset-0 h-screen! w-screen z-10 bg-no-repeat bg-cover'
            style={{
              backgroundImage: `url(${canvasBg})`,
              backgroundColor: `${bgcolor}`,
              opacity: fade ? 0 : 1,
              transition: 'all',
              transitionDuration: '0.3s'
            }} dpr={[1, 1.5]} >

            <Model animate={animate} Texture1={Texture1} setTexture1={setTexture1} setTexture2={setTexture2} Texture2={Texture2} setanimate={setanimate} />

          </Canvas>

          <div id='HTMLPortion' className='max-w-[92.5%] mx-auto'>
            <Header />
            <section id='sec1' className='w-full h-[calc(100vh-8rem)] relative z-20'>
              <HeroSection />
            </section>
            <section id='sec2' className='w-full min-h-screen relative  bg-transparent z-20'> <About /> </section>
            <section id='sec3' className='w-full min-h-screen relative bg-transparent z-20'> <Work DefaultHoverHandler={DefaultHoverHandler} HoverHandler={HoverHandler} /> </section>
            {/* <section id='sec4' className='w-full min-h-screen relative bg-transparent z-20'>Sec-3</section>
            <section id='sec4' className='w-full min-h-screen relative bg-transparent z-20'>Sec-4</section> */}
          </div>
        </main>
      </>
    )
  }

  export default App
