import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {

  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); 
  };

  return (
    <nav className='flex flex-row justify-between items-center px-8 py-4 shadow-md shadow-amber-200 bg-white text-black  inter-regular'>
        {/* brand */}
        <Link to='/' className='text-xl font-bold'>Job Tracker</Link>

        {/* Links */}
        <div className='flex flex-row gap-x-12 font-semibold'>
            

            {!isAuthenticated ? (
            <>
              <Link to='/login' className='bg-amber-400 w-24 py-1 flex items-center justify-center rounded-md  text-black font-bold cursor-pointer'>Login</Link>
            </>
          ) : (
            <>
              <Link to='/jobs' className='pt-1'>Jobs</Link>
              <Link to='/jobs/create' className='pt-1'>Create</Link>

              <div className='bg-amber-400 w-24 py-1 flex items-center justify-center rounded-md  text-black font-bold cursor-pointer '>
                <button onClick={handleLogout}>Logout</button>              
              </div>
            </>
            
          )}
        </div>
    </nav>
  )
}

export default Navbar