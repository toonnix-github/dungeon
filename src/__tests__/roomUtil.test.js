import { getRandomRoom } from '../Util/Room.Util';

describe('getRandomRoom', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('returns unique rooms until deck is empty', () => {
    const { getRandomRoom } = require('../Util/Room.Util');
    const ids = new Set();
    for (let i = 0; i < 12; i++) {
      const room = getRandomRoom();
      ids.add(room?.id);
    }
    expect(ids.size).toBe(12);
  });

  test('returns undefined when deck is empty', () => {
    const { getRandomRoom } = require('../Util/Room.Util');
    for (let i = 0; i < 12; i++) {
      getRandomRoom();
    }
    const result = getRandomRoom();
    expect(result).toBeUndefined();
  });
});
