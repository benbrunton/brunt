import { keys } from './constants.js';

const createKeyboardController = () => {

    const keyRegister = {};

    const onKeyDown = (evt) => {
        if(evt.repeat) {
            return;
        }

        keyRegister[evt.code] = keys[evt.code];
    };

    const onKeyUp = (evt) => {
        delete keyRegister[evt.code];
    };

    const getKeys = () => {
        return Object.values(keyRegister);
    };

    return {
        onKeyDown,
        onKeyUp,
        getKeys,
    };
};

export default createKeyboardController;
