import { create } from 'zustand'

const WinRewardsStore = create((set, get) => ({
    rewards: [],
    setRewards: (rewards) => set(() => ({ rewards: rewards })),
    resetAll: () => set(() => ({ rewards: [] }))
}))

export default WinRewardsStore;