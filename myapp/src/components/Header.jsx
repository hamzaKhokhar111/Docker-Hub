import React from 'react'
import { Link } from 'react-router-dom'
export default function Header() {
  return (
    <header className='bg-slate-300 '>
        <div className="flex justify-between items-center max-w-6ml mx-auto p-3" >
        <h1 className='font-bold text-sm sm:text-xl flex '>
            <span>Sahand</span>
            <span>Estate</span>
        </h1>
        <form className='bg-slate-500 p-3 rounded-lg'>
            <input type="text" placeholder='Search' className='bg-transparent' />
        </form>
        <ul className='flex gap-4'>
            <Link to='/'>
            <li  className='hidden sm:inline hover:cursor-pointer hover:underline text-slate-800' >Home</li>
            </Link>
          <Link to='about'>
          <li  className='hidden sm:inline hover:cursor-pointer hover:underline text-slate-800'>About</li>
          </Link>
          <Link to='signIn'>
          <li className='hidden sm:inline hover:cursor-pointer hover:underline text-slate-800'>Sign_IN</li>
          </Link>
        </ul>
        </div>
    </header>
  )
}