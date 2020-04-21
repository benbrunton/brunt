# Brunt
An extremely simple game framework for the web

## Design Principles

### Modes
Modes are the different contexts or screens in your game.
You probably want to render something different and have button
presses trigger different actions when your game is paused or
displaying a menu than when it's in-game. Modes are purely optional
so brunt works fine for games that have no context switch.

### Actions
Actions are instructions that are triggered by keypresses or
touch/click events. They allow the framework to interact with
your game model in a language that makes sense for the game, rather
than being coupled to DOM events.

### Model
The Javascript Model that holds your game logic. Your model updates
with a `tick`, responds to actions and reports back on game state.

required methods:
- tick
- getState -> State
- handleActions  ([action])

### View
Different views can be mapped to each game mode.
They are stateless functions that are passed a 
simple drawing API and the current game state.

### Controls
Control maps can be linked to game modes. They tie together user
interactions with actions.

## Simple Example

```js
import brunt from './brunt/brunt.js';

const game = brunt();

const actions = game.getActions([
    "JUMP",
]);

game.addControlsMap({
    anyKey: actions.get("JUMP"),
    anyTouch: actions.get("JUMP")
});

const model = {
    yPos: 300,
    tick: () => {
        if(model.yPos < 300) {
            model.yPos += 2;
        }
    },
    getState: () => ({ yPos: model.yPos }),
    handleActions: (actionList) => {
        if(actionList.includes(actions.get("JUMP"))){
            model.yPos -= 10;
        }
    }
};

game.model(model);

game.addView((draw, settings, state) => {
    draw.rectangle(
        '#000000',
        0,
        0,
        settings.width,
        settings.height
    );
    draw.circle('#FFFFFF', settings.width / 2, state.yPos, 10);
});

brunt.attach('game-area', game);

```
