import React, { useEffect, useState } from 'react'
import { useChatStore } from '../store/usChatStore'
import SidebarSkeleton from '../skeletons/SidebarSkeleton'
import { UsersRound } from 'lucide-react'
import { useAuthStore } from '../store/UseAuthstore'

const Sidebar = () => {
  const { getusers, userselected, isLoadingUser, users, setuserselected } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnline,setshowOnline] = useState(false);


  useEffect(() => {
    getusers()
  }, [getusers])

  const filteredUsers = showOnline?users.filter((user)=>onlineUsers.includes(user._id)):users;

  if (isLoadingUser) return <SidebarSkeleton />
  return (
    <aside className='h-full flex flex-col border-r  border-base-content w-20 lg:w-72 transition-all duration-300'>
      <div className='border-b w-full p-3 border-base-300'>
        <div className='flex items-center gap-2 pl-1'>
          <UsersRound size={25} strokeWidth={2.25} />
          <span className='font-semibold text-lg hidden lg:block'>Contacts</span>
        </div>
        <div className='flex items-center mt-2 gap-2 pl-1'>
          <input type="checkbox" 
            checked={showOnline}
            id='online'
           className="checkbox checkbox-xs checkbox-primary"
           onChange={(e)=>setshowOnline(e.target.checked)}
           />
          <label className='text-sm cursor-pointer ' htmlFor='online'>Show Online Only</label>
          <span className='text-xs'>({onlineUsers.length-1} online)</span>
        </div>
      </div>
      <div className='overflow-y-auto w-full py-1'>
        {
          filteredUsers.map((users,id) => (
            <button
            key={id}
              onClick={() => setuserselected(users)}
              className={
                `flex px-2 w-full my-1 py-1.5 items-center gap-3 hover:bg-base-300 transition-colors rounded-sm
                ${userselected?._id === users._id ? 'bg-base-300 ring ring-base-300' : ''}
              `
              }
            >
              <div className='relative mx-auto lg:mx-0'>
                <img src={users.profileImg || "/avatar.png"} alt="img failed" className='size-11 object-cover rounded-full' />
                {onlineUsers.includes(users._id) ? (
                  <span className="absolute bottom-0 right-0 size-3 bg-green-500  rounded-full ring-1 ring-base-300"></span>)
                  :
                  (<span className="absolute bottom-0 right-0 size-3 bg-red-500  rounded-full ring-1 ring-base-300"></span>
                  )}
              </div>
              <div className='hidden lg:block flex-grow text-left min-w-0'>
                <div className='font-medium truncate '>
                  {users.fullname}
                </div>
                <div className='text-sm text-base-content/70'>
                  {onlineUsers.includes(users._id) ? "Online" : "Offline"}
                </div>
              </div>
            </button>
          ))
        }
      </div>
    </aside>
  )
}

export default Sidebar
