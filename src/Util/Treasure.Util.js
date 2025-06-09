import TreasureStore from "../Store/Treasure.store";

const treasureDeck = TreasureStore.getState().deck;
const updateDeck = TreasureStore.getState().updateDeck;

class TreasureUtil {
    static getRandomTreasure = () => {
        let _treasureDeck = treasureDeck;
        if (_treasureDeck.length > 0) {
            const randomIndex = Math.floor(Math.random() * _treasureDeck.length);
            const removed = _treasureDeck.splice(randomIndex, 1)[0];
            updateDeck([..._treasureDeck]);
            return removed;
        }
        return {};
    };
}

export default TreasureUtil;
