import React, { useState, useRef, useEffect, useMemo } from 'react';
import roomStore from '../Store/Room.store';
import VikingStore from '../Store/Viking.store';

function RoomDisplayComponent({ }) {
    const vikingPosition = VikingStore((state) => state.position);
    const roomData = roomStore((state) => state.rooms[vikingPosition[0]][vikingPosition[1]]);

    const writeCriteria = (criteria) => {
        for (const [key, value] of criteria.entries(test)) {
            console.log(key, value);
        }
    }

    return (
        <div>
            <p>room name: {roomData?.name}</p>
            <p>room type:
                {roomData.isTrapRoom && ' Trap Room'}
                {roomData.isTreasureRoom && ' Treasure Room'}
            </p>
            <p>
                {roomData.isTrapRoom && ` Criteria to solve Trap: `}
                {roomData.isTreasureRoom && `Criteria to open Treasure Chest: `}
            </p>
        </div>
    )
}

export default RoomDisplayComponent;