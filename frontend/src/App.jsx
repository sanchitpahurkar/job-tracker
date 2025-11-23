import './App.css'
import CreateJob from './pages/CreateJob'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import JobBoard from './pages/JobBoard'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import ProtectedRoute from './utils/ProtectedRoute'

function App() {

  return (
    <div className=' inter-regular'>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/jobs' element={
          <ProtectedRoute>
            <JobBoard />
          </ProtectedRoute>
        }/>
        <Route path='/jobs/create' element={
          <ProtectedRoute>
            <CreateJob />
          </ProtectedRoute>
        }/>

        {/* auth routes */}
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/login' element={<Login />}/>
      </Routes>      
    </div>
  )
}

export default App
