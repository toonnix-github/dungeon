import React from 'react';
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

export default RoomPaths;
