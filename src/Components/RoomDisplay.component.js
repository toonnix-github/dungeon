import React, { useState, useRef, useEffect, useMemo } from 'react';

function RoomDisplayComponent({ currentRoom }) {
    useEffect(() => {
        console.log(currentRoom);
    }, [currentRoom])

    return (
        <div>
            room type: {currentRoom?.name}
        </div>
    )
}

export default RoomDisplayComponent;