import './App.css'
import CreateJob from './pages/CreateJob'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import JobBoard from './pages/JobBoard'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/jobs' element={<JobBoard />}/>
        <Route path='/jobs/create' element={<CreateJob/>}/>
      </Routes>      
    </>
  )
}

export default App
