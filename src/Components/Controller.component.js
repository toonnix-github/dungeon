import React, { useState, useEffect } from 'react';
import VikingStore from '../Store/Viking.store';
import roomStore from '../Store/Room.store';

function ControllerComponent() {
    const [upButtonState, setUpButtonState] = useState(true);
    const [rightButtonState, setRightButtonState] = useState(true);
    const [bottomButtonState, setBottomButtonState] = useState(true);
    const [leftButtonState, setLeftButtonState] = useState(true);

    const roomsData = roomStore((state) => state.rooms);
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
    const takeMove = VikingStore((state) => state.useMove);

    useEffect(() => {
        const currentRoom = roomsData[vikingPosition[0]][vikingPosition[1]]
        const adjacentRoomsData = {
            top: vikingPosition[0] > 0 ? roomsData[vikingPosition[0] - 1][vikingPosition[1]] : null,
            right: vikingPosition[1] + 1 <= 6 ? roomsData[vikingPosition[0]][vikingPosition[1] + 1] : null,
            bottom: vikingPosition[0] + 1 <= 6 ? roomsData[vikingPosition[0] + 1][vikingPosition[1]] : null,
            left: vikingPosition[1] > 0 ? roomsData[vikingPosition[0]][vikingPosition[1] - 1] : null
        }
        setUpButtonState(vikingPosition[0] > 0 && currentRoom?.exit?.top && (!adjacentRoomsData?.top?.id || adjacentRoomsData?.top?.exit?.bottom))
        setRightButtonState(vikingPosition[1] + 1 <= 6 && currentRoom?.exit?.right && (!adjacentRoomsData?.right?.id || adjacentRoomsData?.right?.exit?.left))
        setBottomButtonState(vikingPosition[0] + 1 <= 6 && currentRoom?.exit?.bottom && (!adjacentRoomsData?.bottom?.id || adjacentRoomsData?.bottom?.exit?.top))
        setLeftButtonState(vikingPosition[1] > 0 && currentRoom?.exit?.left && (!adjacentRoomsData?.left?.id || adjacentRoomsData?.left?.exit?.right))
    }, [isMoveDone]);

    const getRoomNumberString = (roomNumberArray) => {
        return `${roomNumberArray[0]}-${roomNumberArray[1]}`
    }

    const moveUp = () => {
        setComeFromPath('bottom');
        takeMove();
        setPreviousPosition(getRoomNumberString(vikingPosition));
        setIsMoving();
        moveVikingUp();
    }
    const moveRight = () => {
        setComeFromPath('left');
        takeMove();
        setPreviousPosition(getRoomNumberString(vikingPosition));
        setIsMoving();
        moveVikingRight();
    }
    const moveBottom = () => {
        setComeFromPath('top');
        takeMove();
        setPreviousPosition(getRoomNumberString(vikingPosition));
        setIsMoving();
        moveVikingBottom();
    }
    const moveLeft = () => {
        setComeFromPath('right');
        takeMove();
        setPreviousPosition(getRoomNumberString(vikingPosition));
        setIsMoving();
        moveVikingLeft();
    }

    return (
        <div className='controller-container'>
            <button className='top' disabled={!upButtonState} onClick={() => { moveUp() }}></button>
            <button className='right' disabled={!rightButtonState} onClick={() => { moveRight() }}></button>
            <button className='bottom' disabled={!bottomButtonState} onClick={() => { moveBottom() }}></button>
            <button className='left' disabled={!leftButtonState} onClick={() => { moveLeft() }}></button>
        </div >
    )
}

export default ControllerComponent;