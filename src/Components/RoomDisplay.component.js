import roomStore from '../Store/Room.store';
import VikingStore from '../Store/Viking.store';

function RoomDisplayComponent() {
    const vikingPosition = VikingStore((state) => state.position);
    const roomData = roomStore((state) => state.rooms[vikingPosition[0]][vikingPosition[1]]);

    return (
        <div>
            <p>room name: {roomData?.name}</p>
            <p>room type:
                {roomData.isTrapRoom && ' Trap Room'}
                {roomData.isTreasureRoom && ' Treasure Room'}
            </p>
            <div>
                {roomData.isTrapRoom && ` Criteria to solve Trap: `}
                {roomData.isTreasureRoom && `Criteria to open Treasure Chest: `}
                {roomData.requirement &&
                    Object.keys(roomData.requirement).map((oneKey, i) => {
                        return (
                            <div key={`${roomData.name}-${i}`}>{oneKey}: {roomData.requirement[oneKey]}</div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default RoomDisplayComponent;