import { useState } from 'react'
import './App.css'
import AppRoutes from './routes/AppRoutes'
import { Button, Card, CardContent, Typography } from '@mui/material'

function App() {
  const [count, setCount] = useState(0)


  return (
    <>
    {/* <div className='min-h-screen flex items-center justify-center bg-black'>
      <h1 className='text-5xl font-bold text-red-500'>
        StreamVerseX 🚀
      </h1>
    </div> */}
    <AppRoutes/>
    {/* <main className="min-h-screen flex items-center justify-center p-6">
      <Card sx={{ maxWidth: 420, width: "100%" }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            StreamVerseX
          </Typography>

          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Your entertainment universe.
          </Typography>

          <Button variant="contained" fullWidth>
            Get Started
          </Button>
        </CardContent>
      </Card>
    </main> */}
    
    </>
  )
}

export default App
