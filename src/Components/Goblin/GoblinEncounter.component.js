import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import GoblinStore from '../../Store/Goblin.store';
import _ from 'lodash';
import { Button } from 'react-bootstrap';
import { GoblinDetailComponent } from './GoblinDetail.component';
import VikingStore from '../../Store/Viking.store';


export default GoblinEncounterComponent;

function GoblinEncounterComponent({ index }) {
    const goblin = GoblinStore((state) => state.gang[index]);
    const [isShowPopup, setIsShowPopup] = useState(false);

    const heroData = VikingStore((state) => state);

    useEffect(() => {
        if (_.isNumber(index)) {
            setIsShowPopup(true);
        }
    }, [index]);


    if (isShowPopup) {
        return (
            <Modal show={isShowPopup} onHide={() => { }} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
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
                    {heroData.weapon.map((weapon, index) =>
                        <div key={index} style={{ rotate: (Math.floor(Math.random() * (30)) - 15) + 'deg' }} className={`weapon-card weapon-card-${index} item-image ${weapon.id}`}>
                            <div className='item-name'>{weapon.name}</div>
                            <div className={`attack-type ${weapon.attack.type}-type`}>
                                {weapon.attack.effect === 'plus' ? '+' : '-'}{JSON.stringify(weapon.attack.value)}
                                {/* {weapon.attackType === 'range' ? <>{weapon.range}<i className='tile-icon' /></> : ''} */}
                            </div>
                            <div className='use-button'>ATTACK!!!</div>
                        </div>
                    )}
                    {heroData.rune.map((rune, index) =>
                        <div key={index} style={{ rotate: (Math.floor(Math.random() * (30)) - 15) + 'deg' }} className={`rune-card rune-card-${index} item-image ${rune.id}`}></div>
                    )}
                    {heroData.armor.length > 0 &&
                        <div style={{ rotate: (Math.floor(Math.random() * (30)) - 15) + 'deg' }} className={`armor-card item-image ${heroData.armor[0].id}`}></div>
                    }

                </div>
                <Button onClick={() => { setIsShowPopup(false); }}>Close</Button>
            </Modal>
        );
    }

}