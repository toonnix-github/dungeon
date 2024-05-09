import { create } from 'zustand'

const DiceStore = create((set) => ({
    posibility: [
        {
            type: 'main-point',
            amount: 4,
            health: 0,
            
        }
    ],
    updateDeck: (newDeckData) => set(() => ({ deck: newDeckData })),
}))

export default DiceStore;