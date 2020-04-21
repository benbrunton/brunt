import createView from './view.js';
import createLoop from './loop.js';
import createControls from './controls.js';
import { getSymbolMap } from './utils.js';

const createGame = (settings) => {
    let _model = null;
    let controlsMap = {};
    let viewsMap = {};
    const {width, height, frameLimit} = settings;

    const loop = createLoop(frameLimit);

    const model = (m) => {
        _model = m;
    };

    const create = (target) => {
        const _controls = createControls(controlsMap);
        const _view = createView(viewsMap, { width, height });

        const canvas = _view.getCanvas();
        target.appendChild(canvas);

        _controls.initListeners(canvas);

        loop.start(() => {
            const state = _model.getState();
            const actions = _controls.getActions(state.mode);
            _model.handleActions(actions);
            _view.render(state);
            _model.tick();
        });
    };

    const getActions = (actionList) => {
        const actions = getSymbolMap(actionList);
        const get = (label) => {
            return actions[label];
        };
        return { get };
    };

    const getModes = (modeList) => {
        const modes = getSymbolMap(modeList);
        const get = (label) => {
            return modes[label];
        };
        return { get };
    };


    const addControlsMap = (mode, map) => {
        if(!map) {
            map = mode;
            mode = 'default';
        }

        controlsMap[mode] = map;
    };

    const addView = (mode, view) => {
        if(!view) {
            view = mode;
            mode = 'default';
        }

        viewsMap[mode] = view;
    };


    return {
        create,
        model,
        getActions, 
        getModes,
        addControlsMap,
        addView
    };
};

export default createGame;
