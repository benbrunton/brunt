import createDraw from './draw.js';

const createView = (viewsMap, settings) => {
    const { width, height } = settings;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');

    const bufferCanvas = document.createElement('canvas');
    bufferCanvas.width = settings.width;
    bufferCanvas.height = settings.height;

    const bufferCtx = bufferCanvas.getContext('2d');

    const flushBuffer = () => {
        ctx.drawImage(bufferCanvas, 0, 0);
    };

    const getCanvas = () => (canvas);

    const render = (state) => {
        const renderFn = viewsMap[state.mode] || viewsMap.default;
        const draw = createDraw(bufferCtx);
        renderFn(draw, settings, state);
        flushBuffer();
    };

    return { getCanvas, render };
};

export default createView;
