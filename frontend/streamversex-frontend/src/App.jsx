import { useState } from 'react'
import './App.css'
import AppRoutes from './routes/AppRoutes'

function App() {
  const [count, setCount] = useState(0)
    console.log(import.meta.env.VITE_API_BASE_URL);


  return (
    <>
    {/* <div className='min-h-screen flex items-center justify-center bg-black'>
      <h1 className='text-5xl font-bold text-red-500'>
        StreamVerseX 🚀
      </h1>
    </div> */}
    <AppRoutes/>
    
    </>
  )
}

export default App
