import { create } from "zustand";

interface FloorSelection {
    selectedFloor: string;
    selectTheFloor: (payload: string) => void;
    resetTheFloor: () => void;
}
export const useSelectFloor = create<FloorSelection>((set) => ({
    selectedFloor: "",
    selectTheFloor: (payload) => set(() => ({ selectedFloor: payload })),
    resetTheFloor: () => set(() => ({ selectedFloor: "" }))
}));

interface SearchInputType {
    inputSearch: string;
    setInputSearch: (payload: string) => void;
    resetInputSearch: () => void;
}
export const useSearchInput = create<SearchInputType>((set) => ({
    inputSearch: "",
    setInputSearch: (payload) => set(() => ({ inputSearch: payload })),
    resetInputSearch: () => set(() => ({ inputSearch: "" }))
}));