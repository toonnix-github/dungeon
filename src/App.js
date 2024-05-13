import './App.scss';
import './item.scss';
import RoomComponent from './Components/Room.component';
import ControllerComponent from './Components/Controller.component';
import RoomDisplayComponent from './Components/RoomDisplay.component';

import React, { useState } from 'react';
import VikingComponent from './Components/Viking.component';
import HeroDisplayComponent from './Components/HeroDisplay.component';
import HeroActionComponent from './Components/HeroAction.component';

function App() {
  const [isShowPopup, setIsShowPopup] = useState(false);
  const [isTrapRoomPopup, setIsTrapRoomPopup] = useState(false);
  const [isShowTreasurePopup, setIsShowTreasurePopup] = useState(false);
  const [isRoomRotating, setIsRoomRotating] = useState(false);

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
      {
        isShowPopup &&
        <div className="modal-overlay">
          <div className="modal">
            <span>!!YOU FOUND A GOBLIN!!</span>
            <button className="close-button" onClick={() => setIsShowPopup(false)}>X</button>
          </div>
        </div>
      }
      {
        isTrapRoomPopup &&
        <div className="modal-overlay">
          <div className="modal">
            <span>!!YOU'VE BEEN TRAPPED!!</span>
            <button className="close-button" onClick={() => setIsTrapRoomPopup(false)}>X</button>
          </div>
        </div>
      }
      {
        isShowTreasurePopup &&
        <div className="modal-overlay">
          <div className="modal">
            <span>$$ Treasure Room $$. RUN</span>
            <button className="close-button" onClick={() => setIsShowTreasurePopup(false)}>X</button>
          </div>
        </div>
      }
    </div >
  );
}

export default App;