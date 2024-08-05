import { create } from "zustand";


interface IModalStore {
    show:boolean,
    open: () => void,
    close: () => void,
}

const useModalStore = create<IModalStore>((set) => ({
    show:false,
    open: ():void => set({show:true}),
    close: ():void => set({show:false})
}))

export default useModalStore;