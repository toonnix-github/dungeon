import React, { useState, useRef, useEffect } from 'react';
import roomStore from '../Store/Room.store';
import VikingStore from '../Store/Viking.store';
import RoomUtil from '../Util/Room.Util';
import _ from 'lodash';

function RoomComponent({ roomNumber, isRoomRotating, setIsRoomRotating }) {
  const roomRef = useRef()
  const [roomNumberString, setRoomNumberString] = useState();
  const roomsData = roomStore((state) => state.rooms);
  const roomData = roomStore((state) => state.rooms[roomNumber[0]][roomNumber[1]]);
  const assignRoom = roomStore((state) => state.assignRoom);
  const vikingPosition = VikingStore((state) => state.position);
  const setVikingOffset = VikingStore((state) => state.setOffset);
  const setIsMoveDone = VikingStore((state) => state.setIsMoveDone);
  const previousPosition = VikingStore((state) => state.previousPosition);
  const comeFromPath = VikingStore((state) => state.comeFromPath);

  const [adjacentRoomsData, setAdjacentRoomsData] = useState({
    top: null,
    right: null,
    bottom: null,
    left: null,
  });
  const [isEntranceRoom, setIsEntranceRoom] = useState(false);
  const [roomStatus, setRoomStatus] = useState('');
  const [isReadyToExplore, setIsReadyToExplore] = useState(false);
  const [confirmButtonState, setConfirmButtonState] = useState();
  const [isFoundGoblin, setIsFoundGoblin] = useState(false);
  const [isTreasureRoom, setIsTreasureRoom] = useState(false);
  const [isTrapRoom, setIsTrapRoom] = useState(false);
  const [isOperatingRoom, setIsOperatingRoom] = useState(false);

  const RevealMethodENUM = {
    VISION: 'byVision',
    HERO_MOVE: 'byHeroMove'
  }

  useEffect(() => {
    if (roomNumber) {
      setRoomNumberString(`${roomNumber[0]}-${roomNumber[1]}`);
    }
  }, [roomNumber]);

  useEffect(() => {
    setAdjacentRoomsData({
      top: roomNumber[0] > 0 ? roomsData[roomNumber[0] - 1][roomNumber[1]] : null,
      right: roomNumber[1] + 1 <= 6 ? roomsData[roomNumber[0]][roomNumber[1] + 1] : null,
      bottom: roomNumber[0] + 1 <= 6 ? roomsData[roomNumber[0] + 1][roomNumber[1]] : null,
      left: roomNumber[1] > 0 ? roomsData[roomNumber[0]][roomNumber[1] - 1] : null
    })
  }, [roomsData]);

  useEffect(() => {
    if (roomData.id === 0) setIsEntranceRoom(true);
    if (roomData.foundGoblin) setIsFoundGoblin(true);
    if (roomData.isTrapRoom) setIsTrapRoom(true);
    if (roomData.isTreasureRoom) setIsTreasureRoom(true);
    checkConfirmButtonState();
    console.log(roomData);
  }, [roomData]);

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

  useEffect(() => {
    checkExploreStatusButton();
  }, [adjacentRoomsData])

  const selectBlankRoom = (revealMethod) => {
    const randomRoom = RoomUtil.getRandomRoom();
    randomRoom.revealMethod = revealMethod;
    assignRoom(roomNumber[0], roomNumber[1], randomRoom);
    setRoomStatus('prompt-rotate');
    setIsRoomRotating(true)
    setIsOperatingRoom(true);
    checkExploreStatusButton();
  };

  const isCurrentRoom = () => {
    return _.isEqual(vikingPosition, roomNumber);
  }

  useEffect(() => {
    if (isCurrentRoom()) {
      setVikingOffset(roomRef.current.offsetTop, roomRef.current.offsetLeft)
      if (isReadyToExplore && !roomData.id && !isEntranceRoom) {
        selectBlankRoom(RevealMethodENUM.HERO_MOVE);
      } else { setIsMoveDone(); }
    }
    checkExploreStatusButton();
  }, [vikingPosition])

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
    if (roomData?.revealMethod === RevealMethodENUM.HERO_MOVE) {
      if (
        (comeFromPath === 'up' && roomData?.exist?.top) ||
        (comeFromPath === 'right' && roomData?.exist?.right) ||
        (comeFromPath === 'bottom' && roomData?.exist?.bottom) ||
        (comeFromPath === 'left' && roomData?.exist?.left)
      ) { confirmButtonState = true }
    }

    if (roomData?.revealMethod === RevealMethodENUM.VISION) {
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
    }
    setConfirmButtonState(confirmButtonState)
  }

  const confirmRoom = () => {
    setRoomStatus('revealed');
    setIsRoomRotating(false);
    setIsOperatingRoom(false);
    setIsMoveDone();
    checkExploreStatusButton();
  }

  const isShowPreviousPath = () => {
    return (previousPosition === roomNumberString) && isRoomRotating;
  }

  return (
    <div ref={roomRef}
      className={"grid-item" +
        ((!(roomStatus === 'revealed' || isRoomRotating || isEntranceRoom) && isReadyToExplore) ? " ready-to-explore" : "") +
        ((roomStatus === 'revealed' || isOperatingRoom) ? " revealed" : "") +
        (isRoomRotating && !isOperatingRoom && (previousPosition !== roomNumberString) ? ' room-is-rotating' : "")
      }
      id={`grid-item-${roomNumberString}`}
    >
      {(!(roomStatus === 'revealed' || isRoomRotating || isEntranceRoom) && isReadyToExplore) &&
        <button className='explore-button' onClick={() => { selectBlankRoom(RevealMethodENUM.VISION); }}></button>
      }
      {roomData?.exist?.top && <div className='path path-top'>
        {isShowPreviousPath() && comeFromPath === 'bottom' && <div className='direction' />}
      </div>}
      {roomData?.exist?.bottom && <div className='path path-bottom'>
        {isShowPreviousPath() && comeFromPath === 'up' && <div className='direction' />}
      </div>}
      {roomData?.exist?.left && <div className='path path-left'>
        {isShowPreviousPath() && comeFromPath === 'right' && <div className='direction' />}
      </div>}
      {roomData?.exist?.right && <div className='path path-right'>
        {isShowPreviousPath() && comeFromPath === 'left' && <div className='direction' />}
      </div>}
      {roomData.name && <div className='path middle'></div>}
      {isFoundGoblin && <span className='icon icon-goblin'></span>}
      {isTrapRoom && <span className='icon icon-trap'></span>}
      {isTreasureRoom && <span className={'icon icon-treasure' + (roomData.solved ? ' solved':'')}></span>}
      {roomStatus === 'prompt-rotate' &&
        <div className='button-container'>
          <button className='rotate-button' onClick={() => rotateRoomExist()}></button>
          <button className='confirm-rotate-button' disabled={!confirmButtonState} onClick={() => { confirmRoom() }}></button>
          <span>{!confirmButtonState}</span>
        </div>
      }
    </div>
  )
}

export default RoomComponent;