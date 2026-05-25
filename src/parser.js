// src/parser.js

function parseContent(contentString) {
    // Enterprise Safety Check: Ensure the input is actually a string
    if (typeof contentString !== 'string') {
        throw new TypeError('count-read-time expects a string as input.');
    }

    // Early Return for empty strings (O(1) execution for empty inputs)
    if (contentString.trim().length === 0) {
        return { normalText: '', codeText: '', imageCount: 0 };
    }

    // 1. Universal Image Count (HTML <img> or Markdown ![]())
    const imageMatches = contentString.match(/<img[^>]+>|!\[.*?\]\(.*?\)/gi);
    const imageCount = imageMatches ? imageMatches.length : 0;

    // 2. Extract Universal Code Blocks
    // Matches HTML (<pre>, <code>), Markdown (```...```), and BBCode ([code]...[/code])
    let codeText = '';
    const codeRegex = /<(pre|code)[^>]*>([\s\S]*?)<\/\1>|```([\s\S]*?)```|\[code\]([\s\S]*?)\[\/code\]/gi;

    // This removes the code blocks from the main string and saves them,
    // guaranteeing we never double-count technical words.
    const contentWithoutCode = contentString.replace(codeRegex, (match, htmlTag, htmlContent, mdContent, bbContent) => {
        const extractedContent = htmlContent || mdContent || bbContent || match;
        codeText += ' ' + extractedContent;
        return '';
    });

    // 3. Strip remaining markup to get pure, normal text
    let normalText = contentWithoutCode
        .replace(/<[^>]+>/g, ' ') // Strip HTML tags
        .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Strip Markdown links but keep the text
        .replace(/[#*>`~_-]/g, ' ') // Strip Markdown structural characters
        .trim();

    // 4. Clean up the extracted code text (removes nested tags like <span> inside code)
    const cleanCodeText = codeText.replace(/<[^>]+>/g, ' ').trim();

    return {
        normalText,
        codeText: cleanCodeText,
        imageCount
    };
}

function countWords(text) {
    if (!text) return 0;
    // Splits the string by whitespace characters to count actual words
    const words = text.match(/\S+/g);
    return words ? words.length : 0;
}

module.exports = { parseContent, countWords };