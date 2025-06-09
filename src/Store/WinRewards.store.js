import { create } from 'zustand'

export const CurrentItemStateENUM = {
    IS_NOT_ITEM: 'IS_NOT_ITEM',
    IS_ITEM: 'IS_ITEM',
    IS_DONE: 'IS_DONE'
}

export const WinRewardsStaeENUM = {
    IDLE: 'IDLE',
    START: 'START',
    END: 'END'
}

const WinRewardsStore = create((set, get) => ({
    rewards: [],
    currentItemState: CurrentItemStateENUM.IS_NOT_ITEM,
    setCurrentItemState: (state) => set(() => ({ currentItemState: state })),
    shiftReward: () => set((state) => ({ rewards: state.rewards.slice(1) })),
    setRewards: (rewards) => set(() => ({ rewards: rewards })),
    resetAll: () => set(() => ({ rewards: [] }))
}))

export default WinRewardsStore;
