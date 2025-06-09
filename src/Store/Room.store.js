import { create } from 'zustand';

const initRoomNumbers = [];
for (let i = 1; i <= 12; i++) {
  initRoomNumbers.push(i);
}

function createMatrix(rows, columns) {
  const matrix = {};

  for (let row = 0; row < rows; row++) {
    matrix[row] = {};

    for (let col = 0; col < columns; col++) {
      matrix[row][col] = {
        roomId: row + '-' + col
      };
    }
  }

  return matrix;
}

const initialRoomData = createMatrix(7, 7);
initialRoomData[3][3] = {
  ...initialRoomData[3][3],
  id: 0,
  name: 'Entrance',
  exit: {
    top: true,
    bottom: true,
    left: true,
    right: true
  }
};

const roomStore = create((set) => ({
  rooms: initialRoomData,
  assignRoom: (roomRow, roomColumn, roomData) => set((state) => ({
    rooms: {
      ...state.rooms,
      [roomRow]: {
        ...state.rooms[roomRow],
        [roomColumn]: {
          ...state.rooms[roomRow][roomColumn],
          ...roomData
        }
      }
    }
  })),
  setOffset: (roomRow, roomColumn, offset) => set((state) => ({
    rooms: {
      ...state.rooms,
      [roomRow]: {
        ...state.rooms[roomRow],
        [roomColumn]: {
          ...state.rooms[roomRow][roomColumn],
          offset: offset
        }
      }
    }
  })),
  solveRoomStatus: (roomRow, roomColumn) => set((state) => ({
    rooms: {
      ...state.rooms,
      [roomRow]: {
        ...state.rooms[roomRow],
        [roomColumn]: {
          ...state.rooms[roomRow][roomColumn],
          solved: true
        }
      }
    }
  })),
  dispatchGoblin: (roomRow, roomColumn) => set((state) => ({
    rooms: {
      ...state.rooms,
      [roomRow]: {
        ...state.rooms[roomRow],
        [roomColumn]: {
          ...state.rooms[roomRow][roomColumn],
          foundGoblin: false
        }
      }
    }
  })),
  resetAll: () => set(() => ({ rooms: initialRoomData }))
}));

export default roomStore;
