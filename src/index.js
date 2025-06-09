import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  loadGameState,
  applyGameState,
  saveGameState
} from './Util/Storage.Util';
import VikingStore from './Store/Viking.store';
import roomStore from './Store/Room.store';
import GoblinStore from './Store/Goblin.store';
import DiceStore from './Store/Dice.store';
import GameStateStore from './Store/GameState.store';
import TreasureStore from './Store/Treasure.store';
import WinRewardsStore from './Store/WinRewards.store';
import LootPopupStore from './Store/LootPopup.store';

const savedState = loadGameState();
if (savedState) {
  applyGameState(savedState);
}

[
  VikingStore,
  roomStore,
  GoblinStore,
  DiceStore,
  GameStateStore,
  TreasureStore,
  WinRewardsStore,
  LootPopupStore
].forEach((store) => store.subscribe(saveGameState));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
