import {create} from 'zustand'

export const useTheme = create((set)=>({
    theme :localStorage.getItem('chat-theme') || "dim",
    setTheme:(theme)=>{
        localStorage.setItem('chat-theme',theme);
        set({theme});
    }
}))