import { create } from 'zustand'

const DiceStore = create((set) => ({
    isShowPopup: false,
    showPopup: () => set(() => ({ isShowPopup: true })),
    closePopup: () => set(() => ({ isShowPopup: false })),
}))

export default DiceStore;