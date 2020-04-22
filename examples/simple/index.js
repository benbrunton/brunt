import brunt from '../../src/brunt.js';

const WIDTH = 400;
const HEIGHT = 400;
const FRAME_LIMIT = 1000 / 16;

const game = brunt({
    frameLimit: FRAME_LIMIT,
    width: WIDTH,
    height: HEIGHT
});

const actions = game.getActions([
    "BEGIN_GAME",
    "MOVE_RIGHT",
    "MOVE_LEFT",
    "MOVE_DOWN",
    "MOVE_UP",
    "ROTATE_LEFT",
    "ROTATE_RIGHT"
]);

const modes = game.getModes([
    "PREGAME",
    "GAME",
    "GAME_OVER"
]);

game.addControlsMap(modes.get("PREGAME"), {
    anyKey: actions.get("BEGIN_GAME"),
    anyTouch: actions.get("BEGIN_GAME")
});

game.addControlsMap(modes.get("GAME"), {
    keys: {
        [brunt.keys.ArrowLeft]: actions.get("MOVE_LEFT"),
        [brunt.keys.ArrowRight]: actions.get("MOVE_RIGHT"),
        [brunt.keys.ArrowDown]: actions.get("MOVE_DOWN"), 
        [brunt.keys.ArrowUp]: actions.get("MOVE_UP"), 
    },
    touch: {
        [brunt.touch.Left]: actions.get("MOVE_LEFT"),
        [brunt.touch.Right]: actions.get("MOVE_RIGHT") 
    }
});

const createModel = () => {
    let direction = 0;
    let mode = modes.get("PREGAME");

    const pos = { x: 10, y: 10 };

    const getState = () => ({
        mode,
        pos
    });

    const tick = () => {
        if(mode === modes.get("GAME")) {
            if(direction === 0){
                pos.x += 1;
            } else if(direction === 1){
                pos.x -= 1;
            } else if(direction === 2){
                pos.y -= 1;
            } else if(direction === 3){
                pos.y += 1;
            }

            if(pos.x < 0) {
                pos.x = WIDTH;
            } else if (pos.x > WIDTH) {
                pos.x = 0;
            }

            if(pos.y < 0) {
                pos.y = HEIGHT;
            } else if(pos.y > HEIGHT) {
                pos.y = 0;
            }
        }

    };

    const handleActions = (actionList) => {
        if(actionList.includes(actions.get("MOVE_LEFT"))){
            direction = 1;
        } else if(actionList.includes(actions.get("MOVE_RIGHT"))){
            direction = 0;
        } else if(actionList.includes(actions.get("MOVE_UP"))){
            direction = 2;
        } else if(actionList.includes(actions.get("MOVE_DOWN"))){
            direction = 3;
        }

        if(actionList.includes(actions.get("BEGIN_GAME"))){
            startGame();
        }
    };

    const startGame = () => {
        mode = modes.get("GAME");
    };

    return { tick, getState, handleActions };
};

game.model(createModel());

// View logic
game.addView(modes.get('GAME'), (draw, settings, state) => {
    draw.rectangle('#000000', 0, 0, WIDTH, HEIGHT);
    draw.circle('#FFFFFF', state.pos.x, state.pos.y, 10);
});

game.addView(modes.get('PREGAME'), (draw, settings, state) => {
    draw.rectangle('#000000', 0, 0, WIDTH, HEIGHT);
    draw.text(
        '#FFFFFF',
        '14px Arial',
        'press anywhere to begin',
        30,
        30
    );
});

brunt.attach('game-area', game);

