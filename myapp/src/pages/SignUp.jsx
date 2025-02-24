import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';


function SignUp() {
    const [fromdata,setformdata]=useState('');
    const navigate=useNavigate();

    const handleChange=(e)=>{
        setformdata({
            ...fromdata,
            [e.target.id]:e.target.value
        });
    };

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const resp=await fetch("http://localhost:3000/api/user/signin",{
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(fromdata),
                

            });
            const data = await response.json();
            if(resp.ok){
                alert('SignIn suceesfull');
                navigate('/')
            }else{
                alert(data.message)
            }
        } catch(error) {
            console.error("Sign IN fail",error);
            alert("Some thing went wrong")
            
        }


    }

  
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type='text' placeholder='Username' className='border p-3 rounded-lg' id='username' onChange={handleChange} />
        <input type="text"  placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange} />
        <input type='password' placeholder='Password' className='border p-3 rounded-lg' id='password' onChange={handleChange} />
      
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90'>Sign Up</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Don't have an account?</p>
        <Link to={'/signin'}>Sign In</Link>
      </div>
    </div>
  )
}

export default SignUp