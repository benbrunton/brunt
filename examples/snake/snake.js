const directions = {
    UP: Symbol("UP"),
    DOWN: Symbol("DOWN"),
    LEFT: Symbol("LEFT"),
    RIGHT: Symbol("RIGHT")
};

const createSnake = (actions, modes, { width, height }) => {

    let direction = null;
    let nextDirection = null;
    let mode = modes.get("PREGAME");
    let snake = null;
    let apple = null;
    let score = 0;

    const getState = () => ({
        mode,
        snake,
        apple,
        score
    });

    const tick = () => {
        if(mode === modes.get("GAME")) {

            if(nextDirection){
                direction = nextDirection;
                nextDirection = null;
            }
            updateSnakeBlocks();

            if(apple === null) {
                apple = getSafeRandomPos();
            } else if(checkPosVsSnake(apple)){
                apple = null;
                score += 1;
                addSnakeBlocks();
            }

            if(checkSelfCollision()) {
                gameOver();
            }

        }

    };

    const updateSnakeBlocks = () => {
        snake.pop();

        const newBlock = {
            x: snake[0].x,
            y: snake[0].y
        };

        switch(direction) {
            case directions.RIGHT:
                newBlock.x += 1;
                break;
            case directions.LEFT:
                newBlock.x -= 1;
                break;
            case directions.UP:
                newBlock.y -= 1;
                break;
            case directions.DOWN:
                newBlock.y += 1;
                break;
        }

        
        if(newBlock.x > width) {
            newBlock.x = 0;
        } else if(newBlock.x < 0) {
            newBlock.x = width;
        }

        if(newBlock.y > height) {
            newBlock.y = 0;
        } else if(newBlock.y < 0) {
            newBlock.y = height;
        }

        snake.unshift(newBlock); 
    };

    const handleActions = (actionList) => {
        if(actionList.includes(actions.get("MOVE_LEFT"))
            && direction !== directions.RIGHT){
            nextDirection = directions.LEFT;
        } else if(actionList.includes(actions.get("MOVE_RIGHT"))
            && direction !== directions.LEFT){
            nextDirection = directions.RIGHT;
        } else if(actionList.includes(actions.get("MOVE_UP"))
            && direction !== directions.DOWN){
            nextDirection = directions.UP;
        } else if(actionList.includes(actions.get("MOVE_DOWN"))
            && direction !== directions.UP){
            nextDirection = directions.DOWN;
        }

        if(actionList.includes(actions.get("ROTATE_LEFT"))){
            nextDirection = rotateLeft(direction);
        } else if(actionList.includes(actions.get("ROTATE_RIGHT"))){
            nextDirection = rotateRight(direction);
        }

        if(actionList.includes(actions.get("BEGIN_GAME"))){
            startGame();
        }
    };

    const startGame = () => {
        mode = modes.get('GAME');
        snake = [
            { x: 3, y: 1 },
            { x: 2, y: 1 },
            { x: 1, y: 1 }
        ];
        direction = directions.RIGHT;
        nextDirection = null;
        score = 0;
    };

    const gameOver = () => {
        console.log('game over!');
        mode = modes.get('GAME_OVER');
        setTimeout(() => { mode = modes.get('PREGAME') }, 1000);
    };

    const getRandomPos = () => ({
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height),
    });

    const getSafeRandomPos = () => {
        let pos = getRandomPos();
        while(checkPosVsSnakeBody(pos)){
            pos = getRandomPos();
        }
        return pos;
    }

    const checkPosVsSnake = (pos) => {
        return checkCollision(pos, snake[0]);
    };

    const checkPosVsSnakeBody = (pos) => {
        for(let i = 0; i < snake.length; i++) {
            if(checkCollision(pos, snake[i])) {
                return true;
            }
        }

        return false;
    };


    const checkSelfCollision = () => {
        const head = snake[0];
        for(let i = 1; i < snake.length; i++) {
            if(checkCollision(head, snake[i])) {
                return true;
            }
        }

        return false;
    };

    const checkCollision = (a, b) => {
        return (a.x === b.x && a.y === b.y);
    };

    const addSnakeBlocks = () => {
        snake.push({...snake[snake.length]});
    };

    return { tick, getState, handleActions };
};

const rotateLeft = (direction) => {
    switch(direction) {
        case directions.UP:
            return directions.LEFT;
        case directions.DOWN:
            return directions.RIGHT;
        case directions.LEFT:
            return directions.DOWN;
        case directions.RIGHT:
            return directions.UP;
    }
};

const rotateRight = (direction) => {
    switch(direction) {
        case directions.UP:
            return directions.RIGHT;
        case directions.DOWN:
            return directions.LEFT;
        case directions.LEFT:
            return directions.UP;
        case directions.RIGHT:
            return directions.DOWN;
    }
};


export default createSnake;
