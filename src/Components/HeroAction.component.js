import { useEffect, useState } from "react";
import roomStore from "../Store/Room.store";
import VikingStore from "../Store/Viking.store";
import treasureUtil from '../Util/Treasure.Util';
import _ from 'lodash';
import "./HeroAction.scss";
import './ItemPopup.scss';

function HeroActionComponent() {
    const vikingPosition = VikingStore((state) => state.position);
    const takeAction = VikingStore((state) => state.useAction);

    const roomData = roomStore((state) => state.rooms[vikingPosition[0]][vikingPosition[1]]);

    const [isShowWeaponPopup, setIsShowWeaponPopup] = useState(false);
    const [newFoundItem, setNewFoundItem] = useState();

    const getRandomItemAndOpenPopup = () => {
        takeAction();
        const itemFromTreasure = treasureUtil.getRandomTreasure();
        setNewFoundItem(itemFromTreasure);
        if (itemFromTreasure.type === 'weapon') {
            setIsShowWeaponPopup(true);
            // _heroWeapons.push(itemFromTreasure);
            // updateWeapon(_heroWeapons);
        } else if (itemFromTreasure.type === 'rune') {
            // _heroRunes.push(itemFromTreasure);
            // updateRune(_heroRunes);
        }
    }

    return (
        <div className="action-container">
            {(roomData.isTreasureRoom && !roomData.solved) &&
                <button onClick={() => { getRandomItemAndOpenPopup(); }} className="open-chest-action action-button"></button>
            }
            {/* <button className="disarm-trap-action"></button>
            <button className="attack-action"></button>
            <button className="magic-action"></button> */}
            {isShowWeaponPopup &&
                <WeaponPopup
                    newFoundWeapon={newFoundItem}
                    setIsShowWeaponPopup={setIsShowWeaponPopup}
                />
            }
        </div>
    )
}

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

function ItemCard({ itemDetail, setRemoveIndex, removeIndex, weaponIndex, needToDiscard }) {

    const discardThisWeapon = () => {
        setRemoveIndex(weaponIndex);
    }

    return (
        <>
            <div className={`item-card` + (removeIndex === weaponIndex ? ' discard' : '')}>
                <div className="item-name">{itemDetail.name}</div>
                <div className={`item-image ${itemDetail.id}`}></div>
                <div className="item-type">{itemDetail.type}</div>
                <div className="item-description">
                    {itemDetail.description}
                    <div className="attack-value"><i className="attack-icon"></i>{itemDetail.attack}</div>
                    <div className="defend-value"><i className="defend-icon"></i>{itemDetail.defend}</div>
                </div>
                {((removeIndex !== weaponIndex) && needToDiscard) && <button onClick={discardThisWeapon} className="discard-button">discard</button>}
            </div>
            {(removeIndex === weaponIndex) && <div className="discard-mark"></div>}
        </>

    )
}

export default HeroActionComponent;