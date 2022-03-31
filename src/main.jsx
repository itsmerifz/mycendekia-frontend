import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Routes as Switch } from 'react-router-dom'
import './index.css'
import App from './App'
import Search from './search'
import Login from './login'
import Register from './register'
import Dashboard from './dashboard/dashboardRouter'
import { RecoilRoot } from 'recoil'

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        {/* Routes */}
        <Switch>
          <Route path='/' element={<App />} />
          <Route path='/search' element={<Search />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard/*' element={<Dashboard />} />
        </Switch>
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
)
