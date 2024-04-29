import { useState } from "react";
import roomStore from "../Store/Room.store";
import VikingStore from "../Store/Viking.store";
import treasureUtil from '../Util/Treasure.Util';
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
                <button onClick={() => { getRandomItemAndOpenPopup(); }} className="open-chest-action"></button>
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
    const updateRune = VikingStore((state) => state.updateRune);
    const vikingWeapon = VikingStore((state) => state.weapon);
    const vikingRunes = VikingStore((state) => state.rune);

    const solveRoomStatus = roomStore((state) => state.solveRoomStatus);

    const confimrDecision = () => {
        setIsShowWeaponPopup(false);
        // solveRoomStatus(vikingPosition[0], vikingPosition[1]);
    }

    return (
        <div className="modal-overlay">
            <div className="modal card-modal">
                <div className="card-container">
                    {vikingWeapon.map((weaponDetail) => (
                        <ItemCard itemDetail={weaponDetail} />
                    ))}
                    {vikingWeapon.length === 1 && <div></div>}
                    <div className="separator"></div>
                    <ItemCard itemDetail={newFoundWeapon} />
                    <i className="new-icon"></i>
                </div>

                <button className="confirm-button" onClick={() => confimrDecision()}>Confirm</button>
            </div>
        </div>
    )
}

function ItemCard({ itemDetail }) {
    return (
        <div className="item-card">
            <div className="item-name">{itemDetail.name}</div>
            <div className={`item-image ${itemDetail.id}`}></div>
            <div className="item-type">{itemDetail.type}</div>
            <div className="item-description">
                {itemDetail.description}
                <div className="attack-value"><i className="attack-icon"></i>{itemDetail.attack}</div>
                <div className="defend-value"><i className="defend-icon"></i>{itemDetail.defend}</div>
            </div>
        </div>
    )
}

export default HeroActionComponent;