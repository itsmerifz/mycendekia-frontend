import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useRecoilState } from 'recoil'
import { searchState } from '../../atoms/searchAtom'
import { searchArticle } from '../../service/httpClient'

export default function Search() {
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useRecoilState(searchState)

  useEffect(() => {
    console.log(search);
    searchArticle(search)
  },[])

  const handleSearch = e => {
    e.preventDefault()
    searchArticle(search).then(res => {
      console.log(res.data);
      setIsLoading(false)
    })
  }

  return (
    <div className='h-screen'>
      {/* Navbar */}
      <nav className='bg-white text-gray-700 hover:text-lime-400 px-2 py-4 rounded h-20 sticky top-0 z-50 shadow'>
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <div className='flex gap-6'>
            <h3 className='font-bold text-lime-500 text-[2rem]'>
              <Link to="/" className="">myCendekia</Link>
            </h3>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
              </div>
              <div className="flex gap-3 items-center">
                <input type="text" id="search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg font-semibold focus:outline-none focus:border-lime-500 w-[500px] pl-10 p-2.5" value={search} onChange={e => setSearch(e.target.value)} />
                <button type='button' className='text-white bg-lime-500 rounded-lg hover:bg-lime-600 transition-all transform font-semibold w-24 h-[42px]' onClick={handleSearch}>Cari</button>
              </div>
            </div>
          </div>
          <ul className="flex justify-between items-center font-semibold">
            <li className="mr-4">
              <a href="#" className="text-gray-700 hover:text-lime-400 transition-all transform">
                Masuk
              </a>
            </li>
            <li className="mr-4">
              <a href="#" className="text-gray-700 hover:text-lime-400 transition-all transform">
                Daftar
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}