import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [color, setcolor] = useState('white')

  return (
    <>
    <div className="whole_containe h-screen w-full relative" style={{backgroundColor: color}}>
      <div className='flex items-center justify-center gap-3 absolute bottom-20  inset-x-0'>
        <button className='btn outline-none px-4 py-1 rounded-full  shadow-lg text-white bg-red-500'
        onClick={()=>setcolor('red')}>RED</button>
        <button className='btn outline-none px-4 py-1 rounded-full  shadow-lg text-white bg-blue-500'
         onClick={()=>setcolor('blue')}>blue</button>
        <button  className='btn outline-none px-4 py-1 rounded-full  shadow-lg text-white bg-green-500'
         onClick={()=>setcolor('green')}>GREEN</button>
                 <button  className='btn outline-none px-4 py-1 rounded-full  shadow-lg text-white bg-black'
         onClick={()=>setcolor('white')}>WHITE</button>
      </div>
    </div>
    </>
  )
}

export default App
