import React, { useState, useEffect } from 'react'
import Header from '../../../components/dashboard/header'
import { BeatLoader } from 'react-spinners'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'
import withReactContent from 'sweetalert2-react-content'
import { getUser, updateUser } from '../../../service/httpClient'
import { FiChevronRight } from 'react-icons/fi'

const MySwal = withReactContent(Swal)

const Toast = MySwal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
})

export default function User() {
  const [user, setUser] = useState({})
  const [isFetching, setIsFetching] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [image, setImage] = useState(undefined)


  useEffect(() => {
    getUser().then(res => {
      console.log(res.data);
      setUser(res.data.data)
      setName(res.data.data.name)
      setEmail(res.data.data.email)
    })
  }, [])

  const handleUpdateUser = e => {
    e.preventDefault()

    let fd = new FormData()
    fd.append('name', name)
    fd.append('email', email)
    image === undefined ? null : fd.append('image', image)

    setIsFetching(true)
    updateUser(user._id, fd).then(res => {
      console.log(res.data);
      Toast
        .fire({
          icon: 'success',
          title: res.data.message
        })
    })
    
    getUser().then(res => {
      let user = JSON.parse(localStorage.getItem('user'))
      user.name = res.data.data.name
      user.email = res.data.data.email
      user.image = res.data.data.image
      localStorage.setItem('user', JSON.stringify(user))
    })
  }

  return (
    <div className='flex-1 h-screen bg-gray-300'>
      <Header />

      {/* Breadcrumb */}
      <div className='flex items-center justify-start py-3 px-5 font-semibold text-gray-500 gap-3'>
        <Link to='/dashboard' className='hover:text-gray-600'>
          <p>Dashboard</p>
        </Link>
        <FiChevronRight />
        <p className='hover:text-gray-600'>User</p>
      </div>

      {/* Content */}
      <div className="mt-3">
        <form action="#" onSubmit={handleUpdateUser} encType='multipart/form-data'>
          <div className="flex p-5 gap-8">
            <div className="flex flex-col w-80 space-y-3">
              <label htmlFor="name" className='font-semibold text-gray-800'>Nama</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder='Masukkan Nama...' className='p-3 text-sm outline-none rounded focus:ring-lime-500 focus:ring-2 shadow' />
            </div>
            <div className="flex flex-col w-80 space-y-3">
              <label htmlFor="name" className='font-semibold text-gray-800'>Email</label>
              <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder='Masukkan Nama...' className='p-3 text-sm outline-none rounded focus:ring-lime-500 focus:ring-2 shadow' />
            </div>
          </div>
          <div className="flex p-5 gap-8">
            <div className="flex flex-col space-y-3">
              <label htmlFor="name" className='font-semibold text-gray-800'>Foto</label>
              <div className='flex gap-8'>
                <input accept='image/*' name='image' type="file" onChange={e => setImage(e.target.files[0])} className='p-3 text-sm outline-none block text-white bg-gray-500 rounded-lg cursor-pointer border' />
                {
                  image ? <img src={URL.createObjectURL(image)} alt='user' className='w-32 h-32 rounded-full' /> : user.image ? <img src={`http://localhost:3911/assets/${user.image}`} alt='user' className='w-32 h-32 rounded-full' /> : <img src='https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0=' alt='user' className='w-32 h-32 rounded-full' />
                }
              </div>
            </div>
          </div>
          <div className="p-5">
            <button className='mt-1 text-white bg-lime-600 hover:bg-lime-700 focus:ring-4 focus:outline-none focus:ring-lime-300 transition-colors font-medium rounded-lg text-sm px-5 py-2.5 text-center shadow w-28'>Simpan</button>
          </div>
        </form>
      </div>
    </div>
  )
}
