import React, { useState, useEffect } from 'react';
import VikingStore from '../Store/Viking.store';
import roomStore from '../Store/Room.store';
import treasureUtil from '../Util/Treasure.Util';

function ControllerComponent() {
    const [upButtonState, setUpButtonState] = useState(true);
    const [rightButtonState, setRightButtonState] = useState(true);
    const [bottomButtonState, setBottomButtonState] = useState(true);
    const [leftButtonState, setLeftButtonState] = useState(true);

    const roomsData = roomStore((state) => state.rooms);
    const solveRoomStatus = roomStore((state) => state.solveRoomStatus);
    const moveVikingUp = VikingStore((state) => state.moveUp);
    const moveVikingRight = VikingStore((state) => state.moveRight);
    const moveVikingBottom = VikingStore((state) => state.moveBottom);
    const moveVikingLeft = VikingStore((state) => state.moveLeft);
    const vikingPosition = VikingStore((state) => state.position);
    const isMoveDone = VikingStore((state) => state.isMoveDone);
    const setIsMoving = VikingStore((state) => state.setIsMoving);
    const setPreviousPosition = VikingStore((state) => state.setPreviousPosition);
    const setComeFromPath = VikingStore((state) => state.setComeFromPath);
    const takeAction = VikingStore((state) => state.useAction);
    const updateWeapon = VikingStore((state) => state.updateWeapon);
    const updateRune = VikingStore((state) => state.updateRune);
    const vikingWeapon = VikingStore((state) => state.weapon);
    const vikingRunes = VikingStore((state) => state.rune);

    useEffect(() => {
        const currentRoom = roomsData[vikingPosition[0]][vikingPosition[1]]
        const adjacentRoomsData = {
            top: vikingPosition[0] > 0 ? roomsData[vikingPosition[0] - 1][vikingPosition[1]] : null,
            right: vikingPosition[1] + 1 <= 6 ? roomsData[vikingPosition[0]][vikingPosition[1] + 1] : null,
            bottom: vikingPosition[0] + 1 <= 6 ? roomsData[vikingPosition[0] + 1][vikingPosition[1]] : null,
            left: vikingPosition[1] > 0 ? roomsData[vikingPosition[0]][vikingPosition[1] - 1] : null
        }
        setUpButtonState(vikingPosition[0] > 0 && currentRoom?.exist?.top && (!adjacentRoomsData?.top?.id || adjacentRoomsData?.top?.exist?.bottom))
        setRightButtonState(vikingPosition[1] + 1 <= 6 && currentRoom?.exist?.right && (!adjacentRoomsData?.right?.id || adjacentRoomsData?.right?.exist?.left))
        setBottomButtonState(vikingPosition[0] + 1 <= 6 && currentRoom?.exist?.bottom && (!adjacentRoomsData?.bottom?.id || adjacentRoomsData?.bottom?.exist?.top))
        setLeftButtonState(vikingPosition[1] > 0 && currentRoom?.exist?.left && (!adjacentRoomsData?.left?.id || adjacentRoomsData?.left?.exist?.right))

        console.log(isMoveDone, currentRoom.isTreasureRoom, !currentRoom.solved);
        console.log(isMoveDone && currentRoom.isTreasureRoom && !currentRoom.solved);
        if (isMoveDone && currentRoom.isTreasureRoom && !currentRoom.solved) {
            addRandomItemToHero();
        }
    }, [isMoveDone]);

    const addRandomItemToHero = () => {
        const itemFromTreasure = treasureUtil.getRandomTreasure();
        if (itemFromTreasure.type === 'weapon') {
            const _heroWeapons = vikingWeapon;
            _heroWeapons.push(itemFromTreasure);
            updateWeapon(_heroWeapons);
        } else if (itemFromTreasure.type === 'rune') {
            const _heroRunes = vikingRunes;
            _heroRunes.push(itemFromTreasure);
            updateRune(_heroRunes);
        }

        solveRoomStatus(vikingPosition[0], vikingPosition[1]);
    }

    const getRoomNumberString = (roomNumberArray) => {
        return `${roomNumberArray[0]}-${roomNumberArray[1]}`
    }

    const moveUp = () => {
        setComeFromPath('bottom');
        takeAction();
        setPreviousPosition(getRoomNumberString(vikingPosition));
        setIsMoving();
        moveVikingUp();
    }
    const moveRight = () => {
        setComeFromPath('left');
        takeAction();
        setPreviousPosition(getRoomNumberString(vikingPosition));
        setIsMoving();
        moveVikingRight();
    }
    const moveBottom = () => {
        setComeFromPath('up');
        takeAction();
        setPreviousPosition(getRoomNumberString(vikingPosition));
        setIsMoving();
        moveVikingBottom();
    }
    const moveLeft = () => {
        setComeFromPath('right');
        takeAction();
        setPreviousPosition(getRoomNumberString(vikingPosition));
        setIsMoving();
        moveVikingLeft();
    }

    return (
        <div className='controller-container'>
            <button className='up' disabled={!upButtonState} onClick={() => { moveUp() }}></button>
            <button className='right' disabled={!rightButtonState} onClick={() => { moveRight() }}></button>
            <button className='bottom' disabled={!bottomButtonState} onClick={() => { moveBottom() }}></button>
            <button className='left' disabled={!leftButtonState} onClick={() => { moveLeft() }}></button>
        </div >
    )
}

export default ControllerComponent;