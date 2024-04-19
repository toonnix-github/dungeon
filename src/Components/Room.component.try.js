import React, { useState, useRef, useEffect } from 'react';
import roomStore from '../Store/Room.store';
import RoomUtil from '../Util/Room.Util';
const _ = require('lodash');

function RoomComponent({ roomNumber, isRoomRotating, setIsRoomRotating }) {
  const roomRef = useRef()
  const [roomNumberString, setRoomNumberString] = useState();
  const roomsData = roomStore((state) => state.rooms);
  const [adjacentRoomsData, setAdjacentRoomsData] = useState({
    top: null,
    right: null,
    bottom: null,
    left: null,
  });
  const roomData = roomStore((state) => state.rooms[roomNumber[0]][roomNumber[1]]);
  const assignRoom = roomStore((state) => state.assignRoom);
  const [isEntranceRoom, setIsEntranceRoom] = useState(false);
  const [roomStatus, setRoomStatus] = useState('');
  const [isReadyToExplore, setIsReadyToExplore] = useState(false);
  const [confirmButtonState, setConfirmButtonState] = useState();
  const [isFoundGoblin, setIsFoundGoblin] = useState(false);
  const [isTreasureRoom, setIsTreasureRoom] = useState(false);
  const [isTrapRoom, setIsTrapRoom] = useState(false);

  useEffect(() => {
    if (roomNumber) {
      setRoomNumberString(`${roomNumber[0]}-${roomNumber[1]}`);
    }
  }, [roomNumber]);

  useEffect(() => {
    setAdjacentRoomsData({
      top: roomNumber[0] > 0 ? roomsData[roomNumber[0] - 1][roomNumber[1]] : null,
      right: roomNumber[1] + 1 < 6 ? roomsData[roomNumber[0]][roomNumber[1] + 1] : null,
      bottom: [roomNumber[0] + 1] < 6 ? roomsData[roomNumber[0] + 1][roomNumber[1]] : null,
      left: roomNumber[1] - 1 > 0 ? roomsData[roomNumber[0]][roomNumber[1] - 1] : null
    })
  }, [roomsData]);

  useEffect(() => {
    checkConfirmButtonState();
    if (roomData.id === 0) setIsEntranceRoom(true);
    if (roomData.foundGoblin) setIsFoundGoblin(true);
    if (roomData.isTrapRoom) setIsTrapRoom(true);
    if (roomData.isTreasureRoom) setIsTreasureRoom(true);
  }, [roomData]);

  useEffect(() => {
    const checkExploreStatusButton = () => {
      if (roomStatus !== 'revealed' || roomStatus !== 'readyToExplore') {
        let _isReadyToExplore = false;
        if (adjacentRoomsData.top?.exist?.bottom) {
          _isReadyToExplore = true
        }
        if (adjacentRoomsData.bottom?.exist?.top) {
          _isReadyToExplore = true
        }
        if (adjacentRoomsData.left?.exist?.right) {
          _isReadyToExplore = true
        }
        if (adjacentRoomsData.right?.exist?.left) {
          _isReadyToExplore = true
        }
        setIsReadyToExplore(_isReadyToExplore);
      }
    }
    checkExploreStatusButton();
  }, [adjacentRoomsData])

  const selectBlankRoom = () => {
    assignRoom(roomNumber[0], roomNumber[1], RoomUtil.getRandomRoom());
    setRoomStatus('prompt-rotate');
    setIsRoomRotating(true)
  };

  // useEffect(() => {
  //   setIsVikingPosition(vikingPosition === roomNumber);
  // }, [vikingPosition])

  // useEffect(() => {
  //   if (roomState !== 'revealed' && roomNumber !== '3-3' && isVikingPosition) {
  //     selectBlankRoom();
  //   }
  // }, [isVikingPosition]);

  const rotateRoomExist = () => {
    let tempArray = [];
    tempArray.push(roomData.exist.top);
    tempArray.push(roomData.exist.right);
    tempArray.push(roomData.exist.bottom);
    tempArray.push(roomData.exist.left);
    const lastElement = tempArray.pop();
    tempArray.unshift(lastElement);
    let tempExist = {
      top: false,
      right: false,
      bottom: false,
      left: false,
    }
    tempExist.top = tempArray[0];
    tempExist.right = tempArray[1];
    tempExist.bottom = tempArray[2];
    tempExist.left = tempArray[3];
    roomData.exist = tempExist;
    assignRoom(roomNumber[0], roomNumber[1], roomData);
  }

  const checkConfirmButtonState = () => {
    let confirmButtonState = false;
    if (roomNumber[0] - 1 >= 0) {
      if (adjacentRoomsData.top?.exist?.bottom && roomData?.exist?.top) {
        confirmButtonState = true
      }
    }
    if (roomNumber[0] + 1 <= 6) {
      if (adjacentRoomsData.bottom?.exist?.top && roomData?.exist?.bottom) {
        confirmButtonState = true
      }
    }
    if (roomNumber[1] - 1 >= 0) {
      if (adjacentRoomsData.left?.exist?.right && roomData?.exist?.left) {
        confirmButtonState = true
      }
    }
    if (roomNumber[1] + 1 <= 6) {
      if (adjacentRoomsData.right?.exist?.left && roomData?.exist?.right) {
        confirmButtonState = true
      }
    }
    setConfirmButtonState(confirmButtonState)
  }

  const confirmRoom = () => {
    setRoomStatus('revealed'); 
    setIsRoomRotating(false);
  }

  return (
    <div ref={roomRef} className={"grid-item" + ((!(roomStatus === 'revealed' || isRoomRotating || isEntranceRoom) && isReadyToExplore) ? " ready-to-explore" : "")} id={`grid-item-${roomNumberString}`}>
      {(!(roomStatus === 'revealed' || isRoomRotating || isEntranceRoom) && isReadyToExplore) && <button className='reveal-button' onClick={() => selectBlankRoom()}>Explore</button>}
      {roomData?.exist?.top && <div className='path path-top'></div>}
      {roomData?.exist?.bottom && <div className='path path-bottom'></div>}
      {roomData?.exist?.left && <div className='path path-left'></div>}
      {roomData?.exist?.right && <div className='path path-right'></div>}
      {roomData.name && <div className='path middle'></div>}
      {isFoundGoblin && <span className='icon icon-goblin'></span>}
      {isTrapRoom && <span className='icon icon-trap'></span>}
      {isTreasureRoom && <span className='icon icon-treasure'></span>}
      {roomStatus === 'prompt-rotate' &&
        <div className='button-container'>
          <button className='rotate-button' onClick={() => rotateRoomExist()}>Rotate</button>
          <button className='confirm-rotate-button' disabled={!confirmButtonState} onClick={() => { confirmRoom() }}>Confirm</button>
          <span>{!confirmButtonState}</span>
        </div>
      }

      {/* {isVikingPosition && <span className='icon icon-viking'></span>} */}
    </div>
  )
}

export default RoomComponent;