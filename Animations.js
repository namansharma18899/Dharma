getPosi = (staggerFrame, gameFrame, imageFrames) => {
    const staggerFrame = 5;
    let imagePosiX = Math.floor(gameFrame / staggerFrame) % imageFrames;
    return imagePosiX * spriteWidth;
}

animateMotion = (motion, gameFrame, staggerFrame) => {
    switch (motion) {
        case 'idle':
            var frameY = 0;
            return getPosi(gameFrame, staggerFrame, 6), frameY;
        case 'moving':
            var frameY = 1;
            return getPosi(gameFrame, staggerFrame, 6), frameY;
        case 'jumping':
            var frameY = 2;
            return getPosi(gameFrame, staggerFrame, 6), frameY;
        case 'runAndJump':
            var frameY = 3;
            return getPosi(gameFrame, staggerFrame, 8), frameY;
        default:
            var frameY = 0;
            return getPosi(gameFrame, staggerFrame, 6), frameY;
    }
}
