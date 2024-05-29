import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import GoblinStore from '../../Store/Goblin.store';
import _ from 'lodash';
import { Button } from 'react-bootstrap';
import { GoblinDetailComponent } from './GoblinDetail.component';
import VikingStore from '../../Store/Viking.store';
import { set } from 'lodash';
import { DiceItem } from '../DiceItem.component';
import DiceStore from '../../Store/Dice.store';
import DiceUtil from '../../Util/Dice.Util';

export default GoblinEncounterComponent;

function GoblinEncounterComponent({ index }) {
    const goblin = GoblinStore((state) => state.gang[index]);
    const [isShowPopup, setIsShowPopup] = useState(false);
    const [weaponToAttack, setWeaponToAttack] = useState(null);

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
                                <div className='use-button'>!!! Attack !!!</div>
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
                <FightContainerComponent weapon={weaponToAttack} setWeaponToAttack={() => setWeaponToAttack()} />
                <Button className='close-button' onClick={() => { setIsShowPopup(false); }}>Close</Button>
            </Modal>
        );
    }

}

const FightContainerComponent = ({ weapon, setWeaponToAttack }) => {
    const heroData = VikingStore((state) => state);
    const totalDiceScore = DiceStore((state) => state.diceScore.main + state.diceScore.add1 + state.diceScore.add2);
    const diceScore = DiceStore((state) => state.diceScore);
    const selectMainDice = DiceStore((state) => state.selectMainDice);
    const select1stAddition = DiceStore((state) => state.select1stAddition);
    const select2ndAddition = DiceStore((state) => state.select2ndAddition);

    const [dicePower, setDicePower] = useState(0);
    const [rollResult, setRollResult] = useState([0, 0, 0]);
    const [effectHeroGet, setEffectHeroGet] = useState({ action: 0, health: 0 });

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

    if (!_.isUndefined(weapon)) {
        return <div className='fight-container'>
            {dicePower - 1 >= 0 ? <DiceItem diceOrder={0} diceFace={rollResult[0]} selectDice={selectDice} totalDiceScore={totalDiceScore} /> : <div className="dice-frame"></div>}
            {dicePower - 2 >= 0 ? <DiceItem diceOrder={1} diceFace={rollResult[1]} selectDice={selectDice} totalDiceScore={totalDiceScore} /> : <div className="dice-frame"></div>}
            {dicePower - 3 >= 0 ? <DiceItem diceOrder={2} diceFace={rollResult[2]} selectDice={selectDice} totalDiceScore={totalDiceScore} /> : <div className="dice-frame"></div>}
            <div className='dice-item monster-dice-container'></div>
            <div onClick={() => setWeaponToAttack(null)} className={`weapon-card item-image ${weapon?.id} selected-weapon`}>
                <div className='item-name'>{weapon?.name}</div>
                <div className={`attack-type ${_.get(weapon, 'attack.type')}-type`}>
                    {_.get(weapon, 'attack.effect') === 'plus' ? '+' : '-'}{_.get(weapon, 'attack.value')}
                    {/* {weapon.attackType === 'range' ? <>{weapon.range}<i className='tile-icon' /></> : ''} */}
                </div>
                <div className='use-button'>- Remove -</div>
            </div>
            {(!_.isUndefined(weapon) && totalDiceScore === 0) && <div onClick={() => { rollTheDice(); }} className='attack-button'>!! Attack !!</div>}
            <div className='selected-dice-container'>
                {diceScore.main > 0 && <div className='selected-dice-item dice-item-main'>{diceScore.main}</div>}
                {diceScore.add1 > 0 && <div className='selected-dice-item dice-item-add-1'>{diceScore.add1}</div>}
                {diceScore.add2 > 0 && <div className='selected-dice-item dice-item-add-2'>{diceScore.add2}</div>}
            </div>
        </div>;
    }
};
