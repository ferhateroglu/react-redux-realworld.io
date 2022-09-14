import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  SignUp,
  SignIn,
  NewPost,
  Settings,
  Profile,
  Comment,
  Home,
  Dashboard,
} from "./features";
import { useSelector } from 'react-redux';
import { Navbar } from "./components";

function App() {
  const {theme} = useSelector(state =>state.theme);
  return (
    <div className='main' data-theme={theme}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='signin' element={<SignIn />} />
          <Route path='signup' element={<SignUp />} />
          <Route path='editor' element={<NewPost />} />
          <Route path='settings' element={<Settings />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='/@:username' element={<Profile />} />
          <Route path='/article/:slug' element={<Comment />} />
          <Route path='*' element={<h1>404</h1>} />
        </Routes>
      </BrowserRouter>
      </div>
  )
}

export default App