import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Routes as Switch } from 'react-router-dom'
import './index.css'
import App from './App'
import Search from './search'
import Login from './login'
import Register from './register'
import Details from './search/details'
import Dashboard from './dashboard/dashboardRouter'
import { RecoilRoot } from 'recoil'
import ChangePass from './change-password'

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        {/* Routes */}
        <Switch>
          <Route index element={<App />} />
          <Route path='/search' element={<Search />} />
          <Route path='/search/details' element={<Details />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard/*' element={<Dashboard />} />
          <Route path='/change-password' element={<ChangePass />} />
        </Switch>
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
)
