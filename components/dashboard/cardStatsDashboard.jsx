import React from 'react'
import CountUp from 'react-countup'

export default function Card({ count, title, icon, color }) {
  return (
    <div className=''>
      <div className="relative flex items-center">
        <div className="h-44 w-48 rounded-lg bg-white p-3 px-7">
          <h1 className='font-bold text-gray-900 text-[4rem]'><CountUp end={count} duration={3} /></h1>
          <h3 className='font-bold text-gray-400 text-[1rem]'>{title}</h3>
        </div>
        <div className={`absolute top-[-17px] right-[-17px] w-16 h-16 border-4 border-gray-300 ${color} text-white rounded-full`}>
          <div className="items-center m-0 w-[48px] h-[48px]">
            <div className='text-4xl ml-[10px] mt-[8px] justify-center'>
              {icon}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
