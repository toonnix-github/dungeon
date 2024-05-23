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

    useEffect(() => {
        setGoblinOffset({ top: roomData.offset.bottom, left: roomData.offset.right });
    }, [goblin.position])
    return (
        <div key={index} className="avatar-goblin"
            data-tooltip-id={`goblin-tooltip`}
            style={{ top: (goblinOffset.top - 40), left: (goblinOffset.left - 40) }}
        >
            <Tooltip id={`goblin-tooltip`} className={`goblin-tooltip ${goblin.id}-tooltip`}
                opacity={0.9}
                style={{ maxWidth: '500px', padding: '5px', aspectRatio: '16/11' }}
                clickable={true}
            >
                <div />
                <div className="goblin-tooltip-content">
                    <div className="goblin-tooltip-name">{goblin.name}</div>
                    <div className="goblin-tooltip-row goblin-tooltip-description">
                        {goblin.description}
                    </div>
                    <div className="goblin-tooltip-row goblin-tooltip-attack">
                        <i className={`icon-attack`} title={'Attack'} />
                        : +{goblin.attack.damage} [<i className={`icon-attack-type icon-${goblin.attack.type}`} />]
                    </div>
                    <div className="goblin-tooltip-row goblin-tooltip-counter-attack">
                        <i className={`icon-counter-attack`} title={'Counter Attack'} />
                        : {goblin.counterAttack.damage}
                        {(!_.isUndefined(goblin.counterAttack.bonusPerGoblin) && goblin.counterAttack.bonusPerGoblin > 0) &&
                            <> + ({goblin.counterAttack.bonusPerGoblin}x<i className={`icon icon-goblin`} />)</>
                        }
                    </div>
                    <i className="icon-health" />
                    <div className="move-panel">
                        {goblin.move}<i className="icon-move"></i>
                        <i className="icon-monster-action" />
                        <span className="monster-action-range">{goblin.monsterAction.range}</span>
                        <i className="icon-tiles" />
                        <i className="arrow-right" />
                        <i className="icon-hero" /> :
                        {goblin.monsterAction.type === 'ATTACK_ONLY' ? <i className="icon-attack" /> : ''}
                        {goblin.monsterAction.type === 'MOVE_ONLY' ? <i className="icon-move" /> : ''}
                        {goblin.monsterAction.type === 'MOVE_OR_ATTACK' ? <> <i className="icon-move" /> / <i className="icon-attack" /></> : ''}
                        {goblin.monsterAction.type === 'MOVE_AND_ATTACK' ? <> <i className="icon-move" /> + <i className="icon-attack" /></> : ''}
                    </div>
                </div>
            </Tooltip >
        </div >
    )
}