import { create } from 'zustand';

const GoblinStore = create((set) => ({
    gang: [],
    addGoblin: (goblin) => set((state) => ({
        gang: [...state.gang, goblin]
    })),
    killGoblinByIdx: (index) => set((state) => ({
        gang: state.gang.filter((_, i) => i !== index)
    })),
    moveUp: (index) => set((state) => ({
        gang: state.gang.map((goblin, i) => i === index ? { ...goblin, position: { x: goblin.position.x, y: goblin.position.y - 1 } } : goblin)
    })),
    moveRight: (index) => set((state) => ({
        gang: state.gang.map((goblin, i) => i === index ? { ...goblin, position: { x: goblin.position.x + 1, y: goblin.position.y } } : goblin)
    })),
    moveDown: (index) => set((state) => ({
        gang: state.gang.map((goblin, i) => i === index ? { ...goblin, position: { x: goblin.position.x, y: goblin.position.y + 1 } } : goblin)
    })),
    moveLeft: (index) => set((state) => ({
        gang: state.gang.map((goblin, i) => i === index ? { ...goblin, position: { x: goblin.position.x - 1, y: goblin.position.y } } : goblin)
    })),
    resetAll: () => set(() => ({ gang: [] }))
}));

export default GoblinStore;
