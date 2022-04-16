import React from 'react'

export default function CardResult({ title, author, year}) {
  return (
    <div className='w-[800px]'>
      <div className='h-48 p-6 bg-white rounded-lg border border-gray-200 shadow hover:bg-gray-100 hover:cursor-pointer'>
        <h1 className='font-bold text-lime-500 text-[2rem] truncate w-[590px] h-auto'>{title}</h1>
        <h3 className='font-normal text-base w-[550px]'>{author}</h3>
        <p className='text-gray-400 font-bold mt-4'>{year}</p>
      </div>
    </div>
  )
}
