import { create } from 'zustand';

// Consolidated combat phases used throughout the encounter flow
export const FightPhaseEnum = {
    IDLE: 'IDLE',
    CHOOSE_WEAPON: 'CHOOSE_WEAPON',
    ROLL_DICE: 'ROLL_DICE',
    APPLY_DAMAGE: 'APPLY_DAMAGE',
    COUNTER_ATTACK: 'COUNTER_ATTACK',
    VICTORY: 'VICTORY',
    DEFEAT: 'DEFEAT'
};

const GameStoteStore = create((set) => ({
    fightPhase: FightPhaseEnum.IDLE,
    goblinEncounter: false,
    setGoblinEncounter: (value) => set(() => ({ goblinEncounter: value })),
    setFightPhase: (phase) => set(() => ({ fightPhase: phase })),
    netAttackValue: 0,
    setNetAttackValue: (value) => set(() => ({ netAttackValue: value })),
    monsterShieldBroken: false,
    setMonsterShieldBroken: (value) => set(() => ({ monsterShieldBroken: value })),
    monsterHeartBroken: false,
    setMonsterHeartBroken: (value) => set(() => ({ monsterHeartBroken: value })),
    resetAll: () => set(() => ({
        fightPhase: FightPhaseEnum.IDLE,
        netAttackValue: 0,
        monsterShieldBroken: false,
        monsterHeartBroken: false,
        goblinEncounter: false
    }))
}));

export default GameStoteStore;
