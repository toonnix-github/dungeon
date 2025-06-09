import ItemCard from './ItemCard.component';
import VikingStore from '../Store/Viking.store';
import roomStore from '../Store/Room.store';
import { useState } from 'react';
import _ from 'lodash';
import Modal from 'react-bootstrap/Modal';
import LootPopupStore from './../Store/LootPopup.store';
import { CurrentItemStateENUM } from '../Store/WinRewards.store';
import WinRewardsStore from '../Store/WinRewards.store';

function LootPopup() {
    const vikingPosition = VikingStore((state) => state.position);
    const vikingWeapon = VikingStore((state) => state.weapon);
    const vikingRune = VikingStore((state) => state.rune);
    const vikingArmor = VikingStore((state) => state.armor);
    const updateWeapon = VikingStore((state) => state.updateWeapon);
    const updateRune = VikingStore((state) => state.updateRune);
    const updateArmor = VikingStore((state) => state.updateArmor);
    const solveRoomStatus = roomStore((state) => state.solveRoomStatus);
    const lootPopupStore = LootPopupStore((state) => state);
    const winRewards = WinRewardsStore((state) => state);

    const [removeIndex, setRemoveIndex] = useState(null);

    const confimrDecision = (removeIndex) => {
        let updatedItemInHands = [...itemOnHand, lootPopupStore.newFoundLoot];
        updatedItemInHands.splice(removeIndex, 1);
        switch (lootPopupStore.newFoundLoot.type) {
            case 'weapon':
                updateWeapon(updatedItemInHands);
                break;
            case 'rune':
                updateRune(updatedItemInHands);
                break;
            default:
                updateArmor(updatedItemInHands);
                break;
        }

        setRemoveIndex(null);
        lootPopupStore.closePopup();
        lootPopupStore.resetNewFoundLoot();
        solveRoomStatus(vikingPosition[0], vikingPosition[1]);
        if (winRewards.currentItemState === CurrentItemStateENUM.IS_ITEM) winRewards.setCurrentItemState(CurrentItemStateENUM.IS_DONE);
    };

    const lootIsWeapon = lootPopupStore.newFoundLoot.type === 'weapon';
    const lootIsRune = lootPopupStore.newFoundLoot.type === 'rune';
    const lootIsArmor = lootPopupStore.newFoundLoot.type === 'armor';
    const itemOnHand = lootIsWeapon ? [...vikingWeapon] : (lootIsRune ? [...vikingRune] : [...vikingArmor]);
    const itemLimit = lootIsWeapon ? 2 : (lootIsRune ? 3 : 1);

    const getNewItem = () => {
        if (lootIsWeapon) updateWeapon([...vikingWeapon, lootPopupStore.newFoundLoot]);
        if (lootIsRune) updateRune([...vikingRune, lootPopupStore.newFoundLoot]);
        if (lootIsArmor) updateArmor([...vikingArmor, lootPopupStore.newFoundLoot]);
        lootPopupStore.closePopup();
        lootPopupStore.resetNewFoundLoot();
        lootPopupStore.end();
        solveRoomStatus(vikingPosition[0], vikingPosition[1]);
        if (winRewards.currentItemState === CurrentItemStateENUM.IS_ITEM) winRewards.setCurrentItemState(CurrentItemStateENUM.IS_DONE);

    };

    return (
        <Modal centered contentClassName='card-modal' show={lootPopupStore.isShowPopup} size="lg">
            <Modal.Body>

                {(
                    (lootIsWeapon && vikingWeapon.length < 2)
                    ||
                    (lootIsRune && vikingRune.length < 3)
                    ||
                    (lootIsArmor && vikingArmor.length < 1)
                )
                    ?
                    <>
                        <div className="popup-title">You got a new {(lootPopupStore.newFoundLoot.type).toUpperCase()}!!</div>
                        <div className="card-container new-card-container">
                            <i></i>
                            <ItemCard weaponIndex={null} itemDetail={lootPopupStore.newFoundLoot} />
                            <i></i>
                        </div>
                        <div className="popup-button">
                            <button className="confirm-button" onClick={() => getNewItem()}>
                                THX! I'll take it
                            </button>
                        </div>
                    </>
                    :
                    <>
                        <div className="popup-title">
                            {lootIsWeapon && <span>You got a new WEAPON!!, BUT you have only 2 hands!</span>}
                            {lootIsRune && <span>You got a new RUNE!!, BUT your storage is full now, pick only 3!</span>}
                            {lootIsArmor && <span>You got a new ARMOR!!, BUT you already have 1, pick only 1!</span>}
                        </div>
                        <div className={`card-container ${lootPopupStore.newFoundLoot.type}-container`}>
                            {[...itemOnHand, lootPopupStore.newFoundLoot].map((lootDetail, index) => (
                                <div className="relative-frame" key={index}>
                                    <ItemCard needToDiscard={true} weaponIndex={index} setRemoveIndex={setRemoveIndex} itemDetail={lootDetail} removeIndex={removeIndex} />
                                    {index === itemLimit && <i className="new-icon"></i>}
                                </div>
                            ))}
                        </div>
                        {_.isNumber(removeIndex) &&
                            <div className="popup-button">
                                <button className="confirm-button" onClick={() => confimrDecision(removeIndex)}>Confirm</button>
                            </div>
                        }
                    </>
                }
            </Modal.Body>
        </Modal>
    );
}

export default LootPopup;
