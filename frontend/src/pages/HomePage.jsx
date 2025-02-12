import React from 'react'
import {useChatStore} from '../store/usChatStore'
import Sidebar from '../components/Sidebar'
import ChatHomeScreen from '../components/ChatHomeScreen'
import ChatContainer from '../components/ChatContainer'
function HomePage() {
  const {userselected}  = useChatStore();
  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-[4.6rem] px-4">
        <div className="bg-base-100 rounded-lg shadow-lg border border-base-content/20 w-full max-w-7xl h-[calc(100vh-6rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />

            {!userselected ? <ChatHomeScreen /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage
