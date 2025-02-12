import React, { useRef, useState } from 'react'
import { useChatStore } from '../store/usChatStore';
import { Image, Send, X } from 'lucide-react';
import toast from 'react-hot-toast';


function MessageInput() {

  const [text, setText] = useState('');
  const [imagePreview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessages ,isUploadingImage} = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if(!file.type.startsWith('image/')){
      return toast.error('Incorrect file type ')
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend= ()=>{
      setPreview(reader.result);
    }
   };

  const removeImage = () => { 
    setPreview(null);
    if(fileInputRef.current) fileInputRef.current.value="";
  };

  const handleSendMessage =async (e) => { 
    e.preventDefault();
    if(!text.trim()&&!imagePreview) return;
    try {
      const formattedText = text.replace(/[^\S\r\n]+/g, ' ').trim();
      await sendMessages({
        image:imagePreview,
        text:formattedText,
      })
      setText('');
      setPreview(null);
      if(fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      toast.error('Failed to send Message')
    }
  }

  return (
    <div className='p-4 w-full'>
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}
      {isUploadingImage&& (
        <div className="loading loading-dots loading-lg text-primary/90"></div>
      )}
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <textarea
            className="w-full textarea textarea-bordered rounded-lg textarea-lg overflow-y-auto no-scrollbar sm:textarea-md resize-none  "
            placeholder="Type a message..."
            value={text}
            rows={1}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault(); // Prevent new line
                handleSendMessage(e); // Send message
              }
            }}
          />
      
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <div className="tooltip " data-tip="Max Size 9MB">
          <button
            type="button"
            className={`hidden sm:flex btn btn-square rounded-md 
                     ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-square btn-primary bg-opacity-85 rounded-md"
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  )
}

export default MessageInput
