function remapValue(firstMin, firstMax, secondMin, secondMax, value) {
    const correctedFirstMax = firstMax - firstMin;
    const correctedValue = value - firstMin;
    const decimalPosition = correctedValue / correctedFirstMax;

    const correctedSecondMax = secondMax - secondMin;
    let remappedValue = decimalPosition * correctedSecondMax;
    remappedValue += secondMin;

    return Math.round(remappedValue);
};



module.exports = remapValue;