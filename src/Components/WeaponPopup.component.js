import ItemCard from './ItemCard.component';
import VikingStore from '../Store/Viking.store';
import roomStore from './../Store/Room.store';
import { useState } from 'react';
import _ from 'lodash';

function WeaponPopup({ newFoundWeapon, setIsShowWeaponPopup }) {
    const vikingPosition = VikingStore((state) => state.position);
    const updateWeapon = VikingStore((state) => state.updateWeapon);
    const vikingWeapon = VikingStore((state) => state.weapon);
    const solveRoomStatus = roomStore((state) => state.solveRoomStatus);

    const [removeIndex, setRemoveIndex] = useState(null);

    const confimrDecision = (removeIndex) => {
        let weaponInHands = [...vikingWeapon, newFoundWeapon];
        weaponInHands.splice(removeIndex, 1);
        updateWeapon(weaponInHands);
        setRemoveIndex(null);
        setIsShowWeaponPopup(false);
        solveRoomStatus(vikingPosition[0], vikingPosition[1]);
    }

    const getNewWeapon = () => {
        updateWeapon([...vikingWeapon, newFoundWeapon]);
        setIsShowWeaponPopup(false);
    }

    return (
        <div className="modal-overlay">
            <div className="modal card-modal">
                {vikingWeapon.length === 1 ?
                    <>
                        <div className="popup-title">You got a new WEAPON!!</div>
                        <div className="card-container new-card-container">
                            <i></i>
                            <ItemCard weaponIndex={null} itemDetail={newFoundWeapon} />
                            <i></i>
                        </div>
                        <div className="popup-button">
                            <button className="confirm-button" onClick={() => getNewWeapon()}>
                                THX! I'll take it
                            </button>
                        </div>
                    </>
                    :
                    <>
                        <div className="popup-title">
                            You got a new WEAPON!!, BUT you have only 2 hands!
                        </div>
                        <div className="card-container">
                            {[...vikingWeapon, newFoundWeapon].map((weaponDetail, index) => (
                                <div className="relative-frame" key={index}>
                                    <ItemCard needToDiscard={true} weaponIndex={index} setRemoveIndex={setRemoveIndex} itemDetail={weaponDetail} removeIndex={removeIndex} />
                                    {index === 2 && <i className="new-icon"></i>}
                                </div>
                            ))}
                        </div>
                        {_.isNumber(removeIndex) &&
                            <div className="popup-button">
                                <button className="confirm-button" onClick={() => confimrDecision(removeIndex)}>Confirm</button>
                            </div>
                        }
                    </>
                }
            </div>
        </div>
    )
}

export default WeaponPopup;