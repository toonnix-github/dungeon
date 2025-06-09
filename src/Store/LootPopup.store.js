import { create } from 'zustand'

const LootPopupStore = create((set) => ({
    isShowPopup: false,
    showPopup: () => set(() => ({ isShowPopup: true })),
    closePopup: () => set(() => ({ isShowPopup: false })),
    newFoundLoot: {},
    setNewFoundLoot: (loot) => set(() => ({ newFoundLoot: loot })),
    resetNewFoundLoot: () => set(() => ({ newFoundLoot: {} })),
    isBegin: false,
    isEnd: false,
    begin: (isBegin) => set(() => ({ isBegin: true, isEnd: false })),
    end: (isEnd) => set(() => ({ isBegin: false, isEnd: true })),
    resetAll: () => set(() => ({
        isShowPopup: false,
        newFoundLoot: {},
        isBegin: false,
        isEnd: false
    }))
}));

export default LootPopupStore;
