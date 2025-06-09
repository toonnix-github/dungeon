export const clearLocalStorage = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.clear();
    }
};

import DiceStore from '../Store/Dice.store';
import GameStateStore from '../Store/GameState.store';
import GoblinStore from '../Store/Goblin.store';
import LootPopupStore from '../Store/LootPopup.store';
import roomStore from '../Store/Room.store';
import TreasureStore from '../Store/Treasure.store';
import VikingStore from '../Store/Viking.store';
import WinRewardsStore from '../Store/WinRewards.store';

export const resetGame = () => {
    clearLocalStorage();
    DiceStore.getState().resetAll && DiceStore.getState().resetAll();
    GameStateStore.getState().resetAll && GameStateStore.getState().resetAll();
    GoblinStore.getState().resetAll && GoblinStore.getState().resetAll();
    LootPopupStore.getState().resetAll && LootPopupStore.getState().resetAll();
    roomStore.getState().resetAll && roomStore.getState().resetAll();
    TreasureStore.getState().resetAll && TreasureStore.getState().resetAll();
    VikingStore.getState().resetAll && VikingStore.getState().resetAll();
    WinRewardsStore.getState().resetAll && WinRewardsStore.getState().resetAll();
};
