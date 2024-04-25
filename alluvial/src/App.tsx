import { useRef } from 'react'
import './App.css'
import { p5sketch } from './assets/sketch.ts'
import p5 from 'p5'

function App() {
  const container = useRef(null)
  const embed = new p5(p5sketch.function, container.current ?? undefined);
  return (
    <>
      <main>
        <section id="p5Canvas" className='p5Canvas' ref={container}></section>
      </main>
    </>
  )
}

export default App
