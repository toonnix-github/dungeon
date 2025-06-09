import React from 'react';
import PropTypes from 'prop-types';

const ItemCard = ({ itemDetail, setRemoveIndex, removeIndex, weaponIndex, needToDiscard }) => {
    const { name, description, attack, defend, effect, rarity, id, type } = itemDetail;

    const handleRemoveItem = () => {
        setRemoveIndex(removeIndex);
    };

    const handleDiscardItem = () => {
        setRemoveIndex(weaponIndex);
    };

    return (
        <div className={`item-card ${rarity} ${removeIndex === weaponIndex ? 'discard' : ''}`}>
            <div className="item-name">{name}</div>
            <div className={`item-image ${id}`}>
                {((removeIndex !== weaponIndex) && needToDiscard) && (
                    <button onClick={handleDiscardItem} className="discard-button">
                        Discard
                    </button>
                )}
            </div>
            <div className="item-type">{type}</div>
            <div className="item-description">
                {description}
                <hr />
                {attack > 0 && <div className="attack-value"><i className="attack-icon"></i>{attack}</div>}
                {defend > 0 && <div className="defend-value"><i className="defend-icon"></i>{defend}</div>}
                {effect && <div className="effect-value">{effect}</div>}
            </div>
            {(removeIndex === weaponIndex) && <div className="discard-mark"></div>}
        </div>
    );
};

ItemCard.propTypes = {
    itemDetail: PropTypes.object.isRequired,
    setRemoveIndex: PropTypes.func,
    removeIndex: PropTypes.number,
    weaponIndex: PropTypes.number,
    needToDiscard: PropTypes.bool,
};

ItemCard.defaultProps = {
    setRemoveIndex: () => { },
    removeIndex: null,
    weaponIndex: null,
    needToDiscard: false,
};

export default ItemCard;