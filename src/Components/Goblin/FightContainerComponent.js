import { useEffect, useState } from 'react';
import GoblinStore from '../../Store/Goblin.store';
import _ from 'lodash';
import { Button } from 'react-bootstrap';
import VikingStore from '../../Store/Viking.store';
import { DiceItem } from '../DiceItem.component';
import DiceStore from '../../Store/Dice.store';
import DiceUtil from '../../Util/Dice.Util';
import GameStateStore, { FightPhaseEnum } from '../../Store/GameState.store';
import { MonsterDiceComponent } from './MonsterDiceComponent';
import WinRewardsStore, { WinRewardsStaeENUM } from '../../Store/WinRewards.store';
import { logDOM } from '@testing-library/react';

export default function FightContainerComponent({ weapon, setWeaponToAttack, goblinIndex }) {
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
    const gameState = GameStateStore((state) => state);
    const winRewards = WinRewardsStore((state) => state);

    const [dicePower, setDicePower] = useState(0);
    const [rollResult, setRollResult] = useState([0, 0, 0]);
    const [effectHeroGet, setEffectHeroGet] = useState({ action: 0, health: 0 });
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

    useEffect(() => {
        if (!_.isUndefined(weapon)) {
            gameState.setNetAttackValue(totalDiceScore + weapon.attack.value);
        }
    }, [totalDiceScore, gameState.fightPhase === FightPhaseEnum.ROLL_DICE]);

    const rollTheDice = () => {
        let diceResult = [];
        for (let index = 0; index < dicePower; index++) {
            diceResult.push({ ...DiceUtil.rollDice() });
        }
        setRollResult(diceResult);
        gameState.setFightPhase(FightPhaseEnum.ROLL_DICE);
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
        gameState.setFightPhase(FightPhaseEnum.APPLY_DAMAGE);
    };

    useEffect(() => {
        if (gameState.fightPhase === FightPhaseEnum.IDLE) {
            resetDiceScore();
            resetWeapon();
        }

        if (gameState.fightPhase === FightPhaseEnum.APPLY_DAMAGE) {
            const shieldTimer = setTimeout(() => {
                if (gameState.netAttackValue > goblin.defense) {
                    gameState.setMonsterShieldBroken(true);
                }
            }, 300);

            const healthTimer = setTimeout(() => {
                const damage = Math.max(0, gameState.netAttackValue - goblin.defense);
                if (damage >= goblin.health) {
                    gameState.setMonsterHeartBroken(true);
                    gameState.setFightPhase(FightPhaseEnum.VICTORY);
                } else {
                    gameState.setFightPhase(FightPhaseEnum.COUNTER_ATTACK);
                }
            }, 1300);

            return () => {
                clearTimeout(shieldTimer);
                clearTimeout(healthTimer);
            };
        }

        if (gameState.fightPhase === FightPhaseEnum.VICTORY) {
            winRewards.setStart();
        }
    }, [gameState.fightPhase]);

    useEffect(() => {
        if (winRewards.state === WinRewardsStaeENUM.START) {
            winRewards.setRewards([...goblin.rewards]);
        }

        if (winRewards.state === WinRewardsStaeENUM.END) {
            winRewards.resetAll();
            gameState.resetAll();
            goblinStore.showDefeatedPopup();
            goblinStore.killGoblinByIdx(goblinIndex);
        }
    }, [winRewards.state]);

    const resetWeapon = () => {
        setWeaponToAttack(null);
        gameState.setFightPhase(FightPhaseEnum.CHOOSE_WEAPON);
    };

    const showAttackNumber = () => {
        return;
    };

    if (!_.isUndefined(weapon)) {
        return <div className='fight-container'>
            <div className='fight-dice-container'>
                {dicePower - 1 >= 0 ? <DiceItem isShaking={diceStore.isShaking} diceOrder={0} diceFace={rollResult[0]} selectDice={selectDice} totalDiceScore={totalDiceScore} /> : <div className="dice-frame"></div>}
                {dicePower - 2 >= 0 ? <DiceItem isShaking={diceStore.isShaking} diceOrder={1} diceFace={rollResult[1]} selectDice={selectDice} totalDiceScore={totalDiceScore} /> : <div className="dice-frame"></div>}
                {dicePower - 3 >= 0 ? <DiceItem isShaking={diceStore.isShaking} diceOrder={2} diceFace={rollResult[2]} selectDice={selectDice} totalDiceScore={totalDiceScore} /> : <div className="dice-frame"></div>}
            </div>
            <div onClick={() => [FightPhaseEnum.IDLE, FightPhaseEnum.CHOOSE_WEAPON].includes(gameState.fightPhase) && resetWeapon()}
                className={`weapon-card card-item square-card item-image ${weapon?.id} selected-weapon` +
                    `${![FightPhaseEnum.IDLE, FightPhaseEnum.CHOOSE_WEAPON].includes(gameState.fightPhase) ? ' already-rolled' : ''}` +
                    `${gameState.fightPhase === FightPhaseEnum.APPLY_DAMAGE ? ' attack-animation' : ''}`}
            >
                <div className='item-name'>{weapon?.name}</div>
                <div className={`attack-type ${_.get(weapon, 'attack.type')}-type phase-${diceStore.dicePhase}`}>
                    {[FightPhaseEnum.IDLE, FightPhaseEnum.CHOOSE_WEAPON].includes(gameState.fightPhase) ?
                        <span>{_.get(weapon, 'attack.effect') === 'plus' ? '+' : '-'}{_.get(weapon, 'attack.value')}</span> : ''}
                    {gameState.fightPhase === FightPhaseEnum.ROLL_DICE ?
                        <><span className='total-score'>{gameState.netAttackValue}</span> <span className='total-score-description'>({totalDiceScore || 0} +{weapon.attack.value})</span></> : ''}
                    {[FightPhaseEnum.APPLY_DAMAGE, FightPhaseEnum.COUNTER_ATTACK, FightPhaseEnum.VICTORY, FightPhaseEnum.DEFEAT].includes(gameState.fightPhase) ?
                        <>
                            <span className='total-score-full'>{gameState.netAttackValue}</span>
                            ➧<span className='total-score'>{(gameState.netAttackValue <= goblin.defense) ? '0' : gameState.netAttackValue - goblin.defense}</span>
                            <span className='total-score-description'>({totalDiceScore || 0} +{weapon.attack.value} -{goblin.defense})</span>
                        </> : ''}
                    {/* {weapon.attackType === 'range' ? <>{weapon.range}<i className='tile-icon' /></> : ''} */}
                </div>
                {gameState.fightPhase === FightPhaseEnum.CHOOSE_WEAPON && <div className='use-button'>- Remove -</div>}
                <div className='selected-dice-container'>
                    {diceScore.main > 0 && <div className='selected-dice-item dice-item-main'>{diceScore.main}</div>}
                    {diceScore.add1 > 0 && <div className='selected-dice-item dice-item-add-1'>+{diceScore.add1}</div>}
                    {diceScore.add2 > 0 && <div className='selected-dice-item dice-item-add-2'>+{diceScore.add2}</div>}
                </div>
            </div>
            {(!_.isUndefined(weapon) && rollResult[0] === 0) && <Button size='sm' variant='success' onClick={() => { rollTheDice(); diceStore.setShaking(false); }} onMouseEnter={() => { diceStore.setShaking(true); }} onMouseLeave={() => { diceStore.setShaking(false); }} className='attack-button'><span>!! Attack !!</span></Button>}
            {totalDiceScore !== 0 && !diceStore.isConfirm && gameState.fightPhase === FightPhaseEnum.ROLL_DICE && <>
                <Button size='sm' variant='warning' onClick={() => { resetDice(); }} className='reset-button'>Reset</Button>
                <Button size='sm' variant='success' onClick={() => { confirmDice(); }} className='confirm-button'>Confirm</Button>
            </>}
        </div>;
    }

};
