import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Result from './pages/Result'
import BuyCredit from './pages/BuyCredit'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login'
import { AppContext } from './context/AppContext'
import Verify from './pages/Verify'
import History from './pages/History'
import HistoryDetails from './pages/HistoryDetails'
import Analytics from './pages/Analytics'
import Storyboard from './pages/Storyboard'

const App = () => {

  const { showLogin } = useContext(AppContext)

  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50 '>
      <ToastContainer position='bottom-right' />
      <Navbar />
      {showLogin && <Login />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/result' element={<Result />} />
        <Route path='/buy' element={<BuyCredit />} />
        <Route path='/verify' element={<Verify />} />
        <Route path='/history' element={<History />} />
        <Route path='/history/:id' element={<HistoryDetails />} />
        <Route path='/analytics' element={<Analytics />} />
        <Route path='/storyboard' element={<Storyboard />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App