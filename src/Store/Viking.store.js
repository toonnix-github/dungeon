import { create } from 'zustand'

const VikingStore = create((set) => ({
    status: { attack: 20, defence: 10, magic: 5, speed: 5 },
    health: { current: 10, max: 10 },
    action: { current: 5, max: 5 },
    position: [3, 3],
    previousPosition: [3, 3],
    comeFromPath: '',
    offset: [0, 0],
    weapon: [],
    armor: {},
    items: [{}, {}, {}],
    isMoveDone: true,
    setPreviousPosition: (_previousPosition) => set(() => ({ previousPosition: _previousPosition })),
    setComeFromPath: (direction) => set(() => ({ comeFromPath: direction })),
    moveUp: () => set((state) => ({ position: [state.position[0] - 1, state.position[1]] })),
    moveRight: () => set((state) => ({ position: [state.position[0], state.position[1] + 1] })),
    moveBottom: () => set((state) => ({ position: [state.position[0] + 1, state.position[1]] })),
    moveLeft: () => set((state) => ({ position: [state.position[0], state.position[1] - 1] })),
    setOffset: (top, left) => set(() => ({ offset: [top, left] })),
    setIsMoving: () => set(() => ({ isMoveDone: false })),
    setIsMoveDone: () => set(() => ({ isMoveDone: true })),
    useAction: () => set((state) => ({
        action: {
            current: state.action.current - 1,
            max: state.action.max
        }
    }))
}));

export default VikingStore;