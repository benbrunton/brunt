import createGame from './game.js';
import { keys, touch } from './constants.js';

const defaultSettings = {
    width: 400,
    height: 400,
    frameLimit: 1000 / 60,
    blockSize: 10
};

const brunt = (settings = defaultSettings) => {
    return createGame(settings);
};


brunt.keys = keys;
brunt.touch = touch;

brunt.attach = (targetId, game) => {
    const target = document.getElementById(targetId);
    game.create(target);
};


export default brunt;
