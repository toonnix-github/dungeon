export const MonsterDiceComponent = ({ isDiceShaking }) => {
    return <div className={`dice-item monster-dice-container` + `${isDiceShaking ? ' shaking' : ''}`}></div>;
};

