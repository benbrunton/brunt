const createDraw = (context) => {
    const rectangle = (colour, x, y, width, height) => {
        context.fillStyle = colour;
        context.fillRect(x, y, width, height); 
    };

    const circle = (colour, x, y, radius) => {
        context.fillStyle = colour;
        context.beginPath();
        context.arc(x, y, radius, 0, 2 * Math.PI);
        context.fill();
    };

    const text = (colour, font, text, x, y) => {
        context.fillStyle = colour;
        context.font = font;
        context.fillText(text, x, y);
    };

    return { context, rectangle, circle, text };
};

export default createDraw;
