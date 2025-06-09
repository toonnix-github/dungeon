import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import HeroActionComponent from '../Components/HeroAction.component';
import VikingStore from '../Store/Viking.store';
import roomStore from '../Store/Room.store';
import DiceStore from '../Store/Dice.store';
import LootPopupStore from '../Store/LootPopup.store';

const originalViking = VikingStore.getState();
const originalRooms = roomStore.getState().rooms;
const originalDice = DiceStore.getState();
const originalLoot = LootPopupStore.getState();

afterEach(() => {
  act(() => {
    VikingStore.setState(originalViking, true);
    roomStore.setState({ rooms: originalRooms });
    DiceStore.setState(originalDice, true);
    LootPopupStore.setState(originalLoot, true);
  });
});

describe('HeroActionComponent', () => {
  test('treasure action displays popup and consumes action', async () => {
    await act(async () => {
      VikingStore.setState({
        ...originalViking,
        position: [0, 0],
        action: { current: 2, max: 5 },
      }, true);
      roomStore.getState().assignRoom(0, 0, {
        isTreasureRoom: true,
        isTrapRoom: false,
        requirePower: 'attack',
        requireAmount: 1,
        solved: false,
      });
      DiceStore.setState({ isShowPopup: false });
    });

    const { container } = render(<HeroActionComponent />);
    const openChest = container.querySelector('.open-chest-action');
    expect(openChest).toBeInTheDocument();

    await userEvent.click(openChest);

    await screen.findByRole('dialog');
    expect(DiceStore.getState().isShowPopup).toBe(true);
    expect(document.querySelector('.treasure-popup')).toBeInTheDocument();

    const rollButton = document.querySelector('.roll-button');
    expect(rollButton).toBeInTheDocument();

    const beforeAction = VikingStore.getState().action.current;
    await userEvent.click(rollButton);
    expect(VikingStore.getState().action.current).toBe(beforeAction - 1);
  });

  test('trap room shows popup automatically', async () => {
    await act(async () => {
      VikingStore.setState({
        ...originalViking,
        position: [0, 1],
        isMoveDone: true,
      }, true);
      roomStore.getState().assignRoom(0, 1, {
        isTrapRoom: true,
        isTreasureRoom: false,
        requirePower: 'attack',
        requireAmount: 1,
        solved: false,
        punishment: 1,
      });
      DiceStore.setState({ isShowPopup: false });
    });

    render(<HeroActionComponent />);

    await screen.findByRole('dialog');
    expect(DiceStore.getState().isShowPopup).toBe(true);
    expect(document.querySelector('.trap-popup')).toBeInTheDocument();
    expect(document.querySelector('.roll-button')).toHaveTextContent('Disarm the trap');
  });
});
