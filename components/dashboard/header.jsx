import React, { useState, useEffect, Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'
import withReactContent from 'sweetalert2-react-content'
import { logoutUser } from '../../service/httpClient'
import moment from 'moment'
import { MdSettings } from 'react-icons/md'
import { HiKey, HiLogout } from 'react-icons/hi'
import { Menu, Transition } from '@headlessui/react'
import { useRecoilState } from 'recoil'
import { tokenState, userState } from '../../atoms/userAtom'
import ChangePass from '../../src/change-password'


const MySwal = withReactContent(Swal)

const Toast = MySwal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true
})

const times = [
  [0, 11, "Selamat Pagi, "],
  [12, 14, "Selamat Siang, "],
  [15, 17, "Selamat Sore, "],
  [18, 23, "Selamat Malam, "]
]

export default function HeaderDashboard() {
  const [token, setToken] = useRecoilState(tokenState)
  const [user, setUser] = useRecoilState(userState)
  const [time, setTime] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const currentTime = moment().format('HH')
    for (let i = 0; i < times.length; i++) {
      if (currentTime >= times[i][0] && currentTime <= times[i][1]) {
        setTime(times[i][2])
      }
    }
  })

  const handleChangePass = () => {
    navigate(`/change-password?id=${user.id}`)
    return <ChangePass />
  }

  const handleLogout = () => {
    logoutUser().then((res) => {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      setToken('')
      setUser({})
      navigate('/login')

      Toast.fire({
        icon: 'warning',
        title: <p>{res.data.message}</p>,
      })
    })
  }

  return (
    <header className='flex items-center justify-between py-5 px-10 bg-white shadow-inner sticky'>
      <h1 className='text-2xl font-bold text-lime-500 hover:cursor-default'>
        <span className='text-gray-500'>{time}</span>
        {user?.name}
      </h1>

      <Menu as={`div`} className='flex gap-5'>
        <div className='relative'>
          {
            user?.image ? <img src={`http://localhost:3911/assets/${user.image}`} className='w-10 h-10 rounded-full' alt="" /> : <img src={`http://localhost:3911/assets/default.png`} className='w-10 h-10 rounded-full' alt="" />
          }
          <span className='top-0 left-7 absolute w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full'></span>
        </div>
        <Menu.Button className='text-gray-500 text-2xl hover:cursor-pointer hover:text-lime-500'>
          <MdSettings />
        </Menu.Button>

        {/* Dropdown */}
        <Transition as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute z-50 right-8 w-52 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="p-2">
              <Menu.Item>
                {({ active }) => (
                  <button onClick={handleChangePass} className={`${active ? 'bg-lime-500 text-white' : 'text-lime-500'} group flex gap-6 rounded-md items-center w-full p-2 text-sm font-semibold`}>
                    <HiKey className='text-lg' />
                    Ganti Password
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button onClick={handleLogout} className={`${active ? 'bg-lime-500 text-white' : 'text-lime-500'} group flex gap-6 rounded-md items-center w-full p-2 text-sm font-semibold`}>
                    <HiLogout className='text-lg' />
                    Keluar
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </header>
  )
}
