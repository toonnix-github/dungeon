import _ from "lodash";

export function GoblinDetailComponent({ goblin }) {
    return (
        <div className={`goblin-tooltip ${goblin.id}-tooltip`} >
            <div />
            <div className="goblin-tooltip-content">
                <div className="goblin-tooltip-name">{goblin.name}</div>
                <div className="goblin-tooltip-row goblin-tooltip-description">
                    {goblin.description}
                </div>
                {goblin.skill && <div className="goblin-tooltip-row goblin-tooltip-description">
                    {goblin.skill}
                </div>}
                <div className="goblin-tooltip-row prize">
                    <i className="icon-defeat-goblin" />:
                    {(goblin.rewards.map((reward) => {
                        if (reward.get === 'item') {
                            return _.times(reward.amount, (reward_index) => <i key={`treasure-${reward_index}`} className={`icon-treasure-bag`} />);
                        } else if (reward.get === 'health') {
                            return _.times(reward.amount, (reward_index) => <i key={`health-${reward_index}`} className={`icon-reward-health`} />);
                        } else if (reward.get === 'bomb') {
                            return _.times(reward.amount, (reward_index) => <i key={`bomb-${reward_index}`} className={`icon-bomb`} />);
                        }
                    }))}
                </div>
                <i className="icon-health" />
                <div className="action-panel attack-panel">
                    <i className="icon-attack-action action-sign" />
                    {goblin.attack.damage > 0 ? <>
                        {goblin.attack.damage}
                        {(!_.isUndefined(goblin.attack.bonusPerGoblin) && goblin.attack.bonusPerGoblin > 0) &&
                            <>+({goblin.attack.bonusPerGoblin}x<i className={`icon icon-goblin`} />)</>}
                        [<i className={`icon-attack-type icon-${goblin.attack.type}`} />]
                    </> : 'N/A'}
                </div>
                <div className="action-panel counter-attack-panel">
                    <i className="icon-counter-attack-action action-sign" />
                    {goblin.counterAttack.damage > 0 ? <>
                        <i className="icon-dice" />+{goblin.counterAttack.damage}
                        {(!_.isUndefined(goblin.counterAttack.bonusPerGoblin) && goblin.counterAttack.bonusPerGoblin > 0) &&
                            <>+({goblin.counterAttack.bonusPerGoblin}x<i className={`icon icon-goblin`} />)</>}[{goblin.counterAttack.type.map((type, index) => <i key={index} className={`icon-attack-type icon-${type}`} />)}]
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
        </div>
    );
}
