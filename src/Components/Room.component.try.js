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

  // useEffect(() => {
  //   assignRoomExist();
  // }, [roomInformation]);

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

  // const assignRoomExist = () => {
  // if (roomExist !== null) {
  //   for (const direction in roomData.exist) {
  //     if (roomData.exist[direction]) {
  //       roomRef.current.classList.add(direction);
  //     }
  //   }
  // }

  const checkConfirmButtonState = () => {
    let confirmButtonState = false;
    if (roomNumber[0] - 1 >= 0) {
      if (adjacentRoomsData.top?.exist?.bottom === true) {
        console.log(roomData);
        confirmButtonState = true
      }
    }
    if (roomNumber[0] + 1 <= 6) {
      if (adjacentRoomsData.bottom?.exist?.top === true) {
        confirmButtonState = true
      }
    }
    if (roomNumber[1] - 1 >= 0) {
      if (adjacentRoomsData.left?.exist?.right === true) {
        confirmButtonState = true
      }
    }
    if (roomNumber[1] + 1 <= 6) {
      if (adjacentRoomsData.right?.exist?.left === true) {
        confirmButtonState = true
      }
    }
    setConfirmButtonState(confirmButtonState)
  }

  // const confirmRotation = () => {
  //   setFinalizeRoomRotate(true);
  //   setIsGoblin(roomInformation.foundGoblin);
  //   setIsShowPopup(roomInformation.foundGoblin);
  //   setIsTrapRoom(roomInformation.isTrapRoom);
  //   setIsTrapRoomPopup(roomInformation.isTrapRoom);
  //   setIsTreasureRoom(roomInformation.isTreasureRoom);
  //   setIsShowTreasurePopup(roomInformation.isTreasureRoom);
  //   roomRef.current.classList.remove('prompt-rotate');
  // };

  // useEffect(() => {
  //   if (finalizeRoomRotate) {
  //     updateRoomData[roomNumber[0]][roomNumber[1]] = { ...updateRoomData[roomNumber[0]][roomNumber[1]], ...roomInformation };
  //     setRoomData(updateRoomData);
  //     setRoomCount(roomCount + 1);
  //   }
  // }, [finalizeRoomRotate]);

  return (
    <div ref={roomRef} className="grid-item" id={`grid-item-${roomNumberString}`}>
      {(!(roomStatus === 'revealed' || isRoomRotating || isEntranceRoom) && isReadyToExplore) && <button className='reveal-button' onClick={() => selectBlankRoom()}>Explore</button>}
      {roomData.name && <div className='path middle'></div>}
      {roomData?.exist?.top && <div className='path path-top'></div>}
      {roomData?.exist?.bottom && <div className='path path-bottom'></div>}
      {roomData?.exist?.left && <div className='path path-left'></div>}
      {roomData?.exist?.right && <div className='path path-right'></div>}
      {roomData.name && <span className='room-name'>{roomData.name}</span>}
      {roomStatus === 'prompt-rotate' && <button className='rotate-button' onClick={() => rotateRoomExist()}>Rotate</button>}
      {roomStatus === 'prompt-rotate' &&
        <button className='confirm-rotate-button' disabled={!confirmButtonState} onClick={() => { setRoomStatus('revealed'); setIsRoomRotating(false); }}>Confirm</button>
      }

      {/* {isGoblin && <span className='icon icon-goblin'></span>}
      {isTrapRoom && <span className='icon icon-trap'></span>}
      {isTreasureRoom && <span className='icon icon-treasure'></span>}
      {isVikingPosition && <span className='icon icon-viking'></span>} */}
    </div>
  )
}

export default RoomComponent;