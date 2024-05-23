import { useEffect } from "react";
import { useState } from "react";
import roomStore from "../../Store/Room.store";
import "./Goblin.scss";
import { Tooltip } from "react-tooltip";
import _ from "lodash";


export default GoblinComponent;

function GoblinComponent({ index, goblin }) {
    const [goblinOffset, setGoblinOffset] = useState({ top: 0, left: 0 });
    const roomData = roomStore(state => state.rooms[goblin.position.y][goblin.position.x]);
    const popupId = `${goblin.id}-${crypto.randomUUID().substring(0, 8)}`;

    useEffect(() => {
        setGoblinOffset({ top: roomData.offset.bottom, left: roomData.offset.right });
    }, [goblin.position]);
    return (
        <div key={index} className="avatar-goblin"
            data-tooltip-id={popupId}
            style={{ top: (goblinOffset.top - 40), left: (goblinOffset.left - 40) }}
        >
            <Tooltip id={popupId} className={`goblin-tooltip ${goblin.id}-tooltip`}
                opacity={0.9}
                style={{ maxWidth: '500px', padding: '5px', aspectRatio: '5/3' }}
                clickable={true}
                delayHide={99999999}
            >
                <div />
                <div className="goblin-tooltip-content">
                    <div className="goblin-tooltip-name">{goblin.name}</div>
                    <div className="goblin-tooltip-row goblin-tooltip-description">
                        {goblin.description}
                    </div>
                    <div className="goblin-tooltip-row prize">
                        <i className="icon-prize" />
                        {
                            (goblin.rewards.map((reward, index) => {
                                if (reward.get === 'item') {
                                    return _.times(reward.amount, () => <i key={index} className={`icon-treasure-bag`} />);
                                } else if (reward.get === 'health') {
                                    return <i key={index} className={`icon-health`}>{reward.amount}</i>;
                                } else if (reward.get === 'bomb') {
                                    return _.times(reward.amount, () => <i key={index} className={`icon-bomb`} />);
                                }
                            }))
                        }
                    </div>
                    <i className="icon-health" />
                    <div className="action-panel attack-panel">
                        <i className="icon-attack-action action-sign" />
                        {goblin.attack.damage > 0 ? <>
                            {(!_.isUndefined(goblin.attack.bonusPerGoblin) && goblin.attack.bonusPerGoblin > 0) &&
                                <>+({goblin.attack.bonusPerGoblin}x<i className={`icon icon-goblin`} />)</>
                            }
                            [<i className={`icon-attack-type icon-${goblin.attack.type}`} />]
                        </> : 'N/A'}
                    </div>
                    <div className="action-panel counter-attack-panel">
                        <i className="icon-counter-attack-action action-sign" />
                        {goblin.counterAttack.damage > 0 ? <>
                            <i className="icon-dice" />+{goblin.counterAttack.damage}
                            {(!_.isUndefined(goblin.counterAttack.bonusPerGoblin) && goblin.counterAttack.bonusPerGoblin > 0) &&
                                <>+({goblin.counterAttack.bonusPerGoblin}x<i className={`icon icon-goblin`} />)</>
                            }[{goblin.counterAttack.type.map((type, index) => <i key={index} className={`icon-attack-type icon-${type}`} />)}]
                        </> : 'N/A'}
                    </div>
                    <div className="action-panel move-panel">
                        {goblin.move}<i className="icon-move"></i>
                        <i className="icon-monster-action action-sign" />
                        <span className="monster-action-range">{goblin.monsterAction.range}</span>
                        <i className="icon-tiles" />
                        <i className="arrow-right" />
                        <i className="icon-hero" /> :
                        {goblin.monsterAction.type === 'ATTACK_ONLY' ? <i className="icon-attack" /> : ''}
                        {goblin.monsterAction.type === 'MOVE_ONLY' ? <i className="icon-move" /> : ''}
                        {goblin.monsterAction.type === 'MOVE_OR_ATTACK' ? <> <i className="icon-move" /> / <i className="icon-attack" /></> : ''}
                        {goblin.monsterAction.type === 'MOVE_AND_ATTACK' ? <> <i className="icon-move" /> + <i className="icon-attack" /></> : ''}
                    </div>
                    <div className="defend-power">{goblin.defense}</div>
                </div>
            </Tooltip >
        </div >
    );
}