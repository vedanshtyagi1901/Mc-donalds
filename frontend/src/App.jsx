import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css'
import Home from './components/HomePage/Home';


const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          {/* <Route path='/success' element={<Success/>}/> */}
          {/* <Route path='*' element={<NotFound/>}/> */}
        </Routes>
      </Router>
    </>
  )
}

export default App
