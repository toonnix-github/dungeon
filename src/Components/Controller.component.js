import React, { useState, useEffect } from 'react';
import VikingStore from '../Store/Viking.store';
import roomStore from '../Store/Room.store';

function ControllerComponent({ }) {
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

    useEffect(() => {
        console.log(isMoveDone);
        const currentRoom = roomsData[vikingPosition[0]][vikingPosition[1]]
        setUpButtonState(currentRoom?.exist?.top)
        setRightButtonState(currentRoom?.exist?.right)
        setBottomButtonState(currentRoom?.exist?.bottom)
        setLeftButtonState(currentRoom?.exist?.left)
    }, [isMoveDone]);

    return (
        <div className='controller-container'>
            <button disabled={!upButtonState} onClick={() => { setIsMoving(); moveVikingUp(); }}>Up</button>
            <button disabled={!rightButtonState} onClick={() => { setIsMoving(); moveVikingRight(); }}>Right</button>
            <button disabled={!bottomButtonState} onClick={() => { setIsMoving(); moveVikingBottom(); }}>Bottom</button>
            <button disabled={!leftButtonState} onClick={() => { setIsMoving(); moveVikingLeft(); }}>Left</button>
        </div >
    )
}

export default ControllerComponent;