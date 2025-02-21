import {create} from 'zustand'

export const useTheme = create((set)=>({
    theme :localStorage.getItem('chat-theme') || "Dim",
    setTheme:(theme)=>{
        localStorage.setItem('chat-theme',theme);
        set({theme});
    }
}))