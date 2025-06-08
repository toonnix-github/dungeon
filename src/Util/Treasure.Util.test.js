import TreasureStore from '../Store/Treasure.store';
import treasureDeck from '../Assets/Treasure';

describe('getRandomTreasure', () => {
  beforeEach(() => {
    TreasureStore.getState().updateDeck([...treasureDeck]);
    jest.resetModules();
  });

  test('removes one item from the deck', () => {
    const TreasureUtil = require('./Treasure.Util').default;
    const initialLength = TreasureStore.getState().deck.length;
    TreasureUtil.getRandomTreasure();
    const finalLength = TreasureStore.getState().deck.length;
    expect(finalLength).toBe(initialLength - 1);
  });
});
