const createLoop = (tickDuration) => {

    const start = (callback) => {
        let lastTick = null;
        const loop = (timestamp) => {
            if(!lastTick){
                lastTick = timestamp;
            }

            const step = timestamp - lastTick;

            if(step > tickDuration) {
                lastTick = timestamp;
                callback();
            }


            requestAnimationFrame(loop);
        };

        requestAnimationFrame(loop);
    };

    return {
       start 
    };
};

export default createLoop;
