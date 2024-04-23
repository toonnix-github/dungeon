import { create } from 'zustand'

const VikingStore = create((set) => ({
    status: { attack: 20, defence: 10, magic: 5, speed: 5 },
    health: { current: 10, max: 10 },
    position: [3, 3],
    previousPosition: [3, 3],
    comeFromPath: '',
    offset: [0, 0],
    weapon: [],
    armor: {},
    items: [{}, {}, {}],
    setPreviousPosition: (_previousPosition) => set(() => ({ previousPosition: _previousPosition })),
    setComeFromPath: (direction) => set(() => ({ comeFromPath: direction })),
    moveUp: () => set((state) => ({ position: [state.position[0] - 1, state.position[1]] })),
    moveRight: () => set((state) => ({ position: [state.position[0], state.position[1] + 1] })),
    moveBottom: () => set((state) => ({ position: [state.position[0] + 1, state.position[1]] })),
    moveLeft: () => set((state) => ({ position: [state.position[0], state.position[1] - 1] })),
    setOffset: (top, left) => set(() => ({ offset: [top, left] })),
    isMoveDone: true,
    setIsMoving: () => set(() => ({ isMoveDone: false })),
    setIsMoveDone: () => set(() => ({ isMoveDone: true })),
}));

export default VikingStore;