import { ReactNode } from "react";
import { create } from "zustand";


interface IModalStore {
    show:boolean,
    inner:{children:ReactNode} | null,
    open: (inner:{children:ReactNode}) => void,
    close: () => void,
}

const useModalStore = create<IModalStore>((set) => ({
    show:false,
    inner:null,
    open: (inner):void => set({show:true,inner}),
    close: ():void => set({show:false, inner:null})
}))

export default useModalStore;