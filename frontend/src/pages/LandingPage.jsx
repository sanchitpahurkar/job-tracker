import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const LandingPage = () => {

  const { isAuthenticated } = useAuth();

  return (
    <>
      <section className='flex flex-col items-center justify-center h-screen gap-y-10 landing-bg'>
        <div className='md:text-8xl text-6xl font-bold text-center'>Own your job hunt</div>
        <div className='md:text-4xl text-3xl font-bold flex flex-row gap-x-4'><p className='text-amber-300'>Track.</p><p className='text-red-400'>Prioritize.</p><p className='text-green-300'>Win.</p></div>
        <p className='text-lg lg:w-[50%] w-[80%] text-center'>One simple dashboard to log applications, follow ups, interview stages, and offers — so you spend less time wondering and more time closing opportunities.</p>

        {!isAuthenticated ? (
          <button className='bg-amber-400 px-4 py-2 rounded-md font-bold text-black'><Link to='/signup'>Get Started</Link></button>
        ) : (
          <button className='bg-amber-400 px-4 py-2 rounded-md font-bold text-black'><Link to='/jobs'>Explore</Link></button>
        )}
      </section>
    </>
  )
}

export default LandingPage