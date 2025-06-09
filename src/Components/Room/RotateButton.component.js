import React from 'react';
import PropTypes from 'prop-types';

const RotateButtons = ({ confirmButtonState, rotateRoomExit, confirmRoom }) => (
    <div className='button-container'>
        <button className='rotate-button' onClick={rotateRoomExit}></button>
        <button className='confirm-rotate-button' disabled={!confirmButtonState} onClick={confirmRoom}></button>
    </div>
);

RotateButtons.propTypes = {
    confirmButtonState: PropTypes.bool.isRequired,
    rotateRoomExit: PropTypes.func.isRequired,
    confirmRoom: PropTypes.func.isRequired,
};

export default RotateButtons;
