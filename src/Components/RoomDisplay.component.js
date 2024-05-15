import roomStore from '../Store/Room.store';
import VikingStore from '../Store/Viking.store';
import './RoomDisplay.scss';

function RoomDisplayComponent({ diceScore }) {
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
            {(roomData.isTrapRoom || roomData.isTreasureRoom) &&
                <div className={'challenge-container ' + (diceScore >= roomData.requireAmount ? `win` : `lose`)}>
                    <div className='requirement-container'>
                        <>
                            <span>{roomData.requireAmount}</span><i className={`power-icon key-icon`} />
                        </>
                    </div>
                    <div className={`challenge-result ` + (diceScore >= roomData.requireAmount ? `win` : `lose`)} />
                    <div className='requirement-container'>
                        <>
                            <span>{diceScore}</span><i className={`power-icon ${roomData.requirePower}-icon`} />
                        </>
                    </div>
                </div>
            }
        </div>
    );
}

export default RoomDisplayComponent;