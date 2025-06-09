import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import WinRewardsStore from "../Store/WinRewards.store";
import _ from "lodash";
import './WinRewards.scss'
import LootPopupStore from "../Store/LootPopup.store";
import treasureUtil from '../Util/Treasure.Util';
import { Button, Modal } from "react-bootstrap";

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
        // console.log(winRewards.rewards);
        // let currentWinRewards = [...winRewards.rewards];
        if (_.isArray(winRewards.rewards) && winRewards.rewards.length > 0) {
            if (winRewards.rewards[0] === 'item') { setIsShowRewardPopup(true); }
            //     setTimeout(() => {
            //         currentWinRewards.shift();
            //         winRewards.setRewards(currentWinRewards);
            //     }, 1000);
        }
    }, [winRewards.rewards]);

    useEffect(() => { console.log(lootPopupStore); }, [lootPopupStore.isEnd])

    if (_.isArray(winRewards.rewards) && winRewards.rewards.length > 0) {
        if (winRewards.rewards[0] === 'item') {
            return (
                <Modal className="reward-popup" show={isShowRewardPopup}>
                    <Button onClick={getRandomItemAndOpenPopup}>
                        get Free Item
                    </Button>
                </Modal>
            )
        } else if (winRewards.rewards[0] === 'health') {
            return (
                <div className="reward-popup">
                    {winRewards.rewards[0]}
                </div>
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

WinRewardsComponent.propTypes = {};
