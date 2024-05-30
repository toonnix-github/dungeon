import { create } from 'zustand';
export const FightPhaseEnum = {
    INITIAL: { number: 0, name: 'INITIAL' },
    CHOOSE_WEAPON: { number: 1, name: 'CHOOSE_WEAPON' },
    ROLE_DICE: { number: 2, name: 'ROLE_DICE' },
    CONFIRM_DICE: { number: 3, name: 'CONFIRM_DICE' },
    ATTACK_SHIELD: { number: 4, name: 'ATTACK_SHIELD' },
    ATTACK_SHIELD_END: { number: 5, name: 'ATTACK_SHIELD_END' },
    ATTACK_HEALTH: { number: 6, name: 'ATTACK_HEALTH' },
    ATTACK_HEALTH_END: { number: 7, name: 'ATTACK_HEALTH_END' },
    COUNTER_ATTACK: { number: 8, name: 'COUNTER_ATTACK' },
    COUNTER_ATTACK_END: { number: 9, name: 'COUNTER_ATTACK_END' },
    MONSTER_DIE: { number: 10, name: 'MONSTER_DIE' },
    MONSTER_DIE_END: { number: 11, name: 'MONSTER_DIE_END' },
    HERO_DIE: { number: 12, name: 'HERO_DIE' },
    HERO_DIE_END: { number: 13, name: 'HERO_DIE_END' },
    PHASE_END: { number: 14, name: 'PHASE_END' }
}

const GameStoreStore = create((set) => ({
    fightPhase: FightPhaseEnum.INITIAL,
    setInit: () => set(() => ({ fightPhase: FightPhaseEnum.INITIAL })),
    setChooseWeapon: () => set(() => ({ fightPhase: FightPhaseEnum.CHOOSE_WEAPON })),
    setRoleDice: () => set(() => ({ fightPhase: FightPhaseEnum.ROLE_DICE })),
    setConfirmDice: () => set(() => ({ fightPhase: FightPhaseEnum.CONFIRM_DICE })),
    setAttackShield: () => set(() => ({ fightPhase: FightPhaseEnum.ATTACK_SHIELD })),
    setAttackShieldEnd: () => set(() => ({ fightPhase: FightPhaseEnum.ATTACK_SHIELD_END })),
    setAttackHealth: () => set(() => ({ fightPhase: FightPhaseEnum.ATTACK_HEALTH })),
    setAttackHealthEnd: () => set(() => ({ fightPhase: FightPhaseEnum.ATTACK_HEALTH_END })),
    setCounterAttack: () => set(() => ({ fightPhase: FightPhaseEnum.COUNTER_ATTACK })),
    setCounterAttackEnd: () => set(() => ({ fightPhase: FightPhaseEnum.COUNTER_ATTACK_END })),
    setMonsterDie: () => set(() => ({ fightPhase: FightPhaseEnum.MONSTER_DIE })),
    setMonsterDieEnd: () => set(() => ({ fightPhase: FightPhaseEnum.MONSTER_DIE_END })),
    setHeroDie: () => set(() => ({ fightPhase: FightPhaseEnum.HERO_DIE })),
    setHeroDieEnd: () => set(() => ({ fightPhase: FightPhaseEnum.HERO_DIE_END })),
    setPhaseEnd: () => set(() => ({ fightPhase: FightPhaseEnum.PHASE_END })),
    netAttackValue: 0,
    setNetAttackValue: (value) => set(() => ({ netAttackValue: value })),
}));

export default GameStoreStore;