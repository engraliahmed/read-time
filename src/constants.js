// src/constants.js

const CONSTANTS = {
    NORMAL_WPM: 200,      // Average human reading speed for standard text
    CODE_WPM: 100,        // Slower reading speed for technical code blocks
    
    // Medium's image timing algorithm (in seconds)
    IMAGE_TIMING: {
        FIRST: 12,        // 12 seconds to look at the first image
        SECOND: 11,
        THIRD: 10,
        DEFAULT: 3        // 3 seconds for every image after the third
    }
};

module.exports = CONSTANTS;