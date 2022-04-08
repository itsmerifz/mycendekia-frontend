import React, { useState } from 'react'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'
import { useNavigate, Link } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'
import { changePassword } from '../../service/httpClient'
import withReactContent from 'sweetalert2-react-content'
import moment from 'moment'

const MySwal = withReactContent(Swal)

const Toast = MySwal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true
})

export default function ChangePass() {
  const [password, setPassword] = useState('')
  const [passwordConf, setPasswordConf] = useState('')
  const [isFetching, setIsFetching] = useState(false)

  const navigate = useNavigate()

  const handleChangePass = e => {
    const user = JSON.parse(localStorage.getItem('user'))
    e.preventDefault();
    setIsFetching(true)
    if (password !== '' && passwordConf !== '') {
      changePassword(user.id, password, passwordConf)
        .then(res => {
          Toast.fire({
            icon: 'success',
            title: <p>{res.data.message}</p>,
          })
          setIsFetching(false)
          navigate('/dashboard/')
        })
        .catch(err => {
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
      <div className="flex-1 h-full max-w-3xl rounded-lg overflow-hidden mx-auto bg-white shadow-lg">
        <div className="flex flex-col space-y-4 items-center justify-center p-5">
          <h3 className='text-xl text-lime-500 mb-4 font-semibold'>Ganti Password</h3>
          <form action="#" onSubmit={handleChangePass}>
            <div className="relative z-0 mb-6 w-full group">
              <input type="password" name="floating_passwordConf" id="floating_passwordConf" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-lime-600 peer" placeholder=" " required value={password} onChange={e => setPassword(e.target.value)} />
              <label htmlFor="floating_passwordConf" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-lime-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password Baru</label>
            </div>
            <div className="relative z-0 mb-6 w-full group">
              <input type="password" name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-lime-600 peer" placeholder=" " required value={passwordConf} onChange={e => setPasswordConf(e.target.value)} />
              <label htmlFor="floating_password" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-lime-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Konfirmasi Password Baru</label>
            </div>
            <div className="mt-3 flex items-center gap-5 justify-evenly">
              {isFetching ? (
                <div>
                  <button type="submit" className="text-white bg-lime-600 hover:bg-lime-700 focus:ring-4 focus:outline-none focus:ring-lime-300 transform transition-all font-medium rounded-lg text-sm px-5 py-2.5 text-center w-28" disabled>
                    <BeatLoader color='#fff' size={3} />
                  </button>
                </div>
              ) : (
                <div>
                  <button type="submit" className="text-white bg-lime-600 hover:bg-lime-700 focus:ring-4 focus:outline-none focus:ring-lime-300 transform transition-all font-medium rounded-lg text-sm px-5 py-2.5 text-center w-28" onClick={handleChangePass}>Submit</button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-transparent bottom-0 right-4 text-gray-700 px-2 py-4 absolute">
        <div className="container flex flex-col items-center justify-center">
          <p className="text-center text-gray-500">
            &copy; {moment().format("YYYY")} myCendekia - Pimpinan Cabang Istimewa Muhammadiyah Taiwan
          </p>
        </div>
      </footer>

      <div className='absolute text-gray-700 hover:text-lime-500 top-0 left-2 transition-all px-2 py-4'>
        <Link to="/dashboard">&larr; &nbsp; Kembali ke dashboard</Link>
      </div>
    </div>
  )
}
