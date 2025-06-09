import TreasureStore from '../Store/Treasure.store';
import treasureDeck from '../Assets/Treasure';

describe('getRandomTreasure', () => {
  beforeEach(() => {
    TreasureStore.getState().updateDeck([...treasureDeck]);
    jest.resetModules();
  });

  test('returns a treasure object', () => {
    const TreasureUtil = require('./Treasure.Util').default;
    const treasure = TreasureUtil.getRandomTreasure();
    expect(treasure).toBeTruthy();
  });
});
