import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation, useLoginMutation, useLoginWithGoogleMutation  } from '../redux/apis/authApi';

const Login = () => {
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const [loginWithGoogle, { data: googleLoginData, isSuccess }] = useLoginWithGoogleMutation();
  const [register] = useRegisterMutation();
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (isSuccess && googleLoginData) {
      navigate('/home');
    }
  }, [isSuccess, googleLoginData, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await login(userData).unwrap();
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle().unwrap();
    } catch (error) {
      console.error('Google login failed:', error);
    }
  };

  const handleRegister = async () => {
    try {
      await register(userData).unwrap();
      navigate('/');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };
  return (
    <div className='min-h-screen p-10 flex justify-center items-center bg-slate-200'>
      <form 
        className='h-[20rem] bg-white p-2 flex flex-col justify-center items-center gap-4'
        onSubmit={handleSubmit}
      >
        <div className='flex flex-col gap-2'>
          <label htmlFor="email" className="form-label">Email</label>
          <input 
            type="email" 
            className="form-control border p-2 rounded-md" 
            id="email" 
            value={userData.email} 
            onChange={handleChange} 
            placeholder="Enter Your Email" 
            required 
          />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor="password" className="form-label">Password</label>
          <input 
            type="password" 
            className="form-control border p-2 rounded-md" 
            id="password" 
            value={userData.password} 
            onChange={handleChange} 
            placeholder="Enter Your Password" 
            required 
          />
        </div>
        
        <button type='submit' className='bg-blue-500 px-4 py-2 rounded-lg text-slate-50'>
          Login
        </button>

        <button 
          type="button"
          onClick={handleGoogleLogin} 
          className='bg-blue-500 px-4 py-2 text-slate-50'
        >
          <i className='bi bi-google'></i> Continue With Google
        </button>
      </form>
    </div>
  )
};

export default Login;