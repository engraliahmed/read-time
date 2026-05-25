// tests/test.js
const { estimateReadTime } = require('../index.js');

console.log("⏳ Running Enterprise Universal count-read-time tests...\n");

let passed = 0;
let failed = 0;

function assert(condition, message) {
    if (condition) {
        console.log(`✅ PASS: ${message}`);
        passed++;
    } else {
        console.error(`❌ FAIL: ${message}`);
        failed++;
    }
}

try {
    // Test 1: HTML Input
    const dummyHTML = `
        <p>This is a normal paragraph with some standard words.</p>
        <img src="test.jpg" />
        <pre>const scalable = true;</pre>
    `;
    const htmlResult = estimateReadTime(dummyHTML, { format: 'coffee' });
    assert(htmlResult.includes('☕'), "HTML Path - parsed correctly");

    // Test 2: Markdown Input
    const dummyMarkdown = `
# This is a Markdown header
Here is some standard text with a [link](https://google.com).
![A test image](test.jpg)
\`\`\`javascript
const scalable = true;
\`\`\`
    `;
    const mdResult = estimateReadTime(dummyMarkdown, { format: 'coffee' });
    assert(mdResult.includes('☕'), "Markdown Path - parsed identically to HTML");

    // Test 3: Raw Plain Text Input
    const dummyText = `This is just a massive string of raw text without any formatting. It should naturally fall through the parser and just get counted.`;
    const textResult = estimateReadTime(dummyText);
    assert(textResult.includes('1 min read'), "Plain Text Path - parsed safely");

    // Test 4: Empty String
    const emptyResult = estimateReadTime("");
    assert(emptyResult === '0 min read', "Empty String - gracefully handled");

    // Test 5: Null Input
    const nullResult = estimateReadTime(null);
    assert(nullResult === '0 min read', "Null Input - gracefully handled by try/catch");

} catch (error) {
    console.error("❌ Catastrophic Failure:", error.message);
    failed++;
}

console.log(`\n🏁 Test Results: ${passed} Passed | ${failed} Failed`);

if (failed > 0) {
    process.exit(1);
}