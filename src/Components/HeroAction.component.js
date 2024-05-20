import { useEffect, useState } from "react";
import _ from "lodash";
import roomStore from "../Store/Room.store";
import VikingStore from "../Store/Viking.store";
import treasureUtil from '../Util/Treasure.Util';
import LootPopup from './LootPopup.component';
import "./HeroAction.scss";
import './ItemPopup.scss';
import DiceStore from "../Store/Dice.store";
import DiceUtil from "../Util/Dice.Util";
import RoomDisplayComponent from "./RoomDisplay.component";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function HeroActionComponent() {
    const vikingPosition = VikingStore((state) => state.position);
    const vikingIsMoveDone = VikingStore((state) => state.isMoveDone);
    const vikingTakeDamage = VikingStore((state) => state.takeDamage);
    const takeAction = VikingStore((state) => state.useAction);
    const takeMove = VikingStore((state) => state.useMove);
    const heroDicePower = VikingStore((state) => state.dicePower);

    const roomData = roomStore((state) => state.rooms[vikingPosition[0]][vikingPosition[1]]);
    const roomsData = roomStore((state) => state.rooms);

    const isShowDicePopup = DiceStore((state) => state.isShowPopup);
    const showDicePopup = DiceStore((state) => state.showPopup);
    const closeDicePopup = DiceStore((state) => state.closePopup);
    const selectMainDice = DiceStore((state) => state.selectMainDice);
    const select1stAddition = DiceStore((state) => state.select1stAddition);
    const select2ndAddition = DiceStore((state) => state.select2ndAddition);
    const diceScore = DiceStore((state) => state.diceScore);
    const resetDiceScore = DiceStore((state) => state.resetDiceScore);
    const totalDiceScore = DiceStore((state) => state.diceScore.main + state.diceScore.add1 + state.diceScore.add2);

    const [isShowLootPopup, setIsShowLootPopup] = useState(false);
    const [newFoundItem, setNewFoundItem] = useState();
    const [dicePower, setDicePower] = useState(0);
    const [rollResult, setRollResult] = useState([]);
    const [effectHeroGet, setEffectHeroGet] = useState({ action: 0, health: 0 });

    useEffect(() => {
        if (isShowDicePopup) {
            setDicePower(heroDicePower[roomData.requirePower]);
        }
    }, [isShowDicePopup]);

    const checkEffectHeroGet = () => {
        let _effectHeroGet = { action: 0, health: 0 };
        rollResult.forEach(dice => {
            if (!dice.selected) {
                if (dice.effect === 'action') { _effectHeroGet.action = _effectHeroGet.action + dice.effectPoint; }
                if (dice.effect === 'health') { _effectHeroGet.health = _effectHeroGet.health + dice.effectPoint; }
            }
        });
        setEffectHeroGet(_effectHeroGet);
    };

    const rollTheDice = () => {
        let diceResult = [];
        for (let index = 0; index < dicePower; index++) {
            diceResult.push({ ...DiceUtil.rollDice() });
        }
        setRollResult(diceResult);
    };

    const selectDice = (diceOrder, score) => {
        rollResult[diceOrder].selected = true;
        if (diceScore.main === 0) {
            selectMainDice(score);
        } else if (diceScore.add1 === 0) {
            select1stAddition(score);
        } else if (diceScore.add2 === 0) {
            select2ndAddition(score);
        }
        checkEffectHeroGet();
    };

    const resetDiceResult = () => {
        resetDiceScore();
        setRollResult([]);
        checkEffectHeroGet();
    };

    const resetDiceSelect = () => {
        resetDiceScore();
        rollResult.forEach((dice) => {
            dice.selected = false;
        });
        checkEffectHeroGet();
    };

    const endDicePhase = () => {
        closeDicePopup();
        resetDiceResult();
        resetDiceSelect();
    };

    const getRandomItemAndOpenPopup = () => {
        endDicePhase();
        const itemFromTreasure = treasureUtil.getRandomTreasure();
        setNewFoundItem(itemFromTreasure);
        setIsShowLootPopup(true);
    };

    const getPunishment = () => {
        endDicePhase();
        vikingTakeDamage(roomData.punishment);
    };

    useEffect(() => {
        if (roomData.isTrapRoom && !roomData.solved) {
            showDicePopup();
        }
    }, [vikingIsMoveDone]);

    return (
        <>
            <Modal centered dialogClassName={`dice-action-container ${roomData.isTreasureRoom && ' treasure-popup'} ${roomData.isTrapRoom && ' trap-popup'}`}
                show={isShowDicePopup}>
                <div />
                <div className={`action-panel ${totalDiceScore < roomData.requireAmount ? 'failed' : ''}`}>
                    <RoomDisplayComponent diceScore={totalDiceScore} />
                    <hr />
                    <div className={`dice-container ${roomData.requirePower}-dice`}>
                        {dicePower - 1 >= 0 ? <DiceItem diceOrder={0} diceNumber={1} diceFace={rollResult[0]} selectDice={selectDice} totalDiceScore={totalDiceScore} /> : <div className="dice-frame"></div>}
                        {dicePower - 2 >= 0 ? <DiceItem diceOrder={1} diceNumber={2} diceFace={rollResult[1]} selectDice={selectDice} totalDiceScore={totalDiceScore} /> : <div className="dice-frame"></div>}
                        {dicePower - 3 >= 0 ? <DiceItem diceOrder={2} diceNumber={3} diceFace={rollResult[2]} selectDice={selectDice} totalDiceScore={totalDiceScore} /> : <div className="dice-frame"></div>}
                    </div>
                    {!_.isUndefined(rollResult) && rollResult.length > 0 &&
                        <div className={`dice-container action-dice`}>
                            <DiceActionButton diceOrder={0} dice={rollResult[0]} selectDice={selectDice} totalDiceScore={totalDiceScore} />
                            <DiceActionButton diceOrder={1} dice={rollResult[1]} selectDice={selectDice} totalDiceScore={totalDiceScore} />
                            <DiceActionButton diceOrder={2} dice={rollResult[2]} selectDice={selectDice} totalDiceScore={totalDiceScore} />
                        </div>
                    }
                    {rollResult.length > 0 && totalDiceScore > 0 &&
                        <div className="d-grid">
                            <Button variant="warning" onClick={resetDiceSelect} size='sm'>Reset</Button>
                        </div>
                    }
                    {rollResult.length === 0 &&
                        <>
                            <hr />
                            <Button
                                className="roll-button"
                                onClick={() => { rollTheDice(); roomData.isTreasureRoom && takeAction(); }}>
                                {roomData.isTreasureRoom && <>Let's roll (<div className={'action-token active in-message'} />)</>}
                                {roomData.isTrapRoom && `Disarm the trap`}
                            </Button>
                        </>
                    }
                    <hr />
                    <div className="d-grid">
                        {(rollResult.length === 0 && roomData.isTreasureRoom) && <Button variant="danger" className="close-button" onClick={() => { closeDicePopup(); resetDiceResult(); }}>Close</Button>}
                        {totalDiceScore > 0 &&
                            <>
                                <span>You got:
                                    {(_.times(effectHeroGet.action, (index) => <i key={index} className="action-token active in-message" />))}
                                    {(_.times(effectHeroGet.health, (index) => <i key={index} className="health-token in-message" />))}
                                    {(effectHeroGet.action === 0 && effectHeroGet.health === 0) && ' nothing'}
                                </span>
                                {totalDiceScore >= roomData.requireAmount
                                    ? <Button variant="success" size='sm' onClick={() => { getRandomItemAndOpenPopup(); }}>Success - Confirm</Button>
                                    : <Button variant="danger" size='sm' onClick={() => { getPunishment(); }}>Failed - Confirm</Button>}
                            </>
                        }
                    </div>
                </div>
            </Modal >

            <div className="action-container">
                {(roomData.isTreasureRoom && !roomData.solved) &&
                    <button onClick={() => { showDicePopup(); }} className="open-chest-action action-button"></button>
                }
                {
            /* <button className="attack-action"></button>
            <button className="magic-action"></button> */}
                {isShowLootPopup &&
                    <LootPopup
                        newFoundLoot={newFoundItem}
                        setIsShowLootPopup={setIsShowLootPopup}
                        isShowLootPopup={isShowLootPopup}
                    />
                }
            </div>
        </>

    );
}

const DiceItem = ({ diceOrder, diceFace, totalDiceScore, selectDice }) => {
    useEffect(() => {
    }, [diceFace]);

    return (
        <>
            {diceFace ?
                <div
                    className={"dice-face" +
                        ((totalDiceScore > 0 && !diceFace.selected && diceFace.type !== 'add') ? ' effect-only' : '') +
                        (diceFace.selected ? ' selected' : '') +
                        (diceFace.effect === 'none' ? ' no-effect' : '') +
                        (((totalDiceScore === 0) || (totalDiceScore > 0 && !diceFace.selected && diceFace.type === 'add')) ? ' addable' : '')
                    }
                    // if (!_.isUndefined(dice) && !dice.selected) {
                    //     if (totalDiceScore === 0) {

                    onClick={() => { ((totalDiceScore === 0) || (totalDiceScore > 0 && !diceFace.selected && diceFace.type === 'add')) && selectDice(diceOrder, diceFace.number) }}
                >
                    <span className="dice-number">{diceFace.string}</span>
                    <span className="effect-sign">
                        {diceFace.effect === 'action' &&
                            _.times(diceFace.effectPoint, (index) => <div key={`number_${diceOrder}_get${diceFace.number}point_effect_${diceFace.effectPoint}_index_${index}`} className={'action-token active'} />)
                        }
                        {diceFace.effect === 'health' && <div className={'health-token'} />}
                        {diceFace.effect === 'none' && <div className={"non-token"} />}
                    </span>
                    <i className={"dice-status"} />
                    <i className={"add-icon"} />
                </div> :
                <div className="dice-item"></div>
            }
        </>
    );
};

const DiceActionButton = ({ diceOrder, dice, totalDiceScore, selectDice }) => {
    if (!_.isUndefined(dice) && !dice.selected) {
        if (totalDiceScore === 0) {
            return <Button onClick={() => { selectDice(diceOrder, dice.number); }} size="sm">Main</Button>;
        } else if (dice.type === 'add') {
            return <Button onClick={() => { selectDice(diceOrder, dice.number); }} size="sm">Add</Button>;
        } else {
            return <div />;
        }
    } else {
        return <div />;
    }
};

export default HeroActionComponent;
