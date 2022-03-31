import React, { useEffect } from 'react'
import NavLink from './navLinks'
import { HiHome, HiUser } from 'react-icons/hi'
import { MdArticle } from 'react-icons/md'

export default function Sidebar() {

  return (
    <div className='bg-gray-50 h-screen overflow-y-scroll scrollbar-hide max-w-[15rem] p-5 text-lime-500 shadow'>
      <div className='space-y-4'>
        <h1 className='font-bold text-3xl pb-7 border-b border-gray-200'>myCendekia</h1>

        <div className='space-y-6 pt-10'>
          <div className="flex flex-col gap-5">
            <NavLink to='/dashboard'>
              <HiHome className='text-3xl' />
              <span className='text-xl'>Home</span>
            </NavLink>
            <NavLink to='/dashboard/users'>
              <HiUser className='text-3xl' />
              <span className='text-xl'>Users</span>
            </NavLink>
            <NavLink to='/dashboard/articles'>
              <MdArticle className='text-3xl' />
              <span className='text-xl'>Articles</span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}
