import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { tokenState, userState } from '../../atoms/userAtom'
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
  const [token, setToken] = useRecoilState(tokenState)
  const [user, setUser] = useRecoilState(userState)

  const navigate = useNavigate()

  const handleLogout = () => {
    logoutUser().then(() => {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      setToken('')
      setUser({})
      navigate('../login')

      Toast.fire({
        icon: 'warning',
        title: <p>Logged out successfully</p>,
      })
    })
  }

  return (
    <div className='flex'>
      <h1>Selamat Datang, {user?.name}</h1>
      <button className='w-20 h-11 bg-red-500 text-white rounded-lg' onClick={handleLogout}>Keluar</button>
    </div>
  )
}
