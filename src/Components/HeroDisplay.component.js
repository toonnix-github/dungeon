import VikingStore from "../Store/Viking.store";
import 'react-tooltip/dist/react-tooltip.css'
import _ from 'lodash';
import { Tooltip } from 'react-tooltip'

function HeroDisplayComponent() {
    const vikingData = VikingStore((state) => state);
    const vikingAction = VikingStore((state) => state.action);
    const vikingMove = VikingStore((state) => state.move);

    return (
        <div className="hero-container">
            <span className="label">HP</span> {vikingData.health.current} / {vikingData.health.max}
            <hr />
            <div className="profile-container">
                <div className="portrait">
                    <div className="defend-power">{vikingData.status.defend}</div>
                </div>
                <div className="status">
                    <div className="power">
                        <span>{vikingData.status.attack}</span>
                        <i className="attack-power" />
                    </div>
                    {[...Array(vikingData.dicePower.attack)].map((k, index) => (
                        <i key={`attack-${index}`} className="dice-power"></i>
                    ))}
                    <hr />
                    <div className="power">
                        <span>{vikingData.status.magic}</span>
                        <i className="magic-power" />
                    </div>
                    {[...Array(vikingData.dicePower.magic)].map((k, index) => (
                        <i key={`magic-${index}`} className="dice-power"></i>
                    ))}
                    <hr />
                    <div className="power">
                        <span>{vikingData.status.speed}</span>
                        <i className="speed-power" />
                    </div>
                    {[...Array(vikingData.dicePower.speed)].map((k, index) => (
                        <i key={`speed-${index}`} className="dice-power"></i>
                    ))}
                </div>
            </div>
            <div>
                <div className="parameter-container">
                    <span className="move-token-container">
                        {
                            _.times(vikingMove.max, (i) => {
                                return (
                                    <div key={i} className={'move-token' + ((vikingMove.current - i > 0) ? ' active' : '')}></div>
                                )
                            })
                        }
                    </span>
                    <hr />
                    <span className="action-token-container">
                        {
                            _.times(vikingAction.max, (i) => {
                                return (
                                    <div key={i} className={'action-token' + ((vikingAction.current - i > 0) ? ' active' : '')}></div>
                                )
                            })
                        }
                    </span>
                </div>
                <hr />
                <div className="equipment-container">
                    <FirstWeaponDisplay />
                    <SecondWeaponDisplay />
                    <div className="armor-item"></div>
                </div>
                <div className="rune-container">
                    <FirstRune />
                    <SecondRune />
                    <ThirdRune />
                </div>
            </div>
        </div >
    )
}

function FirstWeaponDisplay() {
    const isVikingFirstWeaponExist = VikingStore((state) => state.weapon.length > 0);
    const vikingFirstWeapon = VikingStore((state) => state.weapon[0]);
    return (
        <>
            {isVikingFirstWeaponExist ?
                <div
                    data-tooltip-id="first-weapon-tooltip"
                    className={`item-image equipment-display ${vikingFirstWeapon.id}`}></div> :
                <div className="equipment-item"></div>
            }
            {isVikingFirstWeaponExist &&
                <Tooltip id="first-weapon-tooltip">
                    <div><span className="label">Name: </span><i>{vikingFirstWeapon.name}</i></div>
                    <div><span className="label">Description: </span><i>{vikingFirstWeapon.description}</i></div>
                    <div>
                        <span className="label">Attack: </span><i>{vikingFirstWeapon.attack}</i>
                        <span className="label"> Defend: </span><i>{vikingFirstWeapon.defend}</i>
                    </div>
                </Tooltip>}
        </>
    )
}

function SecondWeaponDisplay() {
    const isVikingSecondWeaponExist = VikingStore((state) => state.weapon.length > 1);
    const vikingSecondWeapon = VikingStore((state) => state.weapon[1]);
    return (
        <>
            {isVikingSecondWeaponExist ?
                <div
                    data-tooltip-id="second-weapon-tooltip"
                    className={`item-image equipment-display ${vikingSecondWeapon.id}`}></div> :
                <div className="equipment-item"></div>
            }
            {isVikingSecondWeaponExist &&
                <Tooltip id="second-weapon-tooltip">
                    <div><span className="label">Name</span> <i>{vikingSecondWeapon.name}</i></div>
                    <div><span className="label">Description: </span> <i>{vikingSecondWeapon.description}</i></div>
                    <div>
                        <span className="label">Attack: </span> <i>{vikingSecondWeapon.attack}</i>
                        <span className="label"> Defend: </span> <i>{vikingSecondWeapon.defend}</i>
                    </div>
                </Tooltip>
            }

        </>
    )
}

function FirstRune() {
    const vikingFirstRuneExist = VikingStore((state) => state.rune.length > 0);
    const vikingFirstRune = VikingStore((state) => state.rune[0]);
    return (
        <>
            {vikingFirstRuneExist ?
                <div
                    data-tooltip-id="first-rune-tooltip"
                    className={`item-image rune-display ${vikingFirstRune.id}`}></div> :
                <div className="rune-item"></div>
            }
            {vikingFirstRuneExist &&
                <Tooltip id="first-rune-tooltip">
                    <div><span className="label">Name: </span>{vikingFirstRune.name}</div>
                    <div><span className="label">Description: </span>{vikingFirstRune.description}</div>
                    <div>
                        <span className="label">Attack: </span>{vikingFirstRune.attack || '-'}
                        <span className="label"> Defend: </span>{vikingFirstRune.defend || '-'}
                        <span className="label"> Magic: </span>{vikingFirstRune.magic || '-'}
                        <span className="label"> Speed: </span>{vikingFirstRune.speed || '-'}
                    </div>
                </Tooltip>
            }
        </>
    )
}

function SecondRune() {
    const vikingSecondRuneExist = VikingStore((state) => state.rune.length > 1);
    const vikingSecondRune = VikingStore((state) => state.rune[1]);
    return (
        <>
            {vikingSecondRuneExist ?
                <div
                    data-tooltip-id="second-rune-tooltip"
                    className={`item-image rune-display ${vikingSecondRune.id}`}></div> :
                <div className="rune-item"></div>
            }
            {vikingSecondRuneExist &&
                <Tooltip id="second-rune-tooltip">
                    <div><span className="label">Name: </span>{vikingSecondRune.name}</div>
                    <div><span className="label">Description: </span>{vikingSecondRune.description}</div>
                    <div>
                        <span className="label">Attack: </span>{vikingSecondRune.attack || '-'}
                        <span className="label"> Defend: </span>{vikingSecondRune.defend || '-'}
                        <span className="label"> Magic: </span>{vikingSecondRune.magic || '-'}
                        <span className="label"> Speed: </span>{vikingSecondRune.speed || '-'}
                    </div>
                </Tooltip>
            }
        </>
    )
}

function ThirdRune() {
    const vikingThirdRuneExist = VikingStore((state) => state.rune.length > 2);
    const vikingThirdRune = VikingStore((state) => state.rune[2]);
    return (
        <>
            {vikingThirdRuneExist ?
                <div
                    data-tooltip-id="third-rune-tooltip"
                    className={`item-image rune-display ${vikingThirdRune.id}`}></div> :
                <div className="rune-item"></div>
            }
            {vikingThirdRuneExist &&
                <Tooltip id="third-rune-tooltip">
                    <div><span className="label">Name: </span>{vikingThirdRune.name}</div>
                    <div><span className="label">Description: </span>{vikingThirdRune.description}</div>
                    <div>
                        <span className="label">Attack: </span>{vikingThirdRune.attack || '-'}
                        <span className="label"> Defend: </span>{vikingThirdRune.defend || '-'}
                        <span className="label"> Magic: </span>{vikingThirdRune.magic || '-'}
                        <span className="label"> Speed: </span>{vikingThirdRune.speed || '-'}
                    </div>
                </Tooltip>
            }
        </>
    )
}

export default HeroDisplayComponent;