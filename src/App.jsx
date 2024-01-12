import React from 'react'
import Login from './components/login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'

const App = () => {
  return <>
   <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/home' element={<Home/>} />
          <Route path='*' element={<h1>Page Not Found</h1>} />
        </Routes>
      </BrowserRouter>
  
  </>
}

export default App