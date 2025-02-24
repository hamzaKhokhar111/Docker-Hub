import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {
    const [formdata, setFormdata] = useState({});  // ✅ Initialize as an object
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormdata({
            ...formdata,  // ✅ Fixed typo (`formdata` instead of `fromdata`)
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resp = await fetch("http://localhost:3000/api/user/signup", { // ✅ Fixed API endpoint
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formdata),  // ✅ Fixed typo (`formdata`)
            });

            const data = await resp.json();  // ✅ Corrected `resp` instead of `response`

            if (resp.ok) {
                alert('SignUp successful');
                navigate('/');
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Sign Up failed", error);
            alert("Something went wrong");
        }
    };

    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input type='text' placeholder='Username' className='border p-3 rounded-lg' id='username' onChange={handleChange} />
                <input type="email" placeholder='Email' className='border p-3 rounded-lg' id='email' onChange={handleChange} />
                <input type='password' placeholder='Password' className='border p-3 rounded-lg' id='password' onChange={handleChange} />

                <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90'>Sign Up</button>
            </form>
            <div className='flex gap-2 mt-5'>
                <p>Already have an account?</p>
                <Link to={'/signin'} className='text-blue-500'>Sign In</Link>
            </div>
        </div>
    );
}

export default SignUp;
