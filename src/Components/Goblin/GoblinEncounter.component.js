import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import GoblinStore from '../../Store/Goblin.store';
import _ from 'lodash';
import { Button } from 'react-bootstrap';
import { GoblinDetailComponent } from './GoblinDetail.component';
import VikingStore from '../../Store/Viking.store';
import { set } from 'lodash';


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
            <Modal className='encounter-modal' show={isShowPopup} onHide={() => { }} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <div className='goblin-encounter-container'>
                    <GoblinDetailComponent goblin={goblin} />
                </div>
                <div style={{ rotate: (Math.floor(Math.random() * (20)) - 10) + 'deg' }} className='hero-container hero-encounter-container'>
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
                            return <div key={index} onClick={() => setWeaponToAttack(weapon)} style={{ rotate: (Math.floor(Math.random() * (30)) - 15) + 'deg' }} className={`weapon-card weapon-card-${index} item-image ${weapon.id}`}>
                                <div className='item-name'>{weapon.name}</div>
                                <div className={`attack-type ${weapon.attack.type}-type`}>
                                    {weapon.attack.effect === 'plus' ? '+' : '-'}{JSON.stringify(weapon.attack.value)}
                                    {/* {weapon.attackType === 'range' ? <>{weapon.range}<i className='tile-icon' /></> : ''} */}
                                </div>
                                <div className='use-button'>!!! Attack !!!</div>
                            </div>
                        }
                    }

                    )}
                    {heroData.rune.map((rune, index) =>
                        <div key={index} style={{ rotate: (Math.floor(Math.random() * (30)) - 15) + 'deg' }} className={`rune-card rune-card-${index} item-image ${rune.id}`}></div>
                    )}
                    {heroData.armor.length > 0 &&
                        <div style={{ rotate: (Math.floor(Math.random() * (30)) - 15) + 'deg' }} className={`armor-card item-image ${heroData.armor[0].id}`}></div>
                    }

                </div>
                <FightContainerComponent weapon={weaponToAttack} setWeaponToAttack={() => setWeaponToAttack()} />
                <Button onClick={() => { setIsShowPopup(false); }}>Close</Button>
            </Modal>
        );
    }

}

const FightContainerComponent = ({ weapon, setWeaponToAttack }) => {
    const [dicePower, setDicePower] = useState(0);
    const [rollResult, setRollResult] = useState([0, 0, 0]);

    const heroData = VikingStore((state) => state);
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
            {dicePower - 1 >= 0 ? <DiceComponent /> : <div className="dice-container"></div>}
            {dicePower - 2 >= 0 ? <DiceComponent /> : <div className="dice-container"></div>}
            {dicePower - 3 >= 0 ? <DiceComponent /> : <div className="dice-container"></div>}
            <div className='dice-container monster-dice-container'></div>
            <div onClick={() => setWeaponToAttack(null)} className={`weapon-card item-image ${weapon?.id} selected-weapon`}>
                <div className='item-name'>{weapon?.name}</div>
                <div className={`attack-type ${_.get(weapon, 'attack.type')}-type`}>
                    {_.get(weapon, 'attack.effect') === 'plus' ? '+' : '-'}{_.get(weapon, 'attack.value')}
                    {/* {weapon.attackType === 'range' ? <>{weapon.range}<i className='tile-icon' /></> : ''} */}
                </div>
                <div className='use-button'>- Remove -</div>
            </div>
        </div>
    }

}

const DiceComponent = () => {
    return (
        <div className="dice-container rollable"></div>
    )
}