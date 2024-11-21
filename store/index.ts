import {create} from 'zustand'
 

type store = {
    count: string
  }

 export const useStore = create<store>()(() => ({
    count: "1",
  }))