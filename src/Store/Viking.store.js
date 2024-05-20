import { create } from 'zustand';

const VikingAxe = {
    type: "weapon",
    name: "Viking Axe",
    id: "viking-axe",
    description: "Basic weapon of Viking hero",
    attack: 20,
    defend: 0
};

const VikingStore = create((set, get) => ({
    status: { attack: 20, defend: 10, magic: 5, speed: 5 },
    dicePower: { attack: 3, magic: 1, speed: 1 },
    health: { current: 10, max: 10 },
    action: { current: 5, max: 5 },
    move: { current: 6, max: 6 },
    position: [3, 3],
    previousPosition: [3, 3],
    comeFromPath: '',
    offset: [0, 0],
    weapon: [VikingAxe],
    armor: [],
    rune: [],
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
    updateWeapon: (_weapon) => set(() => {
        return ({ weapon: _weapon });
    }),
    updateRune: (_rune) => set(() => {
        return ({ rune: _rune });
    }),
    updateArmor: (_armor) => set(() => {
        return ({ armor: _armor });
    }),
    useAction: () => set((state) => ({
        action: {
            current: state.action.current - 1,
            max: state.action.max
        }
    })),
    useMove: () => set((state) => ({
        move: {
            current: state.move.current - 1,
            max: state.move.max
        }
    })),
    takeDamage: (damage) => set((state) => ({
        health: {
            current: state.health.current - damage,
            max: state.health.max
        }
    })),
    receiveHeal: (heal) => set((state) => ({
        health: {
            current: (state.health.current + heal) > state.health.max ? state.health.max : state.health.current + heal,
            max: state.health.max
        }
    })),
}));

export default VikingStore;