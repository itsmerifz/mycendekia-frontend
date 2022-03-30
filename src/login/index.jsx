import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LoginImg from '../../assets/login-office.jpeg'
import moment from 'moment'
import { loginUser } from '../../service/httpClient'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'
import withReactContent from 'sweetalert2-react-content'
import { BeatLoader } from 'react-spinners'

const MySwal = withReactContent(Swal)

const Toast = MySwal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true
})


export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isFetching, setIsFetching] = useState(false)

  const navigate = useNavigate()

  const handleLogin = e => {
    e.preventDefault();

    setIsFetching(true)
    if (email !== '' && password !== '') {
      loginUser(email, password)
        .then(res => {
          console.log(res.data)
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('user', JSON.stringify(res.data.user))
          setIsFetching(false)
          navigate('/dashboard')
        })
        .catch(err => {
          console.log(err.response)
          Toast.fire({
            icon: 'error',
            title: <p>{err.response.data.message}</p>,
          })
          setIsFetching(false)
        })
    } else {
      Toast.fire({
        icon: 'error',
        title: <p>Please fill all fields</p>,
      })
      setIsFetching(false)
    }

  }

  return (
    <div className='flex items-center min-h-screen p-6 bg-gray-200'>
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-lg">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img src={LoginImg} alt="Login" className='w-full h-full object-cover' />
          </div>
          <main className='flex items-center justify-center p-6 sm:p-12 md:w-1/2'>
            <div className="w-full">
              <form action="#" onSubmit={handleLogin}>
                <h1 className="mb-4 text-xl font-semibold text-lime-500"><span className='font-bold'>myCendekia</span> Login</h1>
                <div className="relative z-0 mb-6 w-full group">
                  <input type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-lime-600 peer" placeholder=" " required value={email} onChange={e => setEmail(e.target.value)} />
                  <label htmlFor="email" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-lime-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                </div>
                <div className="relative z-0 mb-6 w-full group">
                  <input type="password" name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-lime-600 peer" placeholder=" " required value={password} onChange={e => setPassword(e.target.value)} />
                  <label htmlFor="floating_password" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-lime-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                </div>
                <div className="mt-3 flex items-center gap-5 justify-evenly">
                  {isFetching ? (
                    <div>
                      <button type="submit" className="text-white bg-lime-600 hover:bg-lime-700 focus:ring-4 focus:outline-none focus:ring-lime-300 transform transition-all font-medium rounded-lg text-sm px-5 py-2.5 text-center w-20" disabled>
                        <BeatLoader color='#fff' size={3} />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <button type="submit" className="text-white bg-lime-600 hover:bg-lime-700 focus:ring-4 focus:outline-none focus:ring-lime-300 transform transition-all font-medium rounded-lg text-sm px-5 py-2.5 text-center w-20" onClick={handleLogin}>Login</button>
                    </div>
                  )}
                  <Link to="/register" className="text-gray-500 hover:text-lime-500 transform transition-all font-medium text-sm">Register</Link>
                </div>
              </form>
            </div>
          </main>

          {/* Footer */}
          <footer className="bg-transparent bottom-0 right-4 text-gray-700 px-2 py-4 absolute">
            <div className="container flex flex-col items-center justify-center">
              <p className="text-center text-gray-500">
                &copy; {moment().format("YYYY")} myCendekia - Pimpinan Cabang Istimewa Muhammadiyah Taiwan
              </p>
            </div>
          </footer>

          <div className='absolute text-gray-700 hover:text-lime-500 top-0 left-2 transition-all px-2 py-4'>
            <Link to="/">&larr; &nbsp; Kembali ke menu utama</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
