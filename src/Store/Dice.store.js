import { create } from 'zustand'

const defaultDiceScore = {
    main: 0,
    add1: 0,
    add2: 0
};

const DiceStore = create((set) => ({
    isShowPopup: false,
    showPopup: () => set(() => ({ isShowPopup: true })),
    closePopup: () => set(() => ({ isShowPopup: false })),
    diceScore: defaultDiceScore,
    selectMainDice: (score) => set((state) => ({ diceScore: { ...state.diceScore, main: score } })),
    select1stAddition: (score) => set((state) => ({ diceScore: { ...state.diceScore, add1: score } })),
    select2ndAddition: (score) => set((state) => ({ diceScore: { ...state.diceScore, add2: score } })),
    resetDiceScore: () => set(() => ({ diceScore: defaultDiceScore }))
}))

export default DiceStore;