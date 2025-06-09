import GoblinStore from '../Store/Goblin.store';

describe('Goblin.store actions', () => {
  beforeEach(() => {
    GoblinStore.setState({ gang: [], isShowDefeatedPopup: false });
  });

  test('addGoblin adds a goblin', () => {
    GoblinStore.getState().addGoblin({ position: { x: 0, y: 0 } });
    expect(GoblinStore.getState().gang).toHaveLength(1);
  });

  test('killGoblinByIdx removes the goblin', () => {
    GoblinStore.getState().addGoblin({ position: { x: 0, y: 0 } });
    GoblinStore.getState().addGoblin({ position: { x: 1, y: 1 } });
    GoblinStore.getState().killGoblinByIdx(0);
    expect(GoblinStore.getState().gang).toHaveLength(1);
    expect(GoblinStore.getState().gang[0].position).toEqual({ x: 1, y: 1 });
  });

  test('movement updates goblin position', () => {
    GoblinStore.getState().addGoblin({ position: { x: 1, y: 1 } });
    GoblinStore.getState().moveUp(0);
    expect(GoblinStore.getState().gang[0].position).toEqual({ x: 1, y: 0 });
    GoblinStore.getState().moveRight(0);
    expect(GoblinStore.getState().gang[0].position).toEqual({ x: 2, y: 0 });
    GoblinStore.getState().moveDown(0);
    expect(GoblinStore.getState().gang[0].position).toEqual({ x: 2, y: 1 });
    GoblinStore.getState().moveLeft(0);
    expect(GoblinStore.getState().gang[0].position).toEqual({ x: 1, y: 1 });
  });

  test('popup actions toggle flag', () => {
    GoblinStore.getState().showDefeatedPopup();
    expect(GoblinStore.getState().isShowDefeatedPopup).toBe(true);
    GoblinStore.getState().closeDefeatedPopup();
    expect(GoblinStore.getState().isShowDefeatedPopup).toBe(false);
  });
});
