import React from 'react'
import { useChatStore } from '../store/usChatStore'
import { useAuthStore } from '../store/UseAuthstore';
import {X} from 'lucide-react'

function ChatHeader() {
    const { userselected, setuserselected } = useChatStore();
    const { onlineUsers } = useAuthStore();
    return (
        <header className='border-b border-base-300'>
            <div className='flex justify-between items-center py-1.5 px-4'>
                <div className='flex gap-2'>
                    <div className='avatar'>
                        <div className='relative size-9 rounded-full '>
                            <img src={userselected.profileImg || '/avatar.png'} alt={userselected.fullname} />
                        </div>
                    </div>
                    <div>
                        <h3 className='font-sm text-base-content'>{userselected.fullname}</h3>
                        <p className='text-xs text-base-content/70'>
                            {onlineUsers.includes(userselected._id) ? "Online" : "Offline"}
                        </p>
                    </div>
                </div>
                <button onClick={()=>setuserselected(null)}>
                    <div className='p-1 rounded-md hover:bg-base-300/90'>
                <X size={25} strokeWidth={2.5} />

                    </div>
                </button>
            </div>
        </header>
    )
}

export default ChatHeader
