import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css'
import Home from './components/HomePage/Home';
import Admin from './components/AdminPanel/Admin';


const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/admin' element={<Admin/>}/>
          {/* <Route path='*' element={<NotFound/>}/> */}
        </Routes>
      </Router>
    </>
  )
}

export default App
