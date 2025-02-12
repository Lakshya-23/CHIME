import {create} from 'zustand'
import {axiosInstance} from '../lib/axios' 
import toast from 'react-hot-toast';
import {io} from 'socket.io-client'

const BASE_URL = "http://localhost:8008"

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
            // console.log(res);
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
            // console.log(data);          //{user data}
            set({isSigningUp:true});
            const res = await axiosInstance.post('/auth/signup',data);
            set({authUser:res.data})                                    
            // console.log(res.data);                            //contains {object about user}
            toast.success('Account Created Successfully');
            get().connectSocket();
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
            const res = await axiosInstance.post('/auth/signin',data);
            set({authUser:res.data})
            toast.success('Successfully SignedIn')
            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.mssg)
            console.log("error in signin",error);
        }finally{
            set({isSigningIn:false})
        }
    },
    updateProfile:async(data)=>{
        try {
            set({isUpdatingProfile:true});
            const res = await axiosInstance.put('/auth/update-profile',data)
            console.log("this is ",res);
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
            console.log("This is userid",userIds);
        })
    },
    disconnectSocket:()=>{
        if(get().socket?.connected) get().socket?.disconnect();
        // set({socket:null})       //makes a fresh connection evertime
    },

}))

