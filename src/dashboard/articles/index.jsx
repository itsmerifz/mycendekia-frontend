import React, { useState, useEffect } from 'react'
import Header from '../../../components/dashboard/header'
import { useNavigate } from 'react-router-dom'
import { cloneDeep } from 'lodash'
import { useRecoilState } from "recoil"
import { articlesState, idArticleState } from "../../../atoms/dataAtom"
import Pagination from 'rc-pagination'
import "rc-pagination/assets/index.css";
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'
import withReactContent from 'sweetalert2-react-content'
import { BeatLoader } from 'react-spinners'
import { BiPlus } from 'react-icons/bi'
import { FaTrash, FaEdit, FaSearch } from 'react-icons/fa'
import { Transition, Dialog } from '@headlessui/react'
import { addArticle, getArticles, deleteArticle } from '../../../service/httpClient'

const MySwal = withReactContent(Swal)

const Toast = MySwal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
})

export default function Articles() {
  const limit = 5
  const [articles, setArticles] = useRecoilState(articlesState)
  const [data, setData] = useState(cloneDeep(articles.slice(0, limit)))
  const [total, setTotal] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [currPage, setCurrPage] = useState(1)
  const [isFetching, setIsFetching] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [year, setYear] = useState('')
  const [link, setLink] = useState('')
  const [modal, setModal] = useState(false)
  const [id, setId] = useRecoilState(idArticleState)
  const navigate = useNavigate()

  useEffect(() => {
    getArticles().then((res) => {
      setArticles(res.data.data)
      setTotal(Math.ceil(articles.length / limit))
    })
  }, [])


  const searchDataTable = e => {
    e.preventDefault()

    const search = articles.filter(item => {
      return item.title.toLowerCase().includes(searchValue.toLowerCase())
    })

    setData(search)

    if (search.length === 0) {
      MySwal.fire({
        icon: 'error',
        title: 'Data tidak ditemukan!',
        confirmButtonColor: '#58ee1d',
      })
        .then(() => {
          setSearchValue('')
          setData(articles.slice(0, limit))
        })
    }
  }

  const updatePage = page => {
    setCurrPage(page)
    const end = limit * page
    const start = end - limit
    setData(cloneDeep(articles.slice(start, end)))
  }

  const handleAddArticle = e => {
    e.preventDefault();
    setIsFetching(true)
    addArticle(title, content, year, author, link)
      .then((res) => {
        Toast.fire({
          icon: 'success',
          title: res.data.message,
        })
        setIsFetching(false)
        setModal(false)
        setTitle('')
        setContent('')
        setAuthor('')
        setYear('')
        setLink('')
      })
      .catch((err) => {
        Toast.fire({
          icon: 'error',
          title: err.message,
        })
        setIsFetching(false)
        setModal(false)
        setTitle('')
        setContent('')
        setAuthor('')
        setYear('')
        setLink('')
      })
  }

  const handleDeleteArticle = (id) => {
    MySwal.fire({
      title: 'Apakah anda yakin?',
      text: 'Anda tidak dapat mengembalikan data yang sudah dihapus!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6fcf15',
      cancelButtonColor: '#5e5e5e',
      confirmButtonText: 'Ya, hapus!',
    })
      .then((result) => {
        if (result.isConfirmed) {
          deleteArticle(id)
            .then((res) => {
              MySwal.fire({
                icon: 'success',
                title: res.data.message,
              })
              updatePage(1)
            })
        }
      })
  }

  const navigateEdit = id => {
    setId(id)
    navigate('/dashboard/articles/edit')
  }

  return (
    <div className='flex-grow h-screen bg-gray-300'>
      <Header />
      <div className='flex items-center justify-between p-5 pb-0'>
        <h1 className='font-bold text-2xl text-gray-600'>Daftar Artikel</h1>
        <button className='w-44 h-10 text-white font-semibold rounded shadow hover:bg-lime-500 transition bg-lime-400' type='button' onClick={() => setModal(true)}>
          + Tambah Artikel
        </button>
      </div>

      {/* Search */}
      <div className='m-4 flex gap-2'>
        <input type="text" placeholder='Cari Artikel...' className='rounded-md w-52 outline-none p-1 font-semibold focus:ring-2 focus:ring-lime-400 bg-gray-50' value={searchValue} onChange={e => setSearchValue(e.target.value)} />
        <button className='w-10 flex shadow items-center h-10 justify-center bg-lime-400 hover:bg-lime-500 transition rounded-md text-white' onClick={searchDataTable}>
          <FaSearch />
        </button>
      </div>

      {/* List Article */}
      <div className="mt-5 p-3 w-full relative overflow-x-hidden items-center justify-center flex">
        {
          data.length > 0 ? (
            // <Table />
            <table className='rounded'>
              <thead className='uppercase bg-gray-600 text-white'>
                <tr>
                  <th scope='col' className='px-3 py-2 border'>
                    No.
                  </th>
                  <th scope='col' className='px-3 py-2 border'>
                    Judul
                  </th>
                  <th scope='col' className='px-3 py-2 border'>
                    Author
                  </th>
                  <th scope='col' className='px-3 py-2 border'>
                    Tahun
                  </th>
                  <th scope='col' className='px-3 py-2 border'>
                    Link
                  </th>
                  <th scope='col' className='px-3 py-2 border'>
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className='border px-3 py-2 w-24 h-auto bg-gray-400'>
                {
                  data.map((article, index) => {
                    return (
                      <tr key={index}>
                        <td className='border px-3 py-2'>
                          <div className="flex justify-center items-center font-semibold">
                            {index + 1}
                          </div>
                        </td>
                        <td className='border px-3 py-2'>
                          <p className='truncate w-72'>{article.title}</p>
                        </td>
                        <td className='border px-3 py-2'>
                          <p className='truncate w-72'>{article.author}</p>
                        </td>
                        <td className='border px-3 py-2'>{article.year}</td>
                        <td className='border px-3 py-2'>
                          <p className='truncate w-48'>{article.link}</p>
                        </td>
                        <td className='border px-3 py-2'>
                          <div className="flex items-center gap-6 justify-center">
                            <button className='w-auto h-10 text-white hover:text-lime-400 transition text-2xl' type='button' onClick={() => navigateEdit(article._id)}>
                              <FaEdit />
                            </button>
                            <button className='w-auto h-10 text-white hover:text-red-600 transition text-2xl' type='button' onClick={() => handleDeleteArticle(article._id)}>
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          )
            :
            (
              <div className='flex justify-center items-center'>
                <div className='w-full mt-9'>
                  <p className='text-center text-3xl font-semibold text-gray-600'>Tidak ada artikel</p>
                </div>
              </div>
            )
        }
      </div>
      <div className='mt-2 py-2 flex justify-between px-3'>
        <p className='text-gray-600'>Halaman {currPage} dari {total}</p>
        <Pagination
          pageSize={limit}
          onChange={updatePage}
          current={currPage}
          total={articles.length}
        />
      </div>

      {/* Modal Add Articles */}
      {
        modal && (
          <Transition appear show={modal} enter="transition-opacity duration-75" enterFrom="opacity-0" enterTo="opacity-100" leave="transition-opacity duration-150" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Dialog as='div' open={modal} className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ease-in duration-500 transform" onClose={() => setModal(false)}>
              <div className="relative w-[1028px] my-6 mx-auto">
                {/* Modal Content */}
                <Transition.Child enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/* Header */}
                    <div className="flex items-center justify-between p-5 border-b-2 border-slate-200 rounded-t outline-none">
                      <Dialog.Title as='h3' className='text-3xl text-lime-500 font-semibold'>Tambah Artikel</Dialog.Title>
                      <button className='p-1 ml-auto bg-transparent border-0 text-gray-600 opacity-70 float-right text-3xl leading-none font-semibold outline-none focus:outline-none' onClick={() => setModal(false)}>
                        &#x2716;
                      </button>
                    </div>
                    {/* Body */}
                    <div className="relative p-6 flex-auto">
                      <form action="#" onSubmit={handleAddArticle}>
                        <div className="flex items-center gap-8">
                          <div>
                            <div className="relative z-0 mb-6 w-[400px] group">
                              <input type="text" name="judul" id="judul" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-lime-600 peer" placeholder=" " required value={title} onChange={e => setTitle(e.target.value)} />
                              <label htmlFor="judul" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-lime-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Judul</label>
                            </div>
                            <div className="relative z-0 mb-6 w-[400px] group">
                              <input type="text" name="author" id="author" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-lime-600 peer" placeholder=" " required value={author} onChange={e => setAuthor(e.target.value)} />
                              <label htmlFor="author" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-lime-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Author</label>
                            </div>
                            <div className="relative z-0 mb-6 w-[400px] group">
                              <input type="text" name="year" id="year" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-lime-600 peer" placeholder=" " required value={year} onChange={e => setYear(e.target.value)} />
                              <label htmlFor="year" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-lime-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Year</label>
                            </div>
                          </div>
                          <div>
                            <div className="relative z-0 mb-6 w-[400px] group">
                              <input type="text" name="link" id="link" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-lime-600 peer" placeholder=" " required value={link} onChange={e => setLink(e.target.value)} />
                              <label htmlFor="link" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-lime-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Link Artikel</label>
                            </div>
                            <div className="relative z-0 mb-6 w-[400px] group">
                              <textarea name="content" rows={4} id="content" className="block scrollbar-hide py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-lime-600 peer" placeholder=" " required value={content} onChange={e => setContent(e.target.value)} />
                              <label htmlFor="content" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-lime-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Content</label>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                    {/* Footer */}
                    <div className="flex items-center justify-end p-6 border-t-2 border-slate-200 bg-gray-50 rounded-b-lg gap-5">
                      {isFetching ? (
                        <div>
                          <button type="submit" className="text-white bg-lime-500 hover:bg-lime-600 focus:ring-4 focus:outline-none focus:ring-lime-300 transform transition-all font-medium rounded-lg text-sm px-5 py-2.5 text-center w-28" disabled>
                            <BeatLoader color='#fff' size={3} />
                          </button>
                        </div>
                      ) : (
                        <div>
                          <button type="submit" className="text-white bg-lime-500 hover:bg-lime-600 focus:ring-4 focus:outline-none focus:ring-lime-300 transform transition-all font-medium rounded-lg text-sm px-5 py-2.5 text-center w-28" onClick={handleAddArticle}>
                            <div className="flex items-center justify-center gap-1">
                              <BiPlus className='text-xl font-bold' /> Tambah
                            </div>
                          </button>
                        </div>
                      )}
                      <button type='button' className='text-white bg-slate-600 hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-slate-300 transform transition-all font-medium rounded-lg text-sm px-5 py-2.5 text-center w-28' onClick={() => setModal(false)}>
                        Batal
                      </button>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </Dialog>
            <Transition.Child enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </Transition.Child>
          </Transition>
        )
      }
    </div>
  )
}
