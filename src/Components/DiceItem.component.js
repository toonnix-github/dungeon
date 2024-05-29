import { useEffect } from "react";
import _ from "lodash";
import "./DiceItem.scss";

export const DiceItem = ({ isShaking, diceOrder, diceFace, totalDiceScore, selectDice }) => {
    useEffect(() => {
    }, [diceFace]);

    return (
        <>
            {diceFace ?
                <div
                    className={"dice-face" +
                        ((totalDiceScore > 0 && !diceFace.selected && diceFace.type !== 'add') ? ' effect-only' : '') +
                        (diceFace.selected ? ' selected' : '') +
                        (diceFace.effect === 'none' ? ' no-effect' : '') +
                        (((totalDiceScore === 0) || (totalDiceScore > 0 && !diceFace.selected && diceFace.type === 'add')) ? ' addable' : '')}
                    // if (!_.isUndefined(dice) && !dice.selected) {
                    //     if (totalDiceScore === 0) {
                    onClick={() => { ((totalDiceScore === 0) || (totalDiceScore > 0 && !diceFace.selected && diceFace.type === 'add')) && selectDice(diceOrder, diceFace.number); }}
                >
                    <span className="dice-number">{diceFace.string}</span>
                    <span className="effect-sign">
                        {diceFace.effect === 'action' &&
                            _.times(diceFace.effectPoint, (index) => <div key={`number_${diceOrder}_get${diceFace.number}point_effect_${diceFace.effectPoint}_index_${index}`} className={'action-token active'} />)}
                        {diceFace.effect === 'health' && <div className={'health-token'} />}
                        {diceFace.effect === 'none' && <div className={"non-token"} />}
                    </span>
                    {/* <i className={"dice-status"} /> */}
                    <i className={"add-icon"} />
                </div> :
                <div className={`dice-item ${isShaking ? 'shaking-' : ''}${diceOrder}`}></div>}
        </>
    );
};
