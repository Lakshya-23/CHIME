import React from 'react'
import { useAuthStore } from '../store/UseAuthstore'
import { Bird, Settings, UserRound, LogOut, House } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const { logout, authUser } = useAuthStore();
  const location = useLocation();
  return (
    <div className="navbar fixed top-0 m-2 w-full max-w-[calc(100%-16px)] p-7 shadow-lg border border-base-content/5 rounded-sm  bg-base-100 min-h-[50px] h-[50px] z-40">
      <div className="flex-1 space-x-1">
        {['/profileimg', '/settings',].includes(location.pathname) ?
          (<Link to={'/'}> <button className="btn btn-ghost text-xl "><House size={30} /></button></Link>)
          : (<button className="btn btn-ghost text-xl "><Bird size={32} /><span>Chime</span></button>)
        }
      </div>
      <div className="flex">
        <div className="menu menu-horizontal px-1">
          <Link to={'/settings'}><button className="btn btn-ghost "><Settings size={20} /><span className='hidden sm:inline'>Settings</span></button></Link>
          {authUser && (<>
            <Link to={'profileimg'}><button className="btn btn-ghost "><UserRound size={20} /><span className='hidden sm:inline'>Profile</span></button></Link>
            <button className="btn btn-ghost " onClick={logout}><LogOut size={20} /><span className='hidden sm:inline'>Logout</span></button>
          </>)}


        </div>
      </div>
    </div>

  )
}

export default Navbar