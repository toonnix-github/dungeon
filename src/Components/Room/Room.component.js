import React, { useState, useRef, useEffect } from 'react';
import roomStore from '../../Store/Room.store';
import VikingStore from '../../Store/Viking.store';
import RoomPaths from './RoomPaths.component';
import RotateButtons from './RotateButton.component';
import { RevealMethodENUM, oppositeDirection, getRandomRoom } from '../../Util/Room.Util';
import _ from 'lodash';

function RoomComponent({ roomNumber, isRoomRotating, setIsRoomRotating }) {
  const roomRef = useRef();
  const [roomNumberString, setRoomNumberString] = useState('');
  const [roomStatus, setRoomStatus] = useState('');
  const [confirmButtonState, setConfirmButtonState] = useState(false);
  const [isReadyToExplore, setIsReadyToExplore] = useState(false);
  const [isEntranceRoom, setIsEntranceRoom] = useState(false);
  const [isFoundGoblin, setIsFoundGoblin] = useState(false);
  const [isTrapRoom, setIsTrapRoom] = useState(false);
  const [isTreasureRoom, setIsTreasureRoom] = useState(false);
  const [isOperatingRoom, setIsOperatingRoom] = useState(false);

  const roomsData = roomStore(state => state.rooms);
  const roomData = roomStore(state => state.rooms[roomNumber[0]][roomNumber[1]]);
  const assignRoom = roomStore(state => state.assignRoom);
  const vikingPosition = VikingStore(state => state.position);
  const setVikingOffset = VikingStore(state => state.setOffset);
  const setIsMoveDone = VikingStore(state => state.setIsMoveDone);
  const previousPosition = VikingStore(state => state.previousPosition);
  const comeFromPath = VikingStore(state => state.comeFromPath);

  const [adjacentRoomsData, setAdjacentRoomsData] = useState({
    top: null,
    right: null,
    bottom: null,
    left: null,
  });

  useEffect(() => {
    if (roomNumber) {
      setRoomNumberString(`${roomNumber[0]}-${roomNumber[1]}`);
    }
  }, [roomNumber]);

  useEffect(() => {
    setAdjacentRooms();
    checkRoomStatus();
  }, [roomsData, roomData]);

  useEffect(() => {
    checkExploreStatusButton();
  }, [adjacentRoomsData]);

  useEffect(() => {
    if (isCurrentRoom()) {
      setVikingOffset(roomRef.current.offsetTop, roomRef.current.offsetLeft);
      if (isReadyToExplore && !roomData.id && !isEntranceRoom) {
        selectBlankRoom(RevealMethodENUM.HERO_MOVE);
      } else {
        setIsMoveDone();
      }
    }
  }, [vikingPosition]);

  const setAdjacentRooms = () => {
    setAdjacentRoomsData({
      top: roomNumber[0] > 0 ? roomsData[roomNumber[0] - 1][roomNumber[1]] : null,
      right: roomNumber[1] < 6 ? roomsData[roomNumber[0]][roomNumber[1] + 1] : null,
      bottom: roomNumber[0] < 6 ? roomsData[roomNumber[0] + 1][roomNumber[1]] : null,
      left: roomNumber[1] > 0 ? roomsData[roomNumber[0]][roomNumber[1] - 1] : null
    });
  };

  const checkRoomStatus = () => {
    setIsEntranceRoom(roomData.id === 0);
    setIsFoundGoblin(roomData.foundGoblin);
    setIsTrapRoom(roomData.isTrapRoom);
    setIsTreasureRoom(roomData.isTreasureRoom);
    checkConfirmButtonState();
  };

  const checkExploreStatusButton = () => {
    if (roomStatus !== 'revealed' && roomStatus !== 'readyToExplore') {
      const ready = ['top', 'bottom', 'left', 'right'].some(direction => {
        const adjRoom = adjacentRoomsData[direction];
        return adjRoom && adjRoom.exit && adjRoom.exit[oppositeDirection(direction)]
      }
      );
      setIsReadyToExplore(ready);
    }
  };

  const selectBlankRoom = (revealMethod) => {
    const randomRoom = getRandomRoom();
    randomRoom.revealMethod = revealMethod;
    assignRoom(roomNumber[0], roomNumber[1], randomRoom);
    setRoomStatus('prompt-rotate');
    setIsRoomRotating(true);
    setIsOperatingRoom(true);
  };

  const isCurrentRoom = () => _.isEqual(vikingPosition, roomNumber);

  const rotateRoomExit = () => {
    const tempExit = {
      top: roomData.exit.left,
      right: roomData.exit.top,
      bottom: roomData.exit.right,
      left: roomData.exit.bottom
    };
    roomData.exit = tempExit;
    assignRoom(roomNumber[0], roomNumber[1], roomData);
  };

  const checkConfirmButtonState = () => {
    let state = false;
    if (roomData?.revealMethod === RevealMethodENUM.HERO_MOVE) {
      state = ['top', 'right', 'bottom', 'left'].some(direction => comeFromPath === direction && roomData.exit[direction]);
    } else if (roomData?.revealMethod === RevealMethodENUM.VISION) {
      state = ['top', 'bottom', 'left', 'right'].some(direction => {
        const adjRoom = adjacentRoomsData[direction];
        return adjRoom && adjRoom.exit && adjRoom.exit[oppositeDirection(direction)] && roomData.exit[direction]
      });
    }
    setConfirmButtonState(state);
  };

  const confirmRoom = () => {
    setRoomStatus('revealed');
    setIsRoomRotating(false);
    setIsOperatingRoom(false);
    setIsMoveDone();
  };

  const isShowPreviousPath = () => previousPosition === roomNumberString && isRoomRotating;

  return (
    <div
      ref={roomRef}
      className={`grid-item ${getGridItemClasses()}`}
      id={`grid-item-${roomNumberString}`}
    >
      {!isRoomRevealed() && isReadyToExplore && (
        <button className='explore-button' onClick={() => !isRoomRotating && selectBlankRoom(RevealMethodENUM.VISION)}></button>
      )}
      <RoomPaths roomData={roomData} comeFromPath={comeFromPath} isShowPreviousPath={isShowPreviousPath} />
      {roomData.name && <div className='path middle'></div>}
      {isFoundGoblin && <span className='icon icon-goblin'></span>}
      {isTrapRoom && <span className={`icon icon-trap ${roomData.solved ? 'solved' : ''}`}></span>}
      {isTreasureRoom && <span className={`icon icon-treasure ${roomData.solved ? 'solved' : ''}`}></span>}
      {roomStatus === 'prompt-rotate' && <RotateButtons confirmButtonState={confirmButtonState} rotateRoomExit={rotateRoomExit} confirmRoom={confirmRoom} />}
    </div>
  );

  function getGridItemClasses() {
    return [
      (!isRoomRevealed() && isReadyToExplore ? "ready-to-explore" : ""),
      (isRoomRevealed() ? "revealed" : ""),
      (isRoomRotating && !isOperatingRoom && previousPosition !== roomNumberString ? 'room-is-rotating' : "")
    ].join(" ");
  }

  function isRoomRevealed() {
    return roomStatus === 'revealed' || isOperatingRoom || isEntranceRoom;
  }
}

export default RoomComponent;
