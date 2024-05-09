import { useEffect, useState } from "react";
import roomStore from "../Store/Room.store";
import VikingStore from "../Store/Viking.store";
import treasureUtil from '../Util/Treasure.Util';
import WeaponPopup from './WeaponPopup.component';
import "./HeroAction.scss";
import './ItemPopup.scss';

function HeroActionComponent() {
    const vikingPosition = VikingStore((state) => state.position);
    const takeAction = VikingStore((state) => state.useAction);
    const takeMove = VikingStore((state) => state.useMove);
    const heroDicePower = VikingStore((state) => state.dicePower);

    const roomData = roomStore((state) => state.rooms[vikingPosition[0]][vikingPosition[1]]);

    const [isShowWeaponPopup, setIsShowWeaponPopup] = useState(false);
    const [newFoundItem, setNewFoundItem] = useState();
    const [dicePower, setDicePower] = useState(0);

    const assignDicePower = (event) => {
        setDicePower(heroDicePower[event.target.value]);
    }

    useEffect(() => { console.log(dicePower); }, [dicePower])

    const getRandomItemAndOpenPopup = () => {
        takeMove();
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
        <>
            <div className="dice-action-container">
                <div className="dice-container">
                    {dicePower - 1 >= 0 ? <DiceItem /> : <div className="dice-frame"></div>}
                    {dicePower - 2 >= 0 ? <DiceItem /> : <div className="dice-frame"></div>}
                    {dicePower - 3 >= 0 ? <DiceItem /> : <div className="dice-frame"></div>}
                </div>
                <hr />
                <div>
                    <select onChange={assignDicePower} name="power" id="power">
                        <option value="">pick your power</option>
                        <option value="attack">Attack</option>
                        <option value="defend">Defend</option>
                        <option value="magic">Magic</option>
                        <option value="speed">Speed</option>
                    </select>
                    <button>roll</button>
                </div>
            </div>
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
        </>
    )
}

const DiceItem = () => {
    return (
        <div className="dice-item"></div>
    )
}

export default HeroActionComponent;