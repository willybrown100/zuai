// store.js
import {create} from "zustand";

interface storeData {
  pdfFile: string;
  updatePdfFile: (newFile: string) => void;
  setCriteriaA: (newCriteriaA: number) => void;
  setCriteriaB: (newCriteriaB: number) => void;
  setCriteriaC: (newCriteriaC: number) => void;
  setFileName: (newfileName: string) => void;
  criteriaA: number | undefined;
  criteriaB: number | undefined;
  criteriaC: number | undefined;
  fileName: string;
}

const useStore = create<storeData>((set) => ({
  pdfFile: "",
  criteriaA: 0,
  fileName: "",
  criteriaB: 0,
  criteriaC: 0,

  setFileName: (newfileName) => set({ fileName: newfileName }),
  setCriteriaA: (newCriteriaA) => set({ criteriaA: newCriteriaA }),
  setCriteriaB: (newCriteriaB) => set({ criteriaB: newCriteriaB }),
  setCriteriaC: (newCriteriaC) => set({ criteriaC: newCriteriaC }),
  updatePdfFile: (newFile) => set({ pdfFile: newFile }),
}));

export default useStore;
