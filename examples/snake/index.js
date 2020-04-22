import brunt from '../../src/brunt.js';

import createSnake from './snake.js';

const WIDTH = 400;
const HEIGHT = 400;
const BLOCK_WIDTH = 10;
const FRAME_LIMIT = 1000 / 16;

const game = brunt({
    frameLimit: FRAME_LIMIT,
    width: WIDTH,
    height: HEIGHT,
    blockSize: BLOCK_WIDTH
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
        [brunt.touch.Left]: actions.get("ROTATE_LEFT"),
        [brunt.touch.Right]: actions.get("ROTATE_RIGHT") 
    }
});


game.model(
    createSnake(actions, modes, { 
        width: WIDTH / BLOCK_WIDTH,
        height: HEIGHT / BLOCK_WIDTH 
    })
);

// View logic

const BACKGROUND_COLOUR = '#000000';
const SNAKE_COLOUR = '#FFFFFF';
const APPLE_COLOUR = '#34B340';

game.addView(modes.get('GAME'), (draw, settings, state) => {

    draw.rectangle(BACKGROUND_COLOUR, 0, 0, WIDTH, HEIGHT);
    state.snake.forEach(block => {
        draw.rectangle(
            SNAKE_COLOUR,
            block.x * BLOCK_WIDTH + 1,
            block.y * BLOCK_WIDTH + 1,
            BLOCK_WIDTH - 2,
            BLOCK_WIDTH - 2
        );
    });

    if(state.apple) {
        draw.rectangle(
            APPLE_COLOUR,
            state.apple.x * BLOCK_WIDTH,
            state.apple.y * BLOCK_WIDTH,
            BLOCK_WIDTH,
            BLOCK_WIDTH
        );
        draw.text(
            '#FFFFFF',
            '14px Arial',
            `score: ${state.score}`,
            WIDTH - 100,
            30
        );
    }
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

game.addView(modes.get('GAME_OVER'), (draw, settings, state) => {
    draw.rectangle('#000000', 0, 0, WIDTH, HEIGHT);

    draw.text(
        '#FFFFFF',
        '14px Arial',
        'GAME OVER!',
        30,
        30
    );
});



brunt.attach('game-area', game);
