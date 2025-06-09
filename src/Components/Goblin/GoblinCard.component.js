import _ from "lodash";
import DiceStore from "../../Store/Dice.store";
import GameStateStore, { FightPhaseEnum } from "../../Store/GameState.store";
import { MonsterDiceComponent } from "./MonsterDiceComponent";

export default function GoblinCardComponent({ goblin }) {
    const diceStore = DiceStore((state) => state);
    const totalDiceScore = DiceStore((state) => state.diceScore.main + state.diceScore.add1 + state.diceScore.add2);
    const gameState = GameStateStore((state) => state);

    console.log(goblin);

    if (!_.isUndefined(goblin)) {
        return (
            <div className={`card-item goblin-card ${goblin.id}-card portrait-card` +
                `${gameState.monsterHeartBroken ? ' die' : ''}`
            }>
                <div className={`cross-sign` +
                    `${gameState.monsterHeartBroken ? ' die-animation' : ''}`
                }></div>
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
                {(gameState.fightPhase.number === 1 || gameState.fightPhase === FightPhaseEnum.COUNTER_ATTACK) &&
                    <MonsterDiceComponent
                        isDiceShaking={diceStore.isShaking}
                        diceNumber={gameState.fightPhase === FightPhaseEnum.COUNTER_ATTACK ? gameState.counterAttackDice : undefined}
                    />}
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
        );
    }
}

