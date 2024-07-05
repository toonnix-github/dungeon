import _ from "lodash";
import DiceStore from "../../Store/Dice.store";
import GameStateStore, { FightPhaseEnum } from "../../Store/GameState.store";
import { MonsterDiceComponent } from "./MonsterDiceComponent";

export default function GoblinCardComponent({ goblin }) {
    const diceStore = DiceStore((state) => state);
    const totalDiceScore = DiceStore((state) => state.diceScore.main + state.diceScore.add1 + state.diceScore.add2);
    const gameState = GameStateStore((state) => state);

    return (
        <div className={`card-item goblin-card ${goblin.id}-card portrait-card`}>
            <div className="cross-sign"></div>
            <div className="card-row name-row">{goblin.name}</div>

            <i className="card-type-icon" />
            <div className="move-container">
                <div className="move-number">{goblin.move}</div>
                <i className="move-icon" />
            </div>
            <div className="card-row skill-row">
                <div className="range-number">{goblin.attack.range > 0 && goblin.attack.range}</div>
                {goblin.attack.range > 0 && goblin.attack.type[0] === 'range' && <i className="icon-badge icon-in-detail range-location-icon" />}
                {goblin.attack.range > 0 && goblin.attack.type[0] === 'magic' && <i className="icon-badge icon-in-detail magic-location-icon" />}
                {goblin.attack.range > 0 && goblin.attack.type[0] === 'bomb' && <i className="icon-badge icon-in-detail bomb-location-icon" />}
                {goblin.attack.range === 0 && <i className="icon-badge icon-in-detail same-location-icon" />}
                <i className="icon-in-detail icon-skill icon-windwalk" />
            </div>
            {gameState.fightPhase.number === 1 && <MonsterDiceComponent isDiceShaking={diceStore.isShaking} />}
            <div className="card-row top-row">
                <i className="icon-counter-attack icon-in-detail icon-badge" />
                {goblin.counterAttack.damage > 0 ? <>
                    <i className="icon-in-detail icon-monster-dice" /> +{goblin.counterAttack.damage}
                    {(!_.isUndefined(goblin.counterAttack.bonusPerGoblin) && goblin.counterAttack.bonusPerGoblin > 0) &&
                        <>+({goblin.counterAttack.bonusPerGoblin}x<i className={`icon-in-detail icon-goblin`} />)</>} [{goblin.counterAttack.type.map((type, index) => <i key={index} className={`icon-in-detail icon-${type}`} />)}]
                </> : 'N/A'}
            </div>
            <div className="card-row middle-row">
                <i className="icon-attack icon-in-detail icon-badge" />
                {goblin.attack.damage > 0 ? <>
                    {goblin.attack.damage}
                    {(!_.isUndefined(goblin.attack.bonusPerGoblin) && goblin.attack.bonusPerGoblin > 0) &&
                        <>+({goblin.attack.bonusPerGoblin}x<i className={`icon-in-detail icon-goblin`} />)</>}
                    &nbsp;[<i className={`icon-in-detail icon-attack-type icon-${goblin.attack.type}`} />]
                </> : 'N/A'}
            </div>
            <div className="card-row bottom-row">
                <i className="icon-in-detail icon-defeat-goblin icon-badge" />
                {goblin.rewards.map((reward, index) =>
                    <i key={`treasure-${index}`} className={`icon-in-detail icon-reward-${reward}`} />
                )}
                <div className={
                    `heart-score` +
                    `${gameState.fightPhase.number === 6 ? ' attack-animation' : ''}` +
                    `${gameState.monsterHeartBroken ? ' broken' : ''}`
                }>
                    {gameState.fightPhase.number <= 5 && goblin.health}
                    {gameState.fightPhase.number >= 6 && ((gameState.netAttackValue - goblin.defense < goblin.health) ? (goblin.health - gameState.netAttackValue - goblin.defense) : '0')}
                    <div className={`damage-amount` +
                        `${gameState.fightPhase.number === 6 ? ' take-attack-right-animation' : ''}`}
                    >
                        -{gameState.netAttackValue - goblin.defense}
                    </div>
                </div>
                <div className={
                    `defend-power` +
                    `${gameState.fightPhase.number === 4 ? ' attack-animation' : ''}` +
                    `${gameState.monsterShieldBroken ? ' broken' : ''}`
                }>
                    {gameState.fightPhase.number <= 3 && goblin.defense}
                    {gameState.fightPhase.number >= 4 && ((gameState.netAttackValue < goblin.defense) ? (goblin.defense - gameState.netAttackValue) : '0')}
                    <div className={`damage-amount` +
                        `${gameState.fightPhase.number === 4 ? ' take-attack-right-animation' : ''}`}
                    >
                        -{gameState.netAttackValue < goblin.defense ? gameState.netAttackValue : goblin.defense}
                    </div>
                </div>
            </div>
        </div>
        // <div className={`goblin-tooltip ${goblin.id}-tooltip` +
        //     `${gameState.fightPhase.number >= 10 ? ' take-damage-monster-animation' : ''}`
        // } >
        //     <div />
        //     <div className="goblin-tooltip-content">
        //         <div className="goblin-tooltip-name">{goblin.name}</div>
        //         <div className="goblin-tooltip-row goblin-tooltip-description">
        //             {goblin.description}
        //         </div>
        //         {goblin.skill && <div className="goblin-tooltip-row goblin-tooltip-description">
        //             {goblin.skill}
        //         </div>}
        //         <div className="goblin-tooltip-row prize">
        //             <i className="icon-defeat-goblin" />:
        //             {(goblin.rewards.map((reward) => {
        //                 if (reward.get === 'item') {
        //                     return _.times(reward.amount, (reward_index) => <i key={`treasure-${reward_index}`} className={`icon-treasure-bag`} />);
        //                 } else if (reward.get === 'health') {
        //                     return _.times(reward.amount, (reward_index) => <i key={`health-${reward_index}`} className={`icon-reward-health`} />);
        //                 } else if (reward.get === 'bomb') {
        //                     return _.times(reward.amount, (reward_index) => <i key={`bomb-${reward_index}`} className={`icon-bomb`} />);
        //                 }
        //             }))}
        //         </div>
        //         <i className={`icon-health ${gameState.fightPhase.number >= 10 ? 'take-damage-health-animation' : ''}`} />
        //         <div className="action-panel attack-panel">
        //             <i className="icon-attack-action action-sign" />
        //             {goblin.attack.damage > 0 ? <>
        //                 {goblin.attack.damage}
        //                 {(!_.isUndefined(goblin.attack.bonusPerGoblin) && goblin.attack.bonusPerGoblin > 0) &&
        //                     <>+({goblin.attack.bonusPerGoblin}x<i className={`icon icon-goblin`} />)</>}
        //                 [<i className={`icon-attack-type icon-${goblin.attack.type}`} />]
        //             </> : 'N/A'}
        //         </div>
        //         <div className="action-panel counter-attack-panel">
        //             <i className="icon-counter-attack-action action-sign" />
        //             {goblin.counterAttack.damage > 0 ? <>
        //                 <i className="icon-dice" />+{goblin.counterAttack.damage}
        //                 {(!_.isUndefined(goblin.counterAttack.bonusPerGoblin) && goblin.counterAttack.bonusPerGoblin > 0) &&
        //                     <>+({goblin.counterAttack.bonusPerGoblin}x<i className={`icon icon-goblin`} />)</>}[{goblin.counterAttack.type.map((type, index) => <i key={index} className={`icon-attack-type icon-${type}`} />)}]
        //             </> : 'N/A'}
        //         </div>
        //         <div className="action-panel move-panel">
        //             {goblin.move}<i className="icon-move"></i>
        //             <i className="icon-monster-action action-sign" />
        //             <span className="monster-action-range">{goblin.monsterAction.range}</span>
        //             <i className="icon-tiles" />
        //             <i className="arrow-right" />
        //             <i className="icon-hero" /> :
        //             {goblin.monsterAction.type === 'ATTACK_ONLY' ? <i className="icon-attack" /> : ''}
        //             {goblin.monsterAction.type === 'MOVE_ONLY' ? <i className="icon-move" /> : ''}
        //             {goblin.monsterAction.type === 'MOVE_OR_ATTACK' ? <> <i className="icon-move" /> / <i className="icon-attack" /></> : ''}
        //             {goblin.monsterAction.type === 'MOVE_AND_ATTACK' ? <> <i className="icon-move" /> + <i className="icon-attack" /></> : ''}
        //         </div>
        //         <div className={`defend-power` +
        //             `${gameState.fightPhase.number > 0 ? ' prepare-to-fight' : ''}` +
        //             `${gameState.fightPhase.number === 4 ? ' take-damage-animation' : ''}` +
        //             `${gameState.fightPhase.number >= 5 ? ' gone-animation' : ''}`}
        //         >
        //             <span className="value">
        //                 {gameState.fightPhase.number <= 4 && goblin.defense}
        //                 {gameState.fightPhase.number >= 5 && ((gameState.netAttackValue < goblin.defense) ? (goblin.defense - gameState.netAttackValue) : '0')}
        //             </span>
        //         </div>
        //     </div>
        // </div>
    );
}
