import React from 'react';

const RotateButtons = ({ confirmButtonState, rotateRoomExit, confirmRoom }) => (
    <div className='button-container'>
        <button
            className='rotate-button'
            aria-label='Rotate room'
            onClick={rotateRoomExit}
        ></button>
        <button
            className='confirm-rotate-button'
            aria-label='Confirm rotation'
            disabled={!confirmButtonState}
            onClick={confirmRoom}
        ></button>
    </div>
);

export default RotateButtons;

