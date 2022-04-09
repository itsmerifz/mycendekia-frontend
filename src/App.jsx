import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { Link } from 'react-router-dom';
import moment from 'moment'
import { searchState } from '../atoms/searchAtom';
function App() {
  const [search, setSearch] = useRecoilState(searchState)
  const [searchTemp, setSearchTemp] = useState('')
  const navigate = useNavigate();
  const token = localStorage.getItem('token')
  const user = localStorage.getItem('user')

  const handleSearch = e => {
    e.preventDefault()
    setSearch(searchTemp)
    navigate(`/search?keyword=${search}`)
  }

  return (
    <div className="scrollbar-hide">
      {/* Navbar */}
      <nav className='bg-white text-gray-700 hover:text-lime-400 px-2 py-4 rounded'>
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <h3 className='font-bold text-white text-[2rem]'>
            &nbsp;
          </h3>
          <ul className="flex justify-between items-center font-semibold">
            {
              token && user ?
                (
                  <>
                    <li className="mr-4">
                      <Link to='/dashboard' className="text-gray-500 hover:text-lime-400 transition-all">
                        Dashboard
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="mr-4">
                      <Link to='/login' className="text-gray-500 hover:text-lime-400 transition-all">
                        Masuk
                      </Link>
                    </li>
                    <li className="mr-4">
                      <Link to='/register' className="text-gray-500 hover:text-lime-400 transition-all">
                        Daftar
                      </Link>
                    </li>
                  </>
                )
            }
          </ul>
        </div>
      </nav >

      {/* Main */}
      <main className="container mx-auto px-2" >
        <div className="flex flex-col items-center align-middle justify-center">
          <h3 className='font-bold text-lime-500 text-[4rem]'>
            myCendekia
          </h3>
          <div className="p-4 mt-3">
            <form action="#" onSubmit={handleSearch}>
              <label htmlFor="table-search" className="sr-only">Search</label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                </div>
                <div className="flex gap-3 items-center">
                  <input type="text" id="search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg font-semibold focus:outline-none focus:border-lime-500 w-[500px] pl-10 p-2.5  " placeholder="" value={searchTemp} onChange={e => setSearchTemp(e.target.value)} />
                  <button type='button' className='text-white bg-lime-500 rounded-lg hover:bg-lime-600 transition-all transform font-semibold w-24 h-[42px]' onClick={handleSearch}>Cari</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer footer className="bg-transparent bottom-0 right-4 text-gray-700 px-2 py-4 absolute" >
        <div className="container flex flex-col items-center justify-center">
          <p className="text-center text-gray-500">
            &copy; {moment().format("YYYY")} myCendekia - Pimpinan Cabang Istimewa Muhammadiyah Taiwan
          </p>
        </div>
      </footer>



    </div >
  )
}

export default App
