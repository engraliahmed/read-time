// index.js

const { parseContent, countWords } = require('./src/parser');
const { calculateTotalSeconds } = require('./src/calculator');
const { formatOutput } = require('./src/formatter');

/**
 * Calculates the estimated reading time of an HTML string.
 * * @param {string} htmlString - The content to parse.
 * @param {object} options - Configuration options (e.g., { format: 'coffee' }).
 * @returns {string|object} - The formatted reading time.
 */
function estimateReadTime(contentString, options = {}) {
    try {
        // 1. Extract the data
        const { normalText, codeText, imageCount } = parseContent(contentString);

        // 2. Count the words
        const normalWordCount = countWords(normalText);
        const codeWordCount = countWords(codeText);

        // 3. Calculate total time in seconds
        const totalSeconds = calculateTotalSeconds(normalWordCount, codeWordCount, imageCount);

        // 4. Format and return the output
        return formatOutput(totalSeconds, options);
        
    } catch (error) {
        // Enterprise safety: If something catastrophically fails, log it 
        // but don't crash the user's app. Return a safe fallback.
        console.error('[read-time error]:', error.message);
        return formatOutput(0, options); 
    }
}

// Export the main function so developers can use it
module.exports = { estimateReadTime };