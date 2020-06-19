import { keys } from './constants.js';

const createKeyboardController = () => {

    const keyRegister = {};
    let deleteQueue = [];

    const onKeyDown = (evt) => {
        if(evt.repeat) {
            return;
        }

        keyRegister[evt.code] = keys[evt.code];
    };

    const onKeyUp = (evt) => {
        deleteQueue.push(evt.code);
    };

    const getKeys = () => {
        const returnedKeys = Object.values(keyRegister);
        deleteQueue.forEach(code => delete keyRegister[code]);
        deleteQueue = [];
        return returnedKeys;
    };

    return {
        onKeyDown,
        onKeyUp,
        getKeys,
    };
};

export default createKeyboardController;
