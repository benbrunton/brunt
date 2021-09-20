import createKeyboardController from './keyboard.js';
import createTouchController from './touch.js';
import createDomButtonController from './domButton.js';

const createControls = (controlsMap) => {

    const keyboardController = createKeyboardController();
    const touchController = createTouchController();

    const allButtons = [];
    Object.values(controlsMap).forEach(({buttons = []}) => {
      buttons.forEach(b => allButtons.push(b[0]));
    });
    const domButtonController = createDomButtonController(
      allButtons
    );

    const initListeners = (canvas) => {
        window.addEventListener('keyup',
            keyboardController.onKeyUp);
        window.addEventListener(
            'keydown',
            keyboardController.onKeyDown
        );

        canvas.addEventListener('touchstart',
            touchController.onClick);

        domButtonController.listen();

    };

    const getActions = (mode) => {

        if(!mode) {
            mode = "default";
        }

        const touchEvent = touchController.getEvent();
        const keys = keyboardController.getKeys();
        const activeButtons = domButtonController.getActiveButtons();
        const map = controlsMap[mode];
        const currentActions = [];

        if(!map) {
            return currentActions;
        }

        if(map.anyKey && keys.length > 0) {
            currentActions.push(map.anyKey);
        }

        if(map.keys) {
            keys.map(key => map.keys[key])
                .filter(derivedAction => !!derivedAction)
                .forEach(derivedAction => {
                    currentActions.push(derivedAction);
                });
        }

        if(map.anyTouch && touchEvent !== null) {
            currentActions.push(map.anyTouch);
        }

        if(map.touch && touchEvent !== null) {
            currentActions.push(map.touch[touchEvent]);
        }

        map.buttons && map.buttons.filter(x => activeButtons.includes(x[0]))
          .forEach(x => currentActions.push(x[1]));

        return currentActions;
    };

    return { getActions, initListeners };
};

export default createControls;
