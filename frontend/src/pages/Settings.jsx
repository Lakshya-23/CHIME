import React from 'react'
import { useTheme } from '../store/useThemestore'
import { THEMES } from '../constants/Themes'
import { Send } from 'lucide-react'

const PREVIEW_MESSAGES = [
  { id: 1, content: 'Hey, how are you?', isSent: false },
  { id: 2, content: 'I am doing great!', isSent: true },
]


function settings() {

  const { theme, setTheme } = useTheme();

  return (
    <div className='flex min-h-screen w-full justify-center '>
      <div className='flex h-[calc(100vh-6rem)] w-full max-w-7xl mt-[4.6rem]  rounded-md overflow-hidden border shadow-lg border-base-content/30 border-md bg-base-200'>
        <div className='flex w-full h-full'>
          <div className='flex-1'>
            <header className='p-4'>
              <label className="text-lg font-semibold">Theme</label>
              <p className="text-sm text-base-content/70">Choose a theme for your chat interface </p>
            </header>
            <div className="grid sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2 p-4">
              {THEMES.map((t) => (
                <button
                  key={t}
                  className={`
                group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors
                ${theme === t ? "" : "hover:bg-base-content/20"}
              `}
                  onClick={() => setTheme(t)}
                >
                  <div className="relative h-9 w-full rounded-md overflow-hidden" data-theme={t}>
                    <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                      <div className="rounded bg-primary"></div>
                      <div className="rounded bg-secondary"></div>
                      <div className="rounded bg-accent"></div>
                      <div className="rounded bg-neutral"></div>
                    </div>
                  </div>
                  <span className="text-[11px] font-medium truncate w-full text-center">
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </span>
                </button>
              ))}
            </div>
          </div>
          {/* Preview Section */}
          <div className="flex-[0.8] mr-4">
            <h3 className="text-lg font-semibold p-4 pl-0 pb-3">Preview</h3>
            <div >
              <div className=" max-w-xl mx-auto  ">
                {/* Mock Chat UI */}
                <div className=" rounded-xl border shadow-xl shadow-neutral/70 border-base-content/10 overflow-hidden">
                  {/* Chat Header */}
                  <div className="px-4 py-3 border-b border-base-300 bg-base-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
                        J
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">John Doe</h3>
                        <p className="text-xs text-base-content/70">Online</p>
                      </div>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="p-4  flex flex-col justify-between space-y-4 min-h-96 max-h-full overflow-y-auto bg-base-100">
                    {PREVIEW_MESSAGES.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`
                          max-w-[80%] rounded-xl p-3 shadow-sm
                          ${message.isSent ? "bg-primary text-primary-content" : "bg-base-200"}
                        `}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p
                            className={`
                            text-[10px] mt-1.5
                            ${message.isSent ? "text-primary-content/70" : "text-base-content/70"}
                          `}
                          >
                            12:00 PM
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Chat Input */}
                  <div className="p-4 border-t border-base-300 bg-base-100">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="input input-bordered flex-1 text-sm h-10"
                        placeholder="Type a message..."
                        value="This is a preview"
                        readOnly
                      />
                      <button className="btn btn-primary h-10 min-h-0">
                        <Send size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>



  );
}

export default settings
