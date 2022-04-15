import { useEffect } from "react"
import { useRecoilState } from "recoil"
import { articlesState } from "../../atoms/dataAtom"
import { tokenState, userState } from "../../atoms/userAtom"
import { Routes as Switch, Route } from "react-router-dom"
import { useNavigate } from 'react-router-dom'
import { getArticles } from "../../service/httpClient"
import moment from "moment"
import Sidebar from "../../components/dashboard/sidebar"
import Dashboard from "./"
import Articles from "./articles"
import EditArticles from "./articles/edit"
import Users from "./users"
import EditUsers from "./users/edit"


export default function dashboardRouter() {

  const [token, setToken] = useRecoilState(tokenState)
  const [user, setUser] = useRecoilState(userState)
  const [articles, setArticles] = useRecoilState(articlesState)

  const navigate = useNavigate()

  useEffect(() => {
    getArticles().then(res => {
      setArticles(res.data.data)
    })
    setToken(localStorage.getItem('token'))
    setUser(JSON.parse(localStorage.getItem('user')))
    getTokenExpired()
  }, [])
  
  const getTokenExpired = () => {
    const token = JSON.parse(localStorage.getItem('user'))
    const now = moment().unix()
    
    if(!token && !user){
      return null
    }

    if(now > token.exp){
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      navigate('/login')
    }
  }

  if (!token && !user) {
    navigate('../login')
  }

  return (
    <main className="flex h-screen">
      <Sidebar />
      <Switch>
        <Route path="/" element={<Dashboard />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/edit" element={<EditArticles />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/edit" element={<EditUsers />} />
      </Switch>
    </main>
  )
}