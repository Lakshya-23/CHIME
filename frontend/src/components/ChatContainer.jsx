import React, { useEffect, useRef,useState } from 'react'
import { useChatStore } from '../store/usChatStore'
import MessageInput from '../components/MessageInput'
import ChatHeader from './ChatHeader'
import { useAuthStore } from '../store/UseAuthstore'

const ChatContainer = () => {
  const { isLoadingMessage, userselected, messages, getmessage, updateMessages, disableupdateMessages } = useChatStore();
  const { authUser } = useAuthStore();

  const messageEndRef = useRef(null);   //for autoscroll messges to end
  const [selectedImage, setSelectedImage] = useState(null);
  useEffect(() => {
    getmessage(userselected._id);
    updateMessages();

    return () => disableupdateMessages();   //this is a cleanup function , whenever user changes selected user react runs this and not during current running period
  }, [getmessage, userselected._id, updateMessages, disableupdateMessages])

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behaviour: 'smooth' });
    }
  }, [messages])
  if (isLoadingMessage) return (
    <div className='flex flex-col overflow-auto flex-1'>
      <ChatHeader />
      <div className='h-full w-full justify-center flex items-center'>
        <span className="loading loading-bars loading-lg "></span>
      </div>
      <MessageInput />
    </div>
  )
  return (
    <div className='flex flex-1 flex-col overflow-auto'>
      <ChatHeader />
      <div className='flex flex-1 flex-grow flex-col-reverse  overflow-y-auto '>
        <div className='space-y-4 p-4'>
          {messages.map((message) => (
            <div
              key={message._id}
              className={`chat ${message.senderID === authUser._id ? 'chat-end' : "chat-start"} w-full `}
              ref={messageEndRef}     //for scrollig to end messages
            >
              <div className='chat-header mb-1 mr-2'>
                <time className='text-xs text-center ml-1'> {new Date(message.createdAt).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })}
                </time>
              </div>
              <div className='chat-image avatar'>
                <div className='rounded-full size-9 border'>
                  <img src={`${message.senderID === authUser._id ? authUser.profileImg || '/avatar.png' : userselected.profileImg || '/avatar.png'} `} alt="" />
                </div>
              </div>
              <div className={`chat-bubble ${message.senderID === authUser._id ? 'chat-bubble-primary bg-opacity-90' : ""}  flex flex-col `}>
                {message.image && (
                  <img src={message.image} 
                  className={`sm:max-w-52 max-w-[500px]  ${message.text?'mb-2':"mb-1"}  rounded-sm cursor-pointer`} alt=""
                  onClick={() => setSelectedImage(message.image)}
                  />
                )
                }
                {message.text && (
                  <p className='whitespace-pre-line'>{message.text}</p>
                )}
                {selectedImage && (
                  <div
                    className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
                    onClick={() => setSelectedImage(null)} // Close on click outside
                  >
                    <img
                      src={selectedImage}
                      className="max-w-full max-h-full object-contain rounded-lg"
                      alt="Full Preview"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <MessageInput />
    </div>
  )
}

export default ChatContainer
