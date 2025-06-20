import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import GoblinStore from '../../Store/Goblin.store';
import _ from 'lodash';
import { Button } from 'react-bootstrap';
import GoblinCardComponent from './GoblinCard.component';
import VikingStore from '../../Store/Viking.store';
import DiceStore from '../../Store/Dice.store';
import './EncounterAnimation.scss';
import GameStateStore from '../../Store/GameState.store';
import FightContainerComponent from './FightContainerComponent';

const CardPlaceholderComponent = ({ size, className }) => {
    return (
        <div className={`card-place-holder card-item ${size}-card ${className}`}>
            <div className='corner top-left'></div>
            <div className='corner top-right'></div>
            <div className='corner bottom-left'></div>
            <div className='corner bottom-right'></div>
        </div>
    );
};

export default GoblinEncounterComponent;

function GoblinEncounterComponent({ index }) {
    const goblin = GoblinStore((state) => state.gang[index]);
    const [isShowPopup, setIsShowPopup] = useState(false);
    const [weaponToAttack, setWeaponToAttack] = useState();

    const heroData = VikingStore((state) => state);
    const diceStore = DiceStore((state) => state);
    const gameState = GameStateStore((state) => state);

    useEffect(() => {
        if (gameState.goblinEncounter) {
            setIsShowPopup(true);
        } else {
            setIsShowPopup(false);
        }
    }, [gameState.goblinEncounter]);

    const chooseWeapon = (weapon) => {
        setWeaponToAttack(weapon);
        gameState.setChooseWeapon();
    };

    const endEncounterPhase = () => {
        setIsShowPopup(false);
        gameState.resetAll();
    }

    if (isShowPopup) {
        return (
            <Modal dialogClassName='encounter-modal' show={isShowPopup} onHide={() => { }} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <CardPlaceholderComponent size={'portrait'} className={'monster-card'} />
                <CardPlaceholderComponent size={'portrait'} className={'hero-card'} />
                <CardPlaceholderComponent size={'square'} className={'pick-weapon-card'} />
                <CardPlaceholderComponent size={'square'} className={'armor-card'} />
                <CardPlaceholderComponent size={'square-half'} className={'weapon-left-card'} />
                <CardPlaceholderComponent size={'square-half'} className={'weapon-right-card'} />
                <GoblinCardComponent goblin={goblin} />
                <div className='card-item hero-container hero-encounter-container portrait-card'>
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
                            return <div key={index} onClick={() => chooseWeapon(weapon)} className={`weapon-card weapon-card-${index} item-image ${weapon.id}`}>
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
                <Button className='close-button' onClick={endEncounterPhase}>Close</Button>
            </Modal>
        );
    }

}



