import React, { useState, useEffect } from 'react';

function ControllerComponent({ vikingPosition, setVikingPosition, roomData, isPromptState, currentRoom, setCurrentRoom }) {
    const [currentPosition, setCurrentPosition] = useState();
    const [upButtonState, setUpButtonState] = useState(true);
    const [rightButtonState, setRightButtonState] = useState(true);
    const [bottomButtonState, setBottomButtonState] = useState(true);
    const [leftButtonState, setLeftButtonState] = useState(true);

    useEffect(() => {
        setCurrentPosition(vikingPosition.split('-'));
        if (currentPosition) setCurrentRoom(roomData[currentPosition[0]][currentPosition[1]]);
    }, [vikingPosition]);

    useEffect(() => {
        if (currentRoom?.exist && currentPosition) {
            setUpButtonState(currentRoom?.exist?.top && currentPosition[0] > 0);
            setRightButtonState(currentRoom?.exist?.right && currentPosition[1] < 6);
            setBottomButtonState(currentRoom?.exist?.bottom && currentPosition[0] < 6);
            setLeftButtonState(currentRoom?.exist?.left && currentPosition[1] > 0);
        }
    }, [currentRoom, isPromptState]);

    const moveViking = (direction) => {
        let newVikingPosition = '';
        switch (direction) {
            case 'up':
                newVikingPosition = `${--currentPosition[0]}-${currentPosition[1]}`
                break;
            case 'right':
                newVikingPosition = `${currentPosition[0]}-${++currentPosition[1]}`
                break;
            case 'bottom':
                newVikingPosition = `${++currentPosition[0]}-${currentPosition[1]}`
                break;
            case 'left':
                newVikingPosition = `${currentPosition[0]}-${--currentPosition[1]}`
                break;

            default:
                break;
        }
        setVikingPosition(newVikingPosition);
    }
    return (
        <div className='controller-container'>
            <button disabled={!upButtonState} onClick={() => moveViking('up')}>Up</button>
            <button disabled={!rightButtonState} onClick={() => moveViking('right')}>Right</button>
            <button disabled={!bottomButtonState} onClick={() => moveViking('bottom')}>Bottom</button>
            <button disabled={!leftButtonState} onClick={() => moveViking('left')}>Left</button>
        </div>
    )
}

export default ControllerComponent;