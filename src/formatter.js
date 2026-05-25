// src/formatter.js

/**
 * Formats the raw seconds into a user-friendly string based on developer options.
 */
function formatOutput(totalSeconds, options = {}) {
    // Always round up to the nearest minute for display purposes
    const minutes = Math.ceil(totalSeconds / 60);
    
    // Default to 'standard' if the developer doesn't specify a format
    const format = options.format || 'standard';

    // 1. Return raw data if they want to build their own custom UI
    if (format === 'raw') {
        return {
            seconds: totalSeconds,
            minutes: minutes
        };
    }

    // 2. The 'coffee' format: 1 cup per 5 minutes of reading
    if (format === 'coffee') {
        const cupsCount = Math.max(1, Math.ceil(minutes / 5));
        const cups = '☕'.repeat(cupsCount);
        return `${cups} ${minutes} min read`;
    }

    // 3. The 'hourglass' format
    if (format === 'hourglass') {
        return `⏳ ${minutes} mins`;
    }

    // 4. The default 'standard' format
    return `${minutes} min read`;
}

module.exports = { formatOutput };