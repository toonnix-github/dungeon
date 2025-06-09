import PropTypes from 'prop-types';

export const MonsterDiceComponent = ({ isDiceShaking }) => {
    return <div className={`dice-item monster-dice-container` + `${isDiceShaking ? ' shaking' : ''}`}></div>;
};

MonsterDiceComponent.propTypes = {
    isDiceShaking: PropTypes.bool,
};

MonsterDiceComponent.defaultProps = {
    isDiceShaking: false,
};
