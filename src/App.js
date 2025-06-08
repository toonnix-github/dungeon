import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import './item.scss';
import "../src/Components/HeroDisplay.scss";
import 'react-tooltip/dist/react-tooltip.css';
import './styles/card.scss';
import RoomComponent from './Components/Room/Room.component';
import ControllerComponent from './Components/Controller.component';
import GoblinComponent from './Components/Goblin/Goblin.component';

import React, { useState } from 'react';
import VikingComponent from './Components/Viking.component';
import HeroDisplayComponent from './Components/HeroDisplay.component';
import HeroActionComponent from './Components/HeroAction.component';
import GoblinStore from './Store/Goblin.store';
import WinRewardsComponent from './Components/WinRewards.component';
import LootPopup from './Components/LootPopup.component';
import GoblinDefeatedModal from './Components/Goblin/GoblinDefeatedModalComponent';

function App() {
  const [isRoomRotating, setIsRoomRotating] = useState(false);
  const goblinGang = GoblinStore((state) => state.gang);

  return (
    <div className="App">
      <div className="grid-container">
        {[...Array(7)].map((_, rowIndex) => (
          [...Array(7)].map((_, columnIndex) => (
            <RoomComponent
              key={`room-number-${rowIndex}-${columnIndex}`}
              roomNumber={[rowIndex, columnIndex]}
              isRoomRotating={isRoomRotating}
              setIsRoomRotating={setIsRoomRotating}
            />
          ))
        ))}
        <VikingComponent />
      </div>
      <div className='right-panel'>
        <HeroDisplayComponent />
        <HeroActionComponent />
        <ControllerComponent />
      </div>
      {goblinGang.map((goblin, index) => (
        <GoblinComponent key={index} index={index} goblin={goblin} />
      ))}
      <WinRewardsComponent />
      <LootPopup />
      <GoblinDefeatedModal />
    </div >
  );
}

export default App;