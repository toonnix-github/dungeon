import { saveGameState, loadGameState, applyGameState, resetGameState, resetStores } from '../Util/Storage.Util';
import VikingStore from '../Store/Viking.store';
import roomStore from '../Store/Room.store';

beforeEach(() => {
  resetGameState();
});

test('restores saved viking and room state', () => {
  VikingStore.setState((s) => ({ ...s, position: [1, 1], health: { current: 5, max: 10 } }));
  roomStore.getState().assignRoom(1, 1, { id: 42 });

  saveGameState();

  resetStores();

  expect(VikingStore.getState().position).toEqual([3, 3]);

  const saved = loadGameState();
  applyGameState(saved);

  expect(VikingStore.getState().position).toEqual([1, 1]);
  expect(VikingStore.getState().health.current).toBe(5);
  expect(roomStore.getState().rooms[1][1].id).toBe(42);
});
