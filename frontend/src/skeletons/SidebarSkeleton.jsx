import React from 'react'
import { Key, UsersRound } from 'lucide-react'
import {useTheme} from '../store/useThemestore'



function SidebarSkeleton() {
  const skeletons = Array(8).fill(null);
  const {theme}  = useTheme();
  return (
    <aside className='h-full flex flex-col border-r  border-base-content w-20 lg:w-72 transition-all duration-300'>
      <div className='w-full p-3 border-base-300'>
        <div className='flex items-center gap-2 pl-1'>
          <UsersRound size={25} strokeWidth={2.25} />
          <span className='font-semibold text-lg hidden lg:block'>Contacts</span>
        </div>
        <div className='flex items-center mt-2 gap-2 pl-1'>
          <input type="checkbox" defaultChecked className="checkbox checkbox-xs checkbox-primary" />
          <span className='text-sm '>Show Online Only</span>
        </div>
      </div>
      <div className='overflow-hidden w-full py-1 '>
        {skeletons.map((_,index)=>(
          <div className={` flex items-center gap-3 p-3 w-full ${theme==='black'?'bg-base-100':'bg-base-300'}`} key={index}>
            <div className='relative mx-auto lg:mx-0'>
            <div className="skeleton size-12 shrink-0 rounded-full"></div>
            </div>
            <div className=" hidden flex-col space-y-2 lg:block">
              <div className="skeleton h-4 w-32"></div>
              <div className="skeleton h-3 w-16"></div>
            </div>
          </div>
        ))

        }
      </div>
    </aside>
  )
}

export default SidebarSkeleton
