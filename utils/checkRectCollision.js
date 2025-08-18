function checkRectCollision(firstRect, secondRect) {
    const firstX = firstRect.xCoord;
    const firstY = firstRect.yCoord;
    const firstWidth = firstRect.width;
    const firstHeight = firstRect.height;

    const secondX = secondRect.xCoord;
    const secondY = secondRect.yCoord;
    const secondWidth = secondRect.width;
    const secondHeight = secondRect.height;

    const horizontalOverlap = (
        (firstX + firstWidth) >= secondX &&
        firstX <= (secondX + secondWidth)
    );
    const verticalOverlap = (
        (firstY + firstHeight) >= secondY &&
        firstY <= (secondY + secondHeight)
    );

    return horizontalOverlap && verticalOverlap;
};



module.exports = checkRectCollision;