import roomInformationList from '../Assets/Room';

let roomsDeck = Array.from({ length: 72 }, (_, index) => index + 1);

export const getRandomRoom = () => {
    let randomNum = 0;
    if (roomsDeck.length > 0) {
        const randomIndex = Math.floor(Math.random() * roomsDeck.length);
        randomNum = roomsDeck[randomIndex];

        roomsDeck = roomsDeck.filter((num) => num !== randomNum);
    }
    return roomInformationList[randomNum];
};

export const RevealMethodENUM = {
    VISION: 'byVision',
    HERO_MOVE: 'byHeroMove'
};

export const oppositeDirection = (direction) => {
    const opposites = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' };
    return opposites[direction];
};