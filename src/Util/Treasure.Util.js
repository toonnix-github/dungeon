import TreasureStore from "../Store/Treasure.store";

const treasureDeck = TreasureStore.getState().deck;
const updateDeck = TreasureStore.getState().updateDeck;

class TreasureUtil {
    static getRandomTreasure = () => {
        let _treasureDeck = treasureDeck;
        let randomTreasure = {};
        if (_treasureDeck.length > 0) {
            const randomIndex = Math.floor(Math.random() * _treasureDeck.length);
            randomTreasure = _treasureDeck[randomIndex];
            updateDeck(_treasureDeck.splice(randomIndex, 1));
        }
        return randomTreasure;
    };
}

export default TreasureUtil;