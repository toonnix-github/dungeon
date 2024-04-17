import './App.css';
import RoomComponent from './Components/Room.component.try';
import ControllerComponent from './Components/Controller.component';
import RoomDisplayComponent from './Components/RoomDisplay.component';
import roomStore from './Store/Room.store';

import React, { useEffect, useState, useStore } from 'react';

function App() {
  const [isShowPopup, setIsShowPopup] = useState(false);
  const [isTrapRoomPopup, setIsTrapRoomPopup] = useState(false);
  const [isShowTreasurePopup, setIsShowTreasurePopup] = useState(false);
  const [vikingPosition, setVikingPosition] = useState('3-3');
  const [isRoomRotating, setIsRoomRotating] = useState(false);

  const rooms = roomStore((state) => state.rooms);

  return (
    <div className="App">
      <div className='left-panel'>
        <RoomDisplayComponent
        />
        <ControllerComponent
          vikingPosition={vikingPosition}
          setVikingPosition={setVikingPosition}
        />
      </div>
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
      </div>
      <div className='right-panel'>

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