import roomInformationList from '../Assets/Room';
import React, { useState, useRef, useEffect, useMemo } from 'react';

function RoomComponent({
  rowIndex, columnIndex, roomsDeck,
  setRoomsDeck, roomData, setRoomData,
  roomCount, setRoomCount, setIsShowPopup,
  setIsTrapRoomPopup, setIsShowTreasurePopup, vikingPosition,
  ...props
}) {
  const roomRef = useRef()
  const [roomInformation, setRoomInformation] = useState({ exist: {} });
  const [roomState, setRoomState] = useState("cover");
  const [finalizeRoomRotate, setFinalizeRoomRotate] = useState();
  const [confirmButtonState, setConfirmButtonState] = useState(false);
  const [isGoblin, setIsGoblin] = useState(false)
  const [isTrapRoom, setIsTrapRoom] = useState(false);
  const [isTreasureRoom, setIsTreasureRoom] = useState(false);
  const [isVikingPosition, setIsVikingPosition] = useState(false);
  let updateRoomData = roomData;

  const roomNumber = useMemo(() => {
    return `${rowIndex}-${columnIndex}`;
  }, [rowIndex, columnIndex]);

  const getRandomRoom = () => {
    if (roomsDeck.length > 0) {
      const randomIndex = Math.floor(Math.random() * roomsDeck.length);
      const randomNum = roomsDeck[randomIndex];

      const updateRoomsDeck = roomsDeck.filter((num) => num !== randomNum);
      setRoomsDeck(updateRoomsDeck);
      setRoomInformation(roomInformationList[randomNum]);
    }
  };

  const selectBlankRoom = () => {
    getRandomRoom();
    setRoomState("revealed");
    roomRef.current.classList.add('prompt-rotate');
  };

  useEffect(() => {
    if (roomNumber === '3-3') {
      roomRef.current.classList.add('top', 'bottom', 'left', 'right');
    }
  }, [])

  useEffect(() => {
    if (roomState === 'revealed') {
      roomRef.current.classList.toggle("revealed");
    } else if (roomState === 'enable') {
      roomRef.current.classList.toggle("enable");
      roomRef.current.classList.toggle("dsiable");
    }
  }, [roomState])

  useEffect(() => {
    setIsVikingPosition(vikingPosition === roomNumber);
  }, [vikingPosition])

  useEffect(() => {
    if (roomState !== 'revealed' && roomNumber !== '3-3' && isVikingPosition) {
      selectBlankRoom();
    }
  }, [isVikingPosition]);

  useEffect(() => {
    if (roomState !== 'revealed' && roomNumber !== '3-3') {
      let updateRoomState = 'disable';
      if (rowIndex - 1 >= 0) {
        if (roomData[rowIndex - 1][columnIndex] && roomData[rowIndex - 1][columnIndex]?.exist?.bottom === true) {
          updateRoomState = 'enable'
        }
      }
      if (rowIndex + 1 <= 6) {
        if (roomData[rowIndex + 1][columnIndex] && roomData[rowIndex + 1][columnIndex]?.exist?.top === true) {
          updateRoomState = 'enable'
        }
      }
      if (columnIndex - 1 >= 0) {
        if (roomData[rowIndex][columnIndex - 1] && roomData[rowIndex][columnIndex - 1]?.exist?.right === true) {
          updateRoomState = 'enable'
        }
      }
      if (columnIndex + 1 <= 6) {
        if (roomData[rowIndex][columnIndex + 1] && roomData[rowIndex][columnIndex + 1]?.exist?.left === true) {
          updateRoomState = 'enable'
        }
      }
      setRoomState(updateRoomState);
    }
  }, [roomCount]);

  useEffect(() => {
    assignRoomExist();
  }, [roomInformation]);

  const rotateRoomExist = () => {
    let tempArray = [];
    tempArray.push(roomInformation.exist.top);
    tempArray.push(roomInformation.exist.right);
    tempArray.push(roomInformation.exist.bottom);
    tempArray.push(roomInformation.exist.left);
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
    roomInformation.exist = tempExist;
    assignRoomExist();
  }

  const assignRoomExist = () => {
    if (roomInformation !== null && roomNumber !== '3-3') {
      roomRef.current.classList.remove('top', 'bottom', 'left', 'right');
      for (const direction in roomInformation.exist) {
        if (roomInformation.exist[direction]) {
          roomRef.current.classList.add(direction);
        }
      }
    }
    let confirmButtonState = false;
    if (rowIndex - 1 >= 0) {
      if (roomData[rowIndex - 1][columnIndex] && roomData[rowIndex - 1][columnIndex]?.exist?.bottom === true) {
        if (roomInformation.exist.top) confirmButtonState = true
      }
    }
    if (rowIndex + 1 <= 6) {
      if (roomData[rowIndex + 1][columnIndex] && roomData[rowIndex + 1][columnIndex]?.exist?.top === true) {
        if (roomInformation.exist.bottom) confirmButtonState = true
      }
    }
    if (columnIndex - 1 >= 0) {
      if (roomData[rowIndex][columnIndex - 1] && roomData[rowIndex][columnIndex - 1]?.exist?.right === true) {
        if (roomInformation.exist.left) confirmButtonState = true
      }
    }
    if (columnIndex + 1 <= 6) {
      if (roomData[rowIndex][columnIndex + 1] && roomData[rowIndex][columnIndex + 1]?.exist?.left === true) {
        if (roomInformation.exist.right) confirmButtonState = true
      }
    }
    setConfirmButtonState(confirmButtonState)
  }

  const confirmRotation = () => {
    setFinalizeRoomRotate(true);
    setIsGoblin(roomInformation.foundGoblin);
    setIsShowPopup(roomInformation.foundGoblin);
    setIsTrapRoom(roomInformation.isTrapRoom);
    setIsTrapRoomPopup(roomInformation.isTrapRoom);
    setIsTreasureRoom(roomInformation.isTreasureRoom);
    setIsShowTreasurePopup(roomInformation.isTreasureRoom);
    roomRef.current.classList.remove('prompt-rotate');
  };

  useEffect(() => {
    if (finalizeRoomRotate) {
      updateRoomData[rowIndex][columnIndex] = { ...updateRoomData[rowIndex][columnIndex], ...roomInformation };
      setRoomData(updateRoomData);
      setRoomCount(roomCount + 1);
    }
  }, [finalizeRoomRotate]);

  return (
    <div ref={roomRef} className="grid-item disable" id={`grid-item-${roomNumber}`}>
      {(roomNumber !== '3-3' && roomState !== 'revealed' && roomState === 'enable') &&
        <button className='reveal-button' onClick={() => selectBlankRoom()}>Explore</button>
      }
      {roomState === 'revealed' && <span className='room-name'>{roomInformation.name}</span>}
      <div className='path middle'></div>
      <div className='path path-top'></div>
      <div className='path path-bottom'></div>
      <div className='path path-left'></div>
      <div className='path path-right'></div>
      <button className='rotate-button' onClick={() => rotateRoomExist()}>Rotate</button>
      <button className='confirm-rotate-button' disabled={!confirmButtonState} onClick={() => confirmRotation()}>Confirm</button>

      {isGoblin && <span className='icon icon-goblin'></span>}
      {isTrapRoom && <span className='icon icon-trap'></span>}
      {isTreasureRoom && <span className='icon icon-treasure'></span>}
      {isVikingPosition && <span className='icon icon-viking'></span>}
    </div>
  )
}

export default RoomComponent;