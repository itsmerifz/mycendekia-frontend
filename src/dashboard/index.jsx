import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'
import withReactContent from 'sweetalert2-react-content'
import { logoutUser } from '../../service/httpClient'

const MySwal = withReactContent(Swal)

const Toast = MySwal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true
})

export default function Dashboard() {
  const [token, setToken] = useState('')
  const [user, setUser] = useState({})

  const navigate = useNavigate()

  useEffect(() => {
    setToken(localStorage.getItem('token'))
    setUser(JSON.parse(localStorage.getItem('user')))
  }, [token])

  if (!token) {
    navigate('/login')
  }

  const handleLogout = () => {
    logoutUser().then(() => {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      navigate('/login')

      Toast.fire({
        icon: 'warning',
        title: <p>Logged out successfully</p>,
      })
    })
  }

  return (
    <div className='flex gap-4 mt-3 ml-3'>
      <h1>Selamat Datang, {user.name}</h1>
      <button className='w-20 h-11 bg-red-500 text-white rounded-lg' onClick={handleLogout}>Keluar</button>
    </div>
  )
}
