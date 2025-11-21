import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='flex flex-row justify-between items-center px-8 py-4 shadow shadow-amber-200 bg-white text-black'>
        {/* brand */}
        <Link to='/' className='text-xl font-bold'>Job Tracker</Link>

        {/* Links */}
        <div className='flex flex-row gap-x-8 font-semibold'>
            <Link to='/jobs'>Jobs</Link>
            <Link to='/jobs/create'>Create</Link>
        </div>
    </nav>
  )
}

export default Navbar