import VikingStore from "../Store/Viking.store";
import 'react-tooltip/dist/react-tooltip.css';
import _ from 'lodash';
import { Tooltip } from 'react-tooltip';

function ItemDisplay({ item, tooltipId, emptyClassName, itemType }) {
    const itemExists = !!item;

    return (
        <>
            {itemExists ? (
                <div
                    data-tooltip-id={tooltipId}
                    className={`item-image ${itemType}-display ${item.id} ${item.rarity}`}
                ></div>
            ) : (
                <div className={emptyClassName}></div>
            )}
            {itemExists && (
                <Tooltip id={tooltipId}>
                    <div><span className="label">Name: </span>{item.name}</div>
                    <div><span className="label">Effect: </span>{item.effect}</div>
                    {itemType !== 'rune' && (
                        <div>
                            <span className="label">Attack: </span>{item.attack || '-'}
                            <span className="label"> Defend: </span>{item.defend || '-'}
                        </div>
                    )}
                </Tooltip>
            )}
        </>
    );
}

function HeroDisplayComponent() {
    const vikingData = VikingStore((state) => state);
    const vikingAction = VikingStore((state) => state.action);
    const vikingMove = VikingStore((state) => state.move);

    return (
        <div className="hero-container">
            <span className="label health-bar">HP:
                {_.times(vikingData.health.max, (index) => (
                    <i key={`health-${index}`} className={`health-power ${vikingData.health.current - index > 0 ? 'active' : ''}`}></i>
                ))}
            </span>
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
                    {_.times(vikingData.dicePower.attack, (index) => (
                        <i key={`attack-${index}`} className="dice-power"></i>
                    ))}
                    <hr />
                    <div className="power">
                        <span>{vikingData.status.magic}</span>
                        <i className="magic-power" />
                    </div>
                    {_.times(vikingData.dicePower.magic, (index) => (
                        <i key={`magic-${index}`} className="dice-power"></i>
                    ))}
                    <hr />
                    <div className="power">
                        <span>{vikingData.status.speed}</span>
                        <i className="speed-power" />
                    </div>
                    {_.times(vikingData.dicePower.speed, (index) => (
                        <i key={`speed-${index}`} className="dice-power"></i>
                    ))}
                </div>
            </div>
            <div>
                <div className="parameter-container">
                    <span className="move-token-container">
                        {_.times(vikingMove.max, (i) => (
                            <div
                                key={i}
                                className={'move-token' + (vikingMove.current - i > 0 ? ' active' : '')}
                            ></div>
                        ))}
                    </span>
                    <hr />
                    <span className="action-token-container">
                        {_.times(vikingAction.max, (i) => (
                            <div
                                key={i}
                                className={'action-token' + (vikingAction.current - i > 0 ? ' active' : '')}
                            ></div>
                        ))}
                    </span>
                </div>
                <hr />
                <div className="equipment-container">
                    <ItemDisplay item={vikingData.weapon[0]} tooltipId="first-weapon-tooltip" emptyClassName="equipment-item" itemType="equipment" />
                    <ItemDisplay item={vikingData.weapon[1]} tooltipId="second-weapon-tooltip" emptyClassName="equipment-item" itemType="equipment" />
                    <ItemDisplay item={vikingData.armor[0]} tooltipId="armor-tooltip" emptyClassName="armor-item" itemType="armor" />
                </div>
                <div className="rune-container">
                    <ItemDisplay item={vikingData.rune[0]} tooltipId="first-rune-tooltip" emptyClassName="rune-item" itemType="rune" />
                    <ItemDisplay item={vikingData.rune[1]} tooltipId="second-rune-tooltip" emptyClassName="rune-item" itemType="rune" />
                    <ItemDisplay item={vikingData.rune[2]} tooltipId="third-rune-tooltip" emptyClassName="rune-item" itemType="rune" />
                </div>
            </div>
        </div>
    );
}

export default HeroDisplayComponent;