// store.js
import {create} from "zustand";

interface storeData{
    pdfFile:string,
    updatePdfFile: (newFile:string)=>void 
}

const useStore = create<storeData>((set) => ({
  // Define your state and actions here
  pdfFile: "",
  updatePdfFile: (newFile) => set({ pdfFile: newFile }),
  //   decrease: () => set((state) => ({ count: state.count - 1 })),
}));

export default useStore;
