import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import GoblinStore from '../../Store/Goblin.store';
import _ from 'lodash';
import { Button } from 'react-bootstrap';
import { GoblinDetailComponent } from './GoblinDetail.component';
import VikingStore from '../../Store/Viking.store';
import { DiceItem } from '../DiceItem.component';
import DiceStore from '../../Store/Dice.store';
import DiceUtil from '../../Util/Dice.Util';
import './EncounterAnimation.scss';

export default GoblinEncounterComponent;

function GoblinEncounterComponent({ index }) {
    const goblin = GoblinStore((state) => state.gang[index]);
    const [isShowPopup, setIsShowPopup] = useState(false);
    const [weaponToAttack, setWeaponToAttack] = useState();

    const heroData = VikingStore((state) => state);

    useEffect(() => {
        if (_.isNumber(index)) {
            setIsShowPopup(true);
        }
    }, [index]);

    useEffect(() => {
        console.log(weaponToAttack);
    }, [weaponToAttack]);

    if (isShowPopup) {
        return (
            <Modal dialogClassName='encounter-modal' show={isShowPopup} onHide={() => { }} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <div className='goblin-encounter-container'>
                    <GoblinDetailComponent goblin={goblin} />
                </div>
                <div className='hero-container hero-encounter-container'>
                    <div className='description'>
                    </div>
                    <div className='hero-card-name'>{heroData.name}</div>
                    <div className='health-bar'>
                        {_.times(heroData.health.max, (index) => (
                            <i key={`health-${index}`} className={`health-power ${heroData.health.current - index > 0 ? 'active' : ''}`}></i>
                        ))}
                    </div>
                    <div className='hero-card-name sub-name'>{heroData.class}</div>
                    <div className='dice-power-container'>
                        <div className='power-row'><i className='icon strength-icon' />
                            {_.times(heroData.dicePower.attack, (index) => (
                                <i key={`attack-${index}`} className="dice-power"></i>
                            ))}
                        </div>
                        <div className='power-row'><i className='icon magic-icon' />
                            {_.times(heroData.dicePower.magic, (index) => (
                                <i key={`attack-${index}`} className="dice-power"></i>
                            ))}
                        </div>
                        <div className='power-row'><i className='icon speed-icon' />
                            {_.times(heroData.dicePower.speed, (index) => (
                                <i key={`attack-${index}`} className="dice-power"></i>
                            ))}
                        </div>
                    </div>
                    <div className='defend-power'>{heroData.defend}</div>
                    {heroData.weapon.map((weapon, index) => {
                        if (_.isNull(weaponToAttack) || weapon.id !== weaponToAttack?.id) {
                            return <div key={index} onClick={() => setWeaponToAttack(weapon)} className={`weapon-card weapon-card-${index} item-image ${weapon.id}`}>
                                <div className='item-name'>{weapon.name}</div>
                                <div className={`attack-type ${weapon.attack.type}-type`}>
                                    {weapon.attack.effect === 'plus' ? '+' : '-'}{JSON.stringify(weapon.attack.value)}
                                    {/* {weapon.attackType === 'range' ? <>{weapon.range}<i className='tile-icon' /></> : ''} */}
                                </div>
                                <div className='use-button'>Choose this weapon</div>
                            </div>;
                        }
                    }

                    )}
                    {heroData.rune.map((rune, index) =>
                        <div key={index} className={`rune-card rune-card-${index} item-image ${rune.id}`}></div>
                    )}
                    {heroData.armor.length > 0 &&
                        <div className={`armor-card item-image ${heroData.armor[0].id}`}></div>
                    }

                </div>
                <FightContainerComponent weapon={weaponToAttack} setWeaponToAttack={() => setWeaponToAttack()} goblinIndex={index} />
                <Button className='close-button' onClick={() => { setIsShowPopup(false); }}>Close</Button>
            </Modal>
        );
    }

}

const FightContainerComponent = ({ weapon, setWeaponToAttack, goblinIndex }) => {
    const heroData = VikingStore((state) => state);
    const totalDiceScore = DiceStore((state) => state.diceScore.main + state.diceScore.add1 + state.diceScore.add2);
    const diceScore = DiceStore((state) => state.diceScore);
    const diceStore = DiceStore((state) => state);
    const selectMainDice = DiceStore((state) => state.selectMainDice);
    const select1stAddition = DiceStore((state) => state.select1stAddition);
    const select2ndAddition = DiceStore((state) => state.select2ndAddition);
    const resetDiceScore = DiceStore((state) => state.resetDiceScore);
    const goblinStore = GoblinStore((state) => state);
    const goblin = GoblinStore((state) => state.gang[goblinIndex]);


    const [dicePower, setDicePower] = useState(0);
    const [rollResult, setRollResult] = useState([0, 0, 0]);
    const [effectHeroGet, setEffectHeroGet] = useState({ action: 0, health: 0 });
    const [isDiceShaking, setIsDiceShaking] = useState(false);
    const [isConfirmDice, setIsConfirmDice] = useState(false);

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

    const rollTheDice = () => {
        let diceResult = [];
        for (let index = 0; index < dicePower; index++) {
            diceResult.push({ ...DiceUtil.rollDice() });
        }
        setRollResult(diceResult);
        diceStore.setDicePhase('AFTER_ROLL_DICE');
    };

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

    useEffect(() => {
        if (!_.isNull(weapon) && !_.isUndefined(weapon)) {
            switch (weapon.attack.type) {
                case 'melee':
                    setDicePower(heroData.dicePower.attack);
                    break;
                case 'range':
                    setDicePower(heroData.dicePower.speed);
                    break;
                case 'magic':
                    setDicePower(heroData.dicePower.magic);
                    break;
                default:
                    break;
            }
        }
    }, [weapon]);

    const resetDice = () => {
        resetDiceScore();
        rollResult.forEach((dice) => {
            dice.selected = false;
        });
        checkEffectHeroGet();
    };

    const confirmDice = () => {
        diceStore.setDicePhase('CONFIRM_DICE_SCORE');
    };

    useEffect(() => {
        if (diceStore.dicePhase === 'CONFIRM_DICE_SCORE') {
            setTimeout(() => {
                diceStore.setDicePhase('AFTER_CHARGE_SHIELD');
            }, 500);
        }

        if (diceStore.dicePhase === 'AFTER_CHARGE_SHIELD') {
            if (totalDiceScore + weapon.attack.value - goblin.defense > 0) {
                setTimeout(() => {
                    diceStore.setDicePhase('ATTACK_MONSTER_HEALTH');
                }, 500);
            } else {
                setTimeout(() => {
                    diceStore.setDicePhase('COUNTER_ATTACK');
                }, 500);
            }
        }

        if (diceStore.dicePhase === 'ATTACK_MONSTER_HEALTH') {
            setTimeout(() => {
                diceStore.setDicePhase('KILL_GOBLIN');
                // goblinStore.killGoblinByIdx(goblinIndex);
            }, 500);
        }
    }, [diceStore.dicePhase]);

    const showAttackNumber = () => {
        return;
    };


    if (!_.isUndefined(weapon)) {
        return <div className='fight-container'>
            {dicePower - 1 >= 0 ? <DiceItem isShaking={isDiceShaking} diceOrder={0} diceFace={rollResult[0]} selectDice={selectDice} totalDiceScore={totalDiceScore} /> : <div className="dice-frame"></div>}
            {dicePower - 2 >= 0 ? <DiceItem isShaking={isDiceShaking} diceOrder={1} diceFace={rollResult[1]} selectDice={selectDice} totalDiceScore={totalDiceScore} /> : <div className="dice-frame"></div>}
            {dicePower - 3 >= 0 ? <DiceItem isShaking={isDiceShaking} diceOrder={2} diceFace={rollResult[2]} selectDice={selectDice} totalDiceScore={totalDiceScore} /> : <div className="dice-frame"></div>}
            <div className={
                `dice-item monster-dice-container` +
                `${isDiceShaking ? ' shaking' : ''}` +
                `${diceStore.dicePhase === 'CONFIRM_DICE_SCORE' ||
                    diceStore.dicePhase === 'AFTER_CHARGE_SHIELD' ? ' hero-phase' : ''}`
            }></div>
            <div onClick={() => setWeaponToAttack(null)}
                className={`weapon-card item-image ${weapon?.id} selected-weapon` +
                    `${diceStore.dicePhase === 'CONFIRM_DICE_SCORE' ||
                        diceStore.dicePhase === 'AFTER_CHARGE_SHIELD' ? ' charge-animation' : ''}` +
                    `${diceStore.dicePhase === 'ATTACK_MONSTER_HEALTH' || diceStore.dicePhase === 'KILL_GOBLIN' ? ' attack-animation' : ''}`
                }
            >
                <div className='item-name'>{weapon?.name}</div>
                <div className={`attack-type ${_.get(weapon, 'attack.type')}-type phase-${diceStore.dicePhase}`}>
                    {diceStore.dicePhase === 'INITIAL' ?
                        <span>{_.get(weapon, 'attack.effect') === 'plus' ? '+' : '-'}{_.get(weapon, 'attack.value')}</span> : ''
                    }
                    {diceStore.dicePhase === 'AFTER_ROLL_DICE' ?
                        <><span className='total-score'>{totalDiceScore + weapon.attack.value}</span> <span className='total-score-description'>({totalDiceScore || 0} +{weapon.attack.value})</span></> : ''
                    }
                    {diceStore.dicePhase === 'AFTER_CHARGE_SHIELD' || diceStore.dicePhase === 'ATTACK_MONSTER_HEALTH' ?
                        <><span className='total-score-full'>{totalDiceScore + weapon.attack.value}</span>➧<span className='total-score'>{totalDiceScore + weapon.attack.value - goblin.defense}</span> <span className='total-score-description'>({totalDiceScore || 0} +{weapon.attack.value} -{goblin.defense})</span></> : ''
                    }
                    {/* {weapon.attackType === 'range' ? <>{weapon.range}<i className='tile-icon' /></> : ''} */}
                </div>
                {rollResult[0] === 0 && <div className='use-button'>- Remove -</div>}
                <div className='selected-dice-container'>
                    {diceScore.main > 0 && <div className='selected-dice-item dice-item-main'>{diceScore.main}</div>}
                    {diceScore.add1 > 0 && <div className='selected-dice-item dice-item-add-1'>+{diceScore.add1}</div>}
                    {diceScore.add2 > 0 && <div className='selected-dice-item dice-item-add-2'>+{diceScore.add2}</div>}
                </div>
            </div>
            {(!_.isUndefined(weapon) && rollResult[0] === 0) && <Button size='sm' variant='success' onClick={() => { rollTheDice(); setIsDiceShaking(false); }} onMouseEnter={() => { setIsDiceShaking(true); }} onMouseLeave={() => { setIsDiceShaking(false); }} className='attack-button'><span>!! Attack !!</span></Button>}
            {totalDiceScore !== 0 && !diceStore.isConfirm && <>
                <Button size='sm' variant='warning' onClick={() => { resetDice(); }} className='reset-button'>Reset</Button>
                <Button size='sm' variant='success' onClick={() => { confirmDice(); }} className='confirm-button'>Confirm</Button>
            </>}
        </div>;
    }
};
