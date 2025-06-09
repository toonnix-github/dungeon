import { useEffect, useState } from "react";
import _ from "lodash";
import './WinRewards.scss'
import LootPopupStore from "../Store/LootPopup.store";
import treasureUtil from '../Util/Treasure.Util';
import { Button, Modal } from "react-bootstrap";
import WinRewardsStore, { CurrentItemStateENUM, WinRewardsStaeENUM } from "../Store/WinRewards.store";

export default function WinRewardsComponent() {
    const winRewards = WinRewardsStore((state) => state);
    const lootPopupStore = LootPopupStore((state) => state);

    const [isShowRewardPopup, setIsShowRewardPopup] = useState(false);

    const getRandomItemAndOpenPopup = () => {
        setIsShowRewardPopup(false);
        const itemFromTreasure = treasureUtil.getRandomTreasure();
        lootPopupStore.setNewFoundLoot(itemFromTreasure);
        lootPopupStore.showPopup();
    };

    useEffect(() => {
        if (winRewards.currentItemState === CurrentItemStateENUM.IS_DONE) {
            winRewards.setCurrentItemState(CurrentItemStateENUM.IS_NOT_ITEM);
            winRewards.shiftReward();
        }
    }, [winRewards.currentItemState]);

    useEffect(() => {
        if (winRewards.state === WinRewardsStaeENUM.START && winRewards.rewards.length === 0) {
            winRewards.setEnd();
        }
        if (_.isArray(winRewards.rewards) && winRewards.rewards.length > 0) {
            if (winRewards.rewards[0] === 'item') {
                winRewards.setCurrentItemState(CurrentItemStateENUM.IS_ITEM);
                setIsShowRewardPopup(true);
            } else {
                setIsShowRewardPopup(true);
                setTimeout(() => {
                    winRewards.shiftReward();
                    setIsShowRewardPopup(false);
                }, 1500);
            }
        }
    }, [winRewards.rewards]);

    if (_.isArray(winRewards.rewards) && winRewards.rewards.length > 0) {
        if (winRewards.rewards[0] === 'item') {
            return (
                <Modal className="reward-popup" show={isShowRewardPopup}>
                    <Button onClick={getRandomItemAndOpenPopup}>
                        get Free Item
                    </Button>
                </Modal>
            )
        } else {
            return (
                <Modal className="reward-popup" show={isShowRewardPopup}>
                    {winRewards.rewards[0]}
                </Modal>
            )
        }
    } else {
        return (
            <div />
        )
    }





    // if (winRewards.rewards.length > 0) {
    //     if (winRewards[0] === 'item') {
    //         setTimeout(() => {
    //             winRewards.shiftReward();
    //         }, 1000);
    //         return (
    //             <div className="reward-popup">ITEM</div>
    //         );
    //     } else if (winRewards[0] === 'health') {
    //         setTimeout(() => {
    //             winRewards.shiftReward();
    //         }, 1000);
    //         return (
    //             <div className="reward-popup">HEALTH</div>
    //         )
    //     }
    // }
}

