import React, { useEffect } from 'react'
import {Routes , Route, Navigate} from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Profileimg from './pages/Profileimg'
import Settings from './pages/Settings'
import {useAuthStore} from './store/UseAuthstore'
import {useTheme} from './store/useThemestore'
import { HashLoader } from 'react-spinners';
import {Toaster} from 'react-hot-toast'

function App() {
  const {authUser,checkAuth,isCheckingAuth}  = useAuthStore()
  const {theme}  = useTheme();
  useEffect(()=>{
     checkAuth();
  },[checkAuth])
  if(isCheckingAuth&&!authUser){
    return (<div className="flex justify-center items-center h-screen">
      <HashLoader speedMultiplier={1.5} color="#ffffff" size={50} loading={true} />
      </div>)
  }

  return (
    <div data-theme={theme}>
      <Navbar/>
      <Routes>
        <Route path='/' element={authUser?<HomePage/>: <Navigate to='/signup'/>}/>
        <Route path='/signin' element={authUser?<Navigate to='/'/>:<Signin/>}/>
        <Route path='/signup' element={authUser?<Navigate to='/'/>:<Signup/>}/>
        <Route path='/settings' element={<Settings/>}/>
        <Route path='/profileimg' element={authUser?<Profileimg/>:<Navigate to='/signin'/>}/>
      </Routes>
        <Toaster/>
    </div>
  )
}

export default App
