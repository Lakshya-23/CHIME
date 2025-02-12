import {create} from 'zustand'
import toast  from 'react-hot-toast'
import {axiosInstance} from '../lib/axios'
import {useAuthStore} from './UseAuthstore'

export const useChatStore= create((set,get)=>({
    messages:[],
    users:[],
    isLoadingUser:false,
    isLoadingMessage:false,
    userselected:null,
    isUploadingImage:false,

    getusers:async()=>{
        set({isLoadingUser:true})
        try {
            const res = await axiosInstance.get('/messages/users');
            set({users:res.data});
        } catch (error) {
            toast.error('Error in loading users');
            console.log(error);
        }finally{
            set({isLoadingUser:false});
        }
    },
    getmessage:async(userId)=>{
        set({isLoadingMessage:true})
        try {
            const res = await axiosInstance.get(`/messages/${userId}`)
            set({messages:res.data});
        } catch (error) {
            toast.error('Failed to load messages');
            console.log(error);
        }finally{
            set({isLoadingMessage:false});
        }
    },
    sendMessages:async(mssgData)=>{
        const {messages,userselected} = get();
        try {
            if(mssgData.image) set({isUploadingImage:true})
            console.log("this is message",mssgData);
            const res = await axiosInstance.post(`/messages/send/${userselected._id}`,mssgData);
            set({messages:[...messages,res.data]});
        } catch (error) {
            console.log("error in send messages",error);
        }finally{
            set({isUploadingImage:false})
        }
    },

    updateMessages:()=>{
        const {userselected} = get();
        if(!userselected) return;
        
        const socket = useAuthStore.getState().socket; 

        socket.on('new_message',(newMessage)=>{
            if(newMessage.senderID!==userselected._id) return;      //prevents one mssg from another user to go to other user 
            set({messages:[...get().messages,newMessage]})
        })
    },
    disableupdateMessages:()=>{
        const socket = useAuthStore.getState().socket; 
        socket.off('new_message');
    },
    setuserselected:((user)=>(set({userselected:user})))

}))