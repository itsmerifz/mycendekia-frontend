import { useEffect } from "react"
import { useRecoilState } from "recoil"
import { tokenState, userState } from "../../atoms/userAtom"
import { Routes as Switch, Route } from "react-router-dom"
import { useNavigate } from 'react-router-dom'
import Sidebar from "../../components/dashboard/sidebar"
import Dashboard from "./"
import Articles from "./articles"
import EditArticles from "./articles/edit"
import Users from "./users"
import EditUsers from "./users/edit"


export default function dashboardRouter() {

  const [token, setToken] = useRecoilState(tokenState)
  const [user, setUser] = useRecoilState(userState)

  const navigate = useNavigate()

  useEffect(() => {
    setToken(localStorage.getItem('token'))
    setUser(JSON.parse(localStorage.getItem('user')))
  }, [token])

  if (!token && !user) {
    navigate('../login')
  }

  return (
    <div className="flex">
      <Sidebar />
      <Switch>
        <Route path="/" element={<Dashboard />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/edit" element={<EditArticles />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/edit" element={<EditUsers />} />
      </Switch>
    </div>
  )
}