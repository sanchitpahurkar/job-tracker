import axios from 'axios';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignIn = () => {
  const initialUser = {
    email: "",
    password: "",
  };

  const [authData, setAuthData] = useState({
    email: "",
    password: "",
  });

  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  // redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/login",
        authData
      );
      console.log("User Login successful", data);
      if (data?.token) {
        // AuthContext to persist token + user and set axios header
        login({ token: data.token, user: data.user });
        toast.success('Login successful');
        // redirect to landing page after successful login
        navigate('/');
      }
      
    } catch (error) {
      console.error("Error submitting form", error);
      const msg = error?.response?.data?.message || error.message || 'Login failed';
      toast.error(msg);
    }
    setAuthData(initialUser);
  };

  return (
    <div className='flex flex-col items-center justify-center py-20 gap-y-8 min-h-screen'>
      <div className='text-3xl font-bold'>Login Page</div>

      <form 
      onSubmit={handleLogin}
      className='flex flex-col lg:w-[20%] '
      >
        <label className='text-lg my-1'>Email Address</label>
        <input
          type="email"
          name="email"
          placeholder="example@domain.com"
          value={authData.email}
          onChange={handleChange}
          className='bg-white text-black p-2 outline-none rounded mb-3'
        />

        <label className='text-lg my-1'>Password</label>
        <input
          type="password"
          name="password"
          placeholder="●●●●●●●"
          value={authData.password}
          onChange={handleChange}
          className='bg-white text-black p-2 outline-none rounded mb-3'
        />

        <div className='flex flex-col items-center justify-center mt-6 gap-y-2 '>
            <button 
            type="submit"
            className='bg-amber-400 w-40 px-4 py-2 rounded-md font-bold text-black'
            >LogIn</button>

            <p className='text-gray-400'>Don't have an account? <Link to='/signup' className='text-amber-400'>SignUp</Link></p>
        </div>
      </form>
    </div>
  );
}

export default SignIn