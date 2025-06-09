import React from 'react';
import PropTypes from 'prop-types';
import { oppositeDirection } from '../../Util/Room.Util';

const RoomPaths = ({ roomData, comeFromPath, isShowPreviousPath }) => {
    const paths = ['top', 'bottom', 'left', 'right'];
    return paths.map(direction => (
        roomData?.exit?.[direction] && (
            <div key={direction} className={`path path-${direction}`}>
                {isShowPreviousPath() && comeFromPath === oppositeDirection(direction) && <div className='direction' />}
            </div>
        )
    ));
};

RoomPaths.propTypes = {
    roomData: PropTypes.object.isRequired,
    comeFromPath: PropTypes.string,
    isShowPreviousPath: PropTypes.func.isRequired,
};

RoomPaths.defaultProps = {
    comeFromPath: '',
};

export default RoomPaths;
