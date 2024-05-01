function ItemCard({ itemDetail, setRemoveIndex, removeIndex, weaponIndex, needToDiscard }) {

    const discardThisWeapon = () => {
        setRemoveIndex(weaponIndex);
    }

    return (
        <>
            <div className={`item-card` + (removeIndex === weaponIndex ? ' discard' : '')}>
                <div className="item-name">{itemDetail.name}</div>
                <div className={`item-image ${itemDetail.id}`}></div>
                <div className="item-type">{itemDetail.type}</div>
                <div className="item-description">
                    {itemDetail.description}
                    <div className="attack-value"><i className="attack-icon"></i>{itemDetail.attack}</div>
                    <div className="defend-value"><i className="defend-icon"></i>{itemDetail.defend}</div>
                </div>
                {((removeIndex !== weaponIndex) && needToDiscard) && <button onClick={discardThisWeapon} className="discard-button">discard</button>}
            </div>
            {(removeIndex === weaponIndex) && <div className="discard-mark"></div>}
        </>

    )
}

export default ItemCard;