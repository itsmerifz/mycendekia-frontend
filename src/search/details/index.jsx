import React, { useEffect, useState } from 'react'
import { useNavigate, Link, Route } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { idArticleState, articlesState } from '../../../atoms/dataAtom'
import { getOneArticle } from '../../../service/httpClient'
import { FiChevronLeft } from 'react-icons/fi'
import { HiDocumentText } from 'react-icons/hi'
import { HashLoader } from 'react-spinners'

export default function Details() {
  const [isFetching, setIsFetching] = useState(true)
  const [id, setId] = useRecoilState(idArticleState)
  const [article, setArticle] = useRecoilState(articlesState)

  useEffect(() => {
    if (isFetching) {
      getOneArticle(id)
        .then(res => {
          console.log(res.data);
          setArticle(res.data.data)
          setIsFetching(false)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [])

  return (
    <>
      {/* Back */}
      <Link to={-1} className='flex items-center gap-3 absolute top-3 left-3 font-semibold text-gray-500 hover:text-gray-700'>
        <FiChevronLeft size={15} />
        Kembali ke pencarian
      </Link>

      {/* Main Details */}
      <main>
        {
          isFetching ?
            <div className='flex justify-center items-center h-screen'>
              <HashLoader
                size={150}
                color='#84CC16'
                loading={isFetching}
              />
            </div>
            :
            <div className="flex flex-1 font-semibold h-screen">
              <div className='container mx-auto px-8 pt-8 mt-8 overflow-y-scroll scrollbar-hide'>
                <h1 className='text-3xl font-bold text-justify ml-16 w-[900px] text-lime-500'>{article.title}</h1>
                <div className='mx-28'>
                  <div className="flex mt-8 text-justify font-semibold gap-4">
                    <div className="bg-transparent flex justify-end w-20">
                      <h5 className='text-gray-500'>Author</h5>
                    </div>
                    <h5 className='text-gray-800'>{article.author}</h5>
                  </div>
                  <div className="flex mt-8 text-justify font-semibold gap-4">
                    <div className="bg-transparent flex justify-end w-[64.7px]">
                      <h5 className='text-gray-500'>Tahun</h5>
                    </div>
                    <h5 className='text-gray-800'>{article.year}</h5>
                  </div>
                  <div className="flex my-8 text-justify font-semibold gap-4">
                    <div className="bg-transparent flex justify-end w-20">
                      <h5 className='text-gray-500'>Content</h5>
                    </div>
                    <h5 className='text-gray-800'>{article.content}</h5>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="h-screen overflow-y-scroll scrollbar-hide relative w-72 bg-gray-500">
                <div className="container mx-auto px-8 pt-8 mt-8">
                  <div className="flex items-center justify-center flex-col">
                    <HiDocumentText size={150} className='text-white' />
                    <button onClick={() => { window.open(`${article.link}`, '_blank') }} className='mt-3 w-44 h-10 rounded-lg font-semibold text-white shadow hover:bg-lime-600 transition-colors bg-lime-500'>
                      Lihat Artikel
                    </button>
                  </div>
                </div>
              </div>
            </div>
        }
      </main>
    </>
  )
}
