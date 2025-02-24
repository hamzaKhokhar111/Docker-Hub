import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';


function SignIn() {
    const [fromdata,setformdata]=useState('');
    const navigate=useNavigate();

    const handleChange=(e)=>{
        setformdata({
            ...fromdata,
            [e.target.id]:e.target.value
        });
    };

    const handleSubmit=(e)=>{
        e.preventDefault();


    }

  
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type='text' placeholder='Username' className='border p-3 rounded-lg' id='username' onChange={handleChange} />
        <input type='password' placeholder='Password' className='border p-3 rounded-lg' id='password' onChange={handleChange} />
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90'>Sign in</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Don't have an account?</p>
        <Link to={'/signup'}>Sign Up</Link>
      </div>
    </div>
  )
}

export default SignIn