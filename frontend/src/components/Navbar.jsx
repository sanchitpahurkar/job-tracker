import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react';

const Navbar = () => {

  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/login'); 
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className='relative flex flex-row justify-between items-center px-6 py-4 bg-white text-black inter-regular'>
        {/* brand */}
        <Link to={'/'} className='flex flex-row items-center justify-center gap-x-3'>
          <img src="/logo.png" className='h-8' alt="Logo" />
          <div className='text-xl font-bold'>JobStride</div>
        </Link>

        {/* Desktop links */}
        <div className='hidden md:flex flex-row gap-x-8 font-semibold items-center'>
            {!isAuthenticated ? (
              <Link to='/login' className='bg-amber-400 w-24 py-1 flex items-center justify-center rounded-md text-black font-bold cursor-pointer'>Login</Link>
            ) : (
              <>
                <Link to={'/jobs'} className='pt-1'>Jobs</Link>
                <Link to={'/jobs/create'} className='pt-1'>Create</Link>
                <div className='bg-amber-400 w-24 py-1 flex items-center justify-center rounded-md text-black font-bold cursor-pointer '>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              </>
            )}
        </div>

        {/* Mobile hamburger */}
        <div className='md:hidden'>
          <button
            aria-label='Toggle menu'
            onClick={() => setMenuOpen(v => !v)}
            className='p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-300'
          >
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu panel */}
        {menuOpen && (
          <div className='absolute right-4 top-full mt-2 w-48 bg-white text-black rounded-md shadow-lg md:hidden z-50'>
            <div className='flex flex-col py-2'>
              {!isAuthenticated ? (
                <>
                  <Link to={'/login'} onClick={closeMenu} className='px-4 py-2 hover:bg-gray-100'>Login</Link>
                  <Link to={'/signup'} onClick={closeMenu} className='px-4 py-2 hover:bg-gray-100'>Sign Up</Link>
                </>
              ) : (
                <>
                  <Link to={'/jobs'} onClick={closeMenu} className='px-4 py-2 hover:bg-gray-100'>Jobs</Link>
                  <Link to={'/jobs/create'} onClick={closeMenu} className='px-4 py-2 hover:bg-gray-100'>Create</Link>
                  <button onClick={handleLogout} className='text-left px-4 py-2 hover:bg-gray-100'>Logout</button>
                </>
              )}
            </div>
          </div>
        )}
    </nav>
  )
}

export default Navbar