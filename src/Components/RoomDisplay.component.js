import roomStore from '../Store/Room.store';
import VikingStore from '../Store/Viking.store';
import './RoomDisplay.scss';

function RoomDisplayComponent() {
    const vikingPosition = VikingStore((state) => state.position);
    const roomData = roomStore((state) => state.rooms[vikingPosition[0]][vikingPosition[1]]);

    return (
        <div className='room-display-container'>
            <span className='room-title'>{roomData?.name}</span>
            <hr className='half' />
            <div>
                {roomData.isTrapRoom && '!! Disarm a trap in this room !!'}
                {roomData.isTreasureRoom && '!! Search for the treasure !!'}
            </div>
            <div className='requirement-container'>
                {(roomData.isTrapRoom || roomData.isTreasureRoom) &&
                    <>
                        <span>{roomData.requireAmount}</span><i className={`power-icon ${roomData.requirePower}-icon`} />
                    </>
                }
            </div>
        </div>
    )
}

export default RoomDisplayComponent;