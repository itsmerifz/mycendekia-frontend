import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CardStats from '../../components/dashboard/cardStatsDashboard'
import Headers from '../../components/dashboard/header'
import { getUsers, getArticles } from '../../service/httpClient'
import { HiUser } from 'react-icons/hi'
import { MdArticle } from 'react-icons/md'

export default function Dashboard() {
  const [users, setUsers] = useState(0)
  const [articles, setArticles] = useState(0)

  useEffect(() => {
    getUsers()
      .then(res => {
        setUsers(res.data.total)
      })
    getArticles()
      .then(res => {
        console.log(res);
        setArticles(res.data.totalData)
      })
  }, [])

  return (
    <div className='flex-1 w-full h-screen bg-gray-300'>
      <Headers />
      <div className='inline-block p-5 pb-0'>
        <h1 className='font-bold text-2xl text-gray-600'>Dashboard</h1>
      </div>
      <div className='flex flex-row gap-10 p-10 items-center justify-center'>
        <CardStats count={users} title="Users" icon={<HiUser />} color='bg-blue-500' />
        <CardStats count={articles} title="Articles" icon={<MdArticle />} color='bg-red-500' />
      </div>
    </div>
  )
}
