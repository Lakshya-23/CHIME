import React, { useState } from 'react'
import {useAuthStore} from '../store/UseAuthstore'
import {User,Mail,Pencil} from 'lucide-react'
function Profileimg() {
  const {authUser,isUpdatingProfile,updateProfile} = useAuthStore() 
  const [selectedImg,setselectedImg] = useState(null);


  const handleImageUpload=async(e)=>{
    const file = e.target.files[0];       //prevents multiple file upload using drag and drop 
    if(!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload=async()=>{
      const base64Img = reader.result;
      setselectedImg(base64Img);
      await updateProfile({profileImg:base64Img});
    }
  }

  return (
    <div className="min-h-screen pt-10">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-100 shadow-2xl rounded-xl border border-base-content/30 p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl text-base-content font-semibold ">Profile</h1>
            <p className="mt-2 text-base-content/90">Your profile information</p>
          </div>

          {/* avatar upload section */}

          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg||authUser.profileImg || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 "
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200  border-4 border-black
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Pencil className="w-4 h-4 text-base-200 " strokeWidth={2.75} />
                <input
                  type="file"           //only allows 1 file submit by default
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile ? <span className="loading loading-dots loading-lg text-primary/90"></span> : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-base-content/80 font-semibold  flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 text-base-content/80 rounded-lg border ">{authUser?.fullname}</p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-base-content/80 font-semibold flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 text-base-content/80  rounded-lg border">{authUser?.email}</p>
            </div>
          </div>

          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium  mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profileimg
