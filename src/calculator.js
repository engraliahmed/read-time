// src/calculator.js
const CONSTANTS = require('./constants');

/**
 * Calculates the total time added by images based on a degrading scale.
 */
function calculateImageTime(imageCount) {
    let seconds = 0;
    
    for (let i = 1; i <= imageCount; i++) {
        if (i === 1) {
            seconds += CONSTANTS.IMAGE_TIMING.FIRST;
        } else if (i === 2) {
            seconds += CONSTANTS.IMAGE_TIMING.SECOND;
        } else if (i === 3) {
            seconds += CONSTANTS.IMAGE_TIMING.THIRD;
        } else {
            seconds += CONSTANTS.IMAGE_TIMING.DEFAULT;
        }
    }
    
    return seconds;
}

/**
 * Takes the raw counts and returns the total estimated reading time in seconds.
 */
function calculateTotalSeconds(normalWordCount, codeWordCount, imageCount) {
    // 1. Calculate text time in minutes, then convert to seconds
    const normalMinutes = normalWordCount / CONSTANTS.NORMAL_WPM;
    const codeMinutes = codeWordCount / CONSTANTS.CODE_WPM;
    
    const textSeconds = (normalMinutes + codeMinutes) * 60;
    
    // 2. Calculate image time in seconds
    const imageSeconds = calculateImageTime(imageCount);

    // 3. Return total seconds rounded to the nearest whole number
    return Math.round(textSeconds + imageSeconds);
}

module.exports = { calculateTotalSeconds, calculateImageTime };