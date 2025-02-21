import {create} from 'zustand'
import {axiosInstance} from '../lib/axios' 
import toast from 'react-hot-toast';
import {io} from 'socket.io-client'

const BASE_URL = import.meta.env.VITE_BACKEND_URL

export const useAuthStore = create((set,get)=>({
    authUser:null,
    isSigningIn:false,
    isSigningUp:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,            //when we refresh it checks for auth and sets authUser
    onlineUsers:[],
    socket:null,


    checkAuth:async ()=>{
        try {
            const res = await axiosInstance.get('/auth/check');
            
            set({authUser:res.data})               
            get().connectSocket();
        } catch (error) {
            console.log("error in useAuthStore",error);
            set({authUser:null});
        }finally{
            set({isCheckingAuth:false});
        }
    },
    signup:async (data)=>{
        try {
   
            set({isSigningUp:true});
            const res = await axiosInstance.post('/auth/signup',data);
            set({authUser:res.data})                                    
                              //contains {object about user}
            toast.success('Account Created Successfully');
            await get().connectSocket();
        } catch (error) {
            console.log(error);
        }finally{
            set({isSigningUp:false});
        }
    },
    logout:async()=>{
        try {
            await axiosInstance.post('/auth/logout');
            set({authUser:null});
            toast.success('Logout Successful')
             get().disconnectSocket();
        } catch (error) {
            console.log(error);
        }
        
    },
    signin:async(data)=>{
        try {
            set({isSigningIn:true})
            console.log('Sending signin request with:', data);
            const res = await axiosInstance.post('/auth/signin',data);
            set({authUser:res.data})
            toast.success('Successfully Signed In')
            await get().connectSocket();
        } catch (error) {
            console.error('Signin error:', error); // Detailed error logging
        }finally{
            set({isSigningIn:false})
        }
    },
    updateProfile:async(data)=>{
        try {
            set({isUpdatingProfile:true});
            const res = await axiosInstance.put('/auth/update-profile',data)
           
            set({authUser:res.data});
            toast.success('Profile Updated Successfully ')
        } catch (error) {
            console.log("error in update profile",error);
        }finally{
            set({isUpdatingProfile:false});
        }
    },
    connectSocket:()=>{
        const {authUser}  = get();
        if(!authUser||get().socket?.connected) return;
        const socket = io(BASE_URL,{
            query:{userId:authUser._id},              //we pass this online user id to backend to be stored and later update on frontend
        });
        socket.connect();
        set({socket:socket});

        socket.on('getOnlineusers',(userIds)=>{     //listens to getOnlineusers(on backend) and appends to userIds
            set({onlineUsers:userIds});
            
        })
    },
    disconnectSocket:()=>{
        if( get().socket?.connected) get().socket?.disconnect();
        // set({socket:null})       //makes a fresh connection evertime
    },

}))

