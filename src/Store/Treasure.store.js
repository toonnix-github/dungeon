import { create } from 'zustand'
import tresureDeck from '../Assets/Treasure';

const TreasureStore = create((set) => ({
    deck: tresureDeck,
    updateDeck: (newDeckData) => set(() => ({ deck: newDeckData })),
}))

export default TreasureStore;
