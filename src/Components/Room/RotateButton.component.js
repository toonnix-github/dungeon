import React from 'react';

const RotateButtons = ({ confirmButtonState, rotateRoomExit, confirmRoom }) => (
    <div className='button-container'>
        <button className='rotate-button' onClick={rotateRoomExit}></button>
        <button className='confirm-rotate-button' disabled={!confirmButtonState} onClick={confirmRoom}></button>
    </div>
);

export default RotateButtons;

