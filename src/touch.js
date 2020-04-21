import { touch } from './constants.js';

const createTouchController = () => {

    let lastEvent = null;
    const onClick = (evt) => {
        const leftClick = evt.targetTouches[0].clientX
            < evt.target.width / 2; 

        if(leftClick) {
            lastEvent = touch.LEFT; 
        } else {
            lastEvent = touch.RIGHT;;
        }
    };

    const getEvent = () => {
        const evt = lastEvent;
        lastEvent = null;
        return evt;
    };

    return {
        onClick,
        getEvent
    };
};

export default createTouchController;
