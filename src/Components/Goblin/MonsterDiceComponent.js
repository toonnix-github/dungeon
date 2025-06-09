export const MonsterDiceComponent = ({ isDiceShaking, diceNumber }) => {
    return (
        <div className={`dice-item monster-dice-container${isDiceShaking ? ' shaking' : ''}`}> 
            {diceNumber !== undefined && <span className="dice-number">{diceNumber}</span>}
        </div>
    );
};

