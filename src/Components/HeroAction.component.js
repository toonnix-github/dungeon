import { useEffect, useState } from "react";
import _ from "lodash";
import roomStore from "../Store/Room.store";
import VikingStore from "../Store/Viking.store";
import treasureUtil from '../Util/Treasure.Util';
import WeaponPopup from './WeaponPopup.component';
import "./HeroAction.scss";
import './ItemPopup.scss';
import DiceStore from "../Store/Dice.store";
import DiceUtil from "../Util/Dice.Util";
import RoomDisplayComponent from "./RoomDisplay.component";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function HeroActionComponent() {
    const vikingPosition = VikingStore((state) => state.position);
    const takeAction = VikingStore((state) => state.useAction);
    const takeMove = VikingStore((state) => state.useMove);
    const heroDicePower = VikingStore((state) => state.dicePower);

    const roomData = roomStore((state) => state.rooms[vikingPosition[0]][vikingPosition[1]]);

    const isShowDicePopup = DiceStore((state) => state.isShowPopup);
    const showDicePopup = DiceStore((state) => state.showPopup);
    const closeDicePopup = DiceStore((state) => state.closePopup);
    const selectMainDice = DiceStore((state) => state.selectMainDice);
    const select1stAddition = DiceStore((state) => state.select1stAddition);
    const select2ndAddition = DiceStore((state) => state.select2ndAddition);
    const diceScore = DiceStore((state) => state.diceScore);
    const resetDiceScore = DiceStore((state) => state.resetDiceScore);
    const totalDiceScore = DiceStore((state) => state.diceScore.main + state.diceScore.add1 + state.diceScore.add2);

    const [isShowWeaponPopup, setIsShowWeaponPopup] = useState(false);
    const [newFoundItem, setNewFoundItem] = useState();
    const [dicePower, setDicePower] = useState(0);
    const [rollResult, setRollResult] = useState([]);

    useEffect(() => {
        if (isShowDicePopup) {
            setDicePower(heroDicePower[roomData.requirePower]);
        }
    }, [isShowDicePopup]);

    useEffect(() => {
        console.log(rollResult);
        console.log(totalDiceScore);
    }, [rollResult]);

    const rollTheDice = () => {
        let diceResult = [];
        for (let index = 0; index < dicePower; index++) {
            diceResult.push(DiceUtil.rollDice());
        }
        setRollResult(diceResult);
    };

    const selectDice = (diceOrder, score) => {
        console.log(diceScore);
        console.log(rollResult[diceOrder]);
        rollResult[diceOrder].selected = true;
        if (diceScore.main === 0) {
            selectMainDice(score);
        } else if (diceScore.add1 === 0) {
            select1stAddition(score);
        } else if (diceScore.add2 === 0) {
            select2ndAddition(score);
        }
    };

    const resetDiceResult = () => {
        resetDiceScore();
        setRollResult([]);
        console.log(rollResult);
    };

    const getRandomItemAndOpenPopup = () => {
        // takeAction();
        showDicePopup();
        // const itemFromTreasure = treasureUtil.getRandomTreasure();
        // setNewFoundItem(itemFromTreasure);
        // if (itemFromTreasure.type === 'weapon') {
        //     setIsShowWeaponPopup(true);
        //     // _heroWeapons.push(itemFromTreasure);
        //     // updateWeapon(_heroWeapons);
        // } else if (itemFromTreasure.type === 'rune') {
        //     // _heroRunes.push(itemFromTreasure);
        //     // updateRune(_heroRunes);
        // }
    };

    return (
        <>
            <Modal centered dialogClassName={
                `dice-action-container` +
                (roomData.isTreasureRoom && ' treasure-popup')
            } show={isShowDicePopup}>
                <div />
                <div className="action-panel">
                    <RoomDisplayComponent diceScore={totalDiceScore} />
                    <hr />
                    <div className={`dice-container ${roomData.requirePower}-dice`}>
                        {dicePower - 1 >= 0 ? <DiceItem diceNumber={1} diceFace={rollResult[0]} /> : <div className="dice-frame"></div>}
                        {dicePower - 2 >= 0 ? <DiceItem diceNumber={2} diceFace={rollResult[1]} /> : <div className="dice-frame"></div>}
                        {dicePower - 3 >= 0 ? <DiceItem diceNumber={3} diceFace={rollResult[2]} /> : <div className="dice-frame"></div>}
                    </div>
                    {rollResult.length > 0 &&
                        <div className={`dice-container action-dice`}>
                            <DiceActionButton diceOrder={0} dice={rollResult[0]} selectDice={selectDice} totalDiceScore={totalDiceScore} />
                            <DiceActionButton diceOrder={1} dice={rollResult[1]} selectDice={selectDice} totalDiceScore={totalDiceScore} />
                            <DiceActionButton diceOrder={2} dice={rollResult[2]} selectDice={selectDice} totalDiceScore={totalDiceScore} />
                        </div>
                    }
                    {rollResult.length === 0 &&
                        <>
                            <hr />
                            <Button
                                className="roll-button"
                                onClick={() => { rollTheDice(); takeAction(); }}>
                                Let's roll (<div className={'action-token active in-message'} />)
                            </Button>
                        </>
                    }
                    <hr />
                    <Button variant="danger" className="close-button" onClick={() => { closeDicePopup(); resetDiceResult(); }}>Close</Button>
                </div>
            </Modal >

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

    );
}

const DiceItem = ({ diceNumber, diceFace }) => {
    useEffect(() => {
        console.log(diceFace);
    }, [diceFace]);

    return (
        <>
            {diceFace ?
                <div className="dice-face">
                    <span className="dice-number">{diceFace.string}</span>
                    <span>
                        <span>{JSON.stringify(diceFace.selected)}</span>
                        {diceFace.effect === 'action' &&
                            _.times(diceFace.effectPoint, (index) => <div key={`number_${diceNumber}_get${diceFace.number}point_effect_${diceFace.effectPoint}_index_${index}`} className={'action-token active'} />)
                        }
                        {diceFace.effect === 'health' && <div className={'health-token'} />}
                    </span>
                </div> :
                <div className="dice-item"></div>
            }
        </>
    );
};

const DiceActionButton = ({ diceOrder, dice, totalDiceScore, selectDice }) => {
    useEffect(() => {
        console.log(dice);
    }, [dice]);

    return (
        <>
            {
                (!_.isUndefined(dice) && !dice.selected && dice.type !== 'add') &&
                < Button onClick={() => { selectDice(diceOrder, dice.number); }} size="sm">
                    {totalDiceScore === 0 && 'Main'}
                    {(totalDiceScore > 0 && dice.type === 'add') && 'Add'}
                </Button >
            }
        </>
    );
};

export default HeroActionComponent;