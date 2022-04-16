import React, { useState, useEffect } from 'react'
import Header from '../../../components/dashboard/header'
import { BeatLoader } from 'react-spinners'
import { Link, useNavigate } from 'react-router-dom'
import { useRecoilState } from "recoil"
import { idArticleState } from "../../../atoms/dataAtom"
import { editArticle, getOneArticle } from '../../../service/httpClient'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'
import withReactContent from 'sweetalert2-react-content'
import { FiChevronRight } from 'react-icons/fi'
import { MdSaveAlt } from 'react-icons/md'

const MySwal = withReactContent(Swal)

const Toast = MySwal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
})

export default function Edit_Article() {
  const [id, setId] = useRecoilState(idArticleState)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [year, setYear] = useState('')
  const [link, setLink] = useState('')
  const [isFetching, setIsFetching] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    getOneArticle(id).then(res => {
      console.log(res.data);
      setTitle(res.data.data.title)
      setContent(res.data.data.content)
      setAuthor(res.data.data.author)
      setYear(res.data.data.year)
      setLink(res.data.data.link)
    })
  }, [])

  const handleEdit = e => {
    e.preventDefault()

    setIsFetching(true)
    editArticle(id, title, content, year, author, link).then(res => {
      Toast
        .fire({
          icon: 'success',
          title: res.data.message
        })
      })
      .then(() => {
        navigate('/dashboard/articles')
        setIsFetching(false)
      })
      .catch(err => {
        Toast
          .fire({
            icon: 'error',
            title: err.response.data.message
          })
          .then(() => {
            setIsFetching(false)
          })
      })
  }

  return (
    <div className='flex-grow h-screen bg-gray-300'>
      <Header />

      {/* Breadcrumb */}
      <div className='flex items-center justify-start py-3 px-5 font-semibold text-gray-500 gap-3'>
        <Link to='/dashboard' className='hover:text-gray-600'>
          <p>Dashboard</p>
        </Link>
        <FiChevronRight />
        <Link to='/dashboard/articles' className='hover:text-gray-600'>
          <p>Articles</p>
        </Link>
        <FiChevronRight />
        <p className='hover:text-gray-600'>Edit</p>
      </div>

      {/* Content */}
      <div className='mt-3'>
        <form action="#" className='p-5' onSubmit={handleEdit}>
          <div className="grid grid-cols-2">
            <div className="grid space-y-4">
              <div className="flex flex-col w-80 space-y-3">
                <label htmlFor="title" className='font-semibold text-gray-800'>Title</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder='Masukkan Judul...' className='p-3 text-sm outline-none rounded focus:ring-lime-500 focus:ring-2 shadow' />
              </div>
              <div className="flex flex-col w-80 space-y-3">
                <label htmlFor="author" className='font-semibold text-gray-800'>Author</label>
                <input type="text" value={author} onChange={e => setAuthor(e.target.value)} placeholder='Masukkan Author...' className='p-3 text-sm outline-none rounded focus:ring-lime-500 focus:ring-2 shadow' />
              </div>
              <div className="flex flex-col w-80 space-y-3">
                <label htmlFor="author" className='font-semibold text-gray-800'>Year</label>
                <input type="text" value={year} onChange={e => setYear(e.target.value)} placeholder='Masukkan Tahun Artikel...' className='p-3 text-sm outline-none rounded focus:ring-lime-500 focus:ring-2 shadow' />
              </div>
            </div>
            <div className="grid space-y-4">
              <div className="flex flex-col w-80 space-y-3">
                <label htmlFor="title" className='font-semibold text-gray-800'>Link</label>
                <input type="text" value={link} onChange={e => setLink(e.target.value)} placeholder='Masukkan Link Artikel...' className='p-3 text-sm outline-none rounded focus:ring-lime-500 focus:ring-2 shadow' />
              </div>
              <div className="flex flex-col w-80 space-y-3">
                <label htmlFor="title" className='font-semibold text-gray-800'>Content</label>
                <textarea rows={6} value={content} onChange={e => setContent(e.target.value)} placeholder='Masukkan Link Artikel...' className='p-3 text-sm outline-none rounded focus:ring-lime-500 focus:ring-2 shadow' ></textarea>
              </div>
            </div>
          </div>
          <div className="flex items-center mt-8 gap-3">
            {isFetching ? (
              <div>
                <button type="submit" className="text-white bg-lime-600 hover:bg-lime-700 focus:ring-4 focus:outline-none focus:ring-lime-300 transform transition-all font-medium rounded-lg text-sm px-5 py-2.5 text-center shadow w-28" disabled>
                  <BeatLoader color='#fff' size={3} />
                </button>
              </div>
            ) : (
              <div>
                <button type="submit" className="text-white bg-lime-600 hover:bg-lime-700 focus:ring-4 focus:outline-none focus:ring-lime-300 transform transition-all font-medium rounded-lg text-sm px-5 py-2.5 text-center shadow w-28" onClick={handleEdit}>
                  <div className='flex items-center justify-center gap-2'>
                    <MdSaveAlt className='text-xl' />
                    Simpan
                  </div>
                </button>
              </div>
            )}
            <button type='button' className='text-white bg-slate-600 hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-slate-300 transform transition-all font-medium rounded-lg text-sm px-5 py-2.5 text-center shadow w-28' onClick={() => navigate('/dashboard/articles')}>
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
