const STORAGE_KEY = 'dungeon-game-state';

import VikingStore from '../Store/Viking.store';
import roomStore from '../Store/Room.store';
import GoblinStore from '../Store/Goblin.store';
import DiceStore from '../Store/Dice.store';
import GameStateStore from '../Store/GameState.store';
import TreasureStore from '../Store/Treasure.store';
import WinRewardsStore from '../Store/WinRewards.store';
import LootPopupStore from '../Store/LootPopup.store';

// Capture initial states so we can reset stores later
const initialViking = VikingStore.getState();
const initialRooms = roomStore.getState();
const initialGoblins = GoblinStore.getState();
const initialDice = DiceStore.getState();
const initialGame = GameStateStore.getState();
const initialTreasure = TreasureStore.getState();
const initialRewards = WinRewardsStore.getState();
const initialLootPopup = LootPopupStore.getState();

const extractViking = (state) => ({
    name: state.name,
    class: state.class,
    defend: state.defend,
    dicePower: state.dicePower,
    health: state.health,
    action: state.action,
    move: state.move,
    position: state.position,
    previousPosition: state.previousPosition,
    comeFromPath: state.comeFromPath,
    offset: state.offset,
    weapon: state.weapon,
    armor: state.armor,
    rune: state.rune,
    spell: state.spell,
    isMoveDone: state.isMoveDone,
});

const extractDice = (state) => ({
    isShowPopup: state.isShowPopup,
    diceScore: state.diceScore,
    isConfirm: state.isConfirm,
    dicePhase: state.dicePhase,
    isShaking: state.isShaking,
});

const extractGame = (state) => ({
    fightPhase: state.fightPhase,
    netAttackValue: state.netAttackValue,
    monsterShieldBroken: state.monsterShieldBroken,
    monsterHeartBroken: state.monsterHeartBroken,
});

const extractLootPopup = (state) => ({
    isShowPopup: state.isShowPopup,
    newFoundLoot: state.newFoundLoot,
    isBegin: state.isBegin,
    isEnd: state.isEnd,
});

export const saveGameState = () => {
    const state = {
        viking: extractViking(VikingStore.getState()),
        rooms: roomStore.getState().rooms,
        goblins: GoblinStore.getState().gang,
        dice: extractDice(DiceStore.getState()),
        game: extractGame(GameStateStore.getState()),
        treasure: TreasureStore.getState().deck,
        rewards: WinRewardsStore.getState().rewards,
        lootPopup: extractLootPopup(LootPopupStore.getState()),
    };
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
        console.error('Failed to save game state', e);
    }
};

export const loadGameState = () => {
    try {
        const value = localStorage.getItem(STORAGE_KEY);
        return value ? JSON.parse(value) : null;
    } catch (e) {
        console.error('Failed to load game state', e);
        return null;
    }
};

export const applyGameState = (state) => {
    if (!state) return;
    if (state.viking) VikingStore.setState((s) => ({ ...s, ...state.viking }));
    if (state.rooms) roomStore.setState((s) => ({ ...s, rooms: state.rooms }));
    if (state.goblins) GoblinStore.setState((s) => ({ ...s, gang: state.goblins }));
    if (state.dice) DiceStore.setState((s) => ({ ...s, ...state.dice }));
    if (state.game) GameStateStore.setState((s) => ({ ...s, ...state.game }));
    if (state.treasure) TreasureStore.setState((s) => ({ ...s, deck: state.treasure }));
    if (state.rewards) WinRewardsStore.setState((s) => ({ ...s, rewards: state.rewards }));
    if (state.lootPopup) LootPopupStore.setState((s) => ({ ...s, ...state.lootPopup }));
};

export const resetStores = () => {
    VikingStore.setState(initialViking, true);
    roomStore.setState(initialRooms, true);
    GoblinStore.setState(initialGoblins, true);
    DiceStore.setState(initialDice, true);
    GameStateStore.setState(initialGame, true);
    TreasureStore.setState(initialTreasure, true);
    WinRewardsStore.setState(initialRewards, true);
    LootPopupStore.setState(initialLootPopup, true);
};

export const resetGameState = () => {
    localStorage.removeItem(STORAGE_KEY);
    resetStores();
};
