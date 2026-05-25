# Read-Time: The Enterprise level reading-time estimator

![Zero Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen)
![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![TypeScript Support](https://img.shields.io/badge/TypeScript-Ready-blue)
![ESM & CJS](https://img.shields.io/badge/Module-ESM%20%7C%20CJS-orange)
![License](https://img.shields.io/badge/license-Apache%202.0-blue)

*An impossibly lightweight, highly accurate reading time calculator built for the modern web.*

---

## Why did we build this?

If you search npm, you'll find plenty of reading-time libraries with millions of downloads. But as developers who write highly technical blogs, we noticed they all share a few fatal flaws:

1. **The Code Blindspot:** Existing tools parse everything at ~200 Words Per Minute. But reading a complex JavaScript algorithm takes much more cognitive load than reading a standard English paragraph. If an article is 50% code, standard libraries underestimate the reading time significantly.
2. **The Image Blindspot:** A great technical post relies on architecture diagrams. Older tools completely ignore `<img>` tags, acting as if studying a complex flowchart takes zero seconds.
3. **Format Lock-In:** Most parsers expect pristine HTML. But today, we write in Markdown, MDX, or custom CMS text formats.
4. **Poor Developer Experience:** They just spit out raw numbers, forcing you to write your own UI string formatting logic every single time.

We wanted to fix this.

## Introducing: The Universal Engine

`read-time` is a zero-dependency micro-library that intelligently calculates accurate reading times by respecting technical content. 

*   🧠 **Technical Weighting:** It uses a dual-speed engine. Standard text is parsed at a breezy 200 WPM, but code blocks (whether `<pre>` or Markdown ` ``` `) are automatically throttled to a careful 100 WPM.
*   🖼️ **Medium's Image Math:** It dynamically adds time for every image it finds using a degrading scale (12s for the first image, 11s for the second, 10s for the third, and 3s for any subsequent images).
*   🌐 **Format Agnostic:** Pass it HTML, Markdown, MDX, or just a massive string of plain text. The Universal Engine parses it all simultaneously with zero configuration required.

---

## The 4 Formatting Modes

We believe a library should handle the UI heavy lifting for you. Out of the box, `read-time` gives you four distinct formatting modes to perfectly match your blog's aesthetic:

| Mode | Example Output | Best Used For |
| :--- | :--- | :--- |
| **Standard** *(Default)* | `"5 min read"` | Clean, minimal, professional blogs. |
| **Coffee** | `"☕ ☕ 10 min read"` | Cozy tech blogs. Calculates exactly 1 cup per 5 minutes of reading! |
| **Hourglass** | `"⏳ 3 mins"` | Urgent, short-form content or documentation. |
| **Raw** | `{ seconds: 120, minutes: 2 }` | Backend databases, API responses, or completely custom UIs. |

---

## Installation

Because it is 100% dependency-free, you can safely install it in any project without bloating your `node_modules`.

```bash
npm install read-time
```

---

## Usage in Any Stack

`read-time` is natively compatible with **ES Modules** (Next.js, modern React) and **CommonJS** (legacy Express/Node). It even comes with `index.d.ts` for full **TypeScript** auto-completion.

### ⚛️ Next.js / React
```javascript
import { estimateReadTime } from 'read-time';

export default function BlogPost({ postContent }) {
    // 1. Pass your Markdown, MDX, or HTML directly
    const readTime = estimateReadTime(postContent, { format: 'coffee' });

    return (
        <article className="prose">
            <div className="flex text-gray-500 gap-2">
                <span>Published Today</span>
                <span>•</span>
                <span>{readTime}</span> {/* Outputs: ☕ 5 min read */}
            </div>
            <div dangerouslySetInnerHTML={{ __html: postContent }} />
        </article>
    );
}
```

### 💚 Vue.js / Nuxt 3
```vue
<script setup>
import { computed } from 'vue';
import { estimateReadTime } from 'read-time';

const props = defineProps(['htmlContent']);

// Automatically recalculates if content changes
const readTime = computed(() => {
    return estimateReadTime(props.htmlContent, { format: 'hourglass' });
});
</script>

<template>
  <article>
    <p class="meta">{{ readTime }}</p> <!-- Outputs: ⏳ 5 mins -->
    <div v-html="htmlContent"></div>
  </article>
</template>
```

### 🧡 Svelte / SvelteKit
```svelte
<script>
    import { estimateReadTime } from 'read-time';
    
    export let data; // Comes from your load function
    
    $: readTime = estimateReadTime(data.markdown, { format: 'standard' });
</script>

<header>
    <h1>{data.title}</h1>
    <p class="read-time">{readTime}</p> <!-- Outputs: 5 min read -->
</header>
```

### 🟢 Node.js / Express Backend
```javascript
const express = require('express');
const { estimateReadTime } = require('read-time');

const app = express();

app.post('/api/articles', (req, res) => {
    const { content } = req.body;
    
    // Grab the raw exact seconds to save to your database
    const timeData = estimateReadTime(content, { format: 'raw' });
    database.saveArticle(content, timeData.seconds);
    
    res.json({ success: true, savedTime: timeData });
});
```

### 🟨 Vanilla JavaScript (Browser / CDN)
No bundler? No problem.
```html
<script type="module">
    import { estimateReadTime } from 'https://unpkg.com/read-time';
    
    const blogText = document.getElementById('blog-content').innerText;
    const time = estimateReadTime(blogText, { format: 'coffee' });
    
    document.getElementById('read-time-display').innerText = time;
</script>
```

---

## How It Works Under The Hood

We skipped messy, single-file code for a highly modular, $O(N)$ architecture:

*   `src/parser.js`: The heavy lifter. Uses pure Regex to safely strip formatting, count images universally, and separate code blocks from normal text. Returns $O(1)$ on empty strings.
*   `src/calculator.js`: A Pure Function that crunches the raw numbers.
*   `src/formatter.js`: The UI layer converting raw seconds into formatting strings.
*   `index.js`: The Orchestrator that safely routes data through a `try/catch` safety net.

**The Testing Twist:** We deleted our massive Jest testing frameworks to stay true to our zero-dependency philosophy. The library is rigorously tested via a raw, native Node.js script (`tests/test.js`) that directly attacks the parser with null inputs, malformed HTML, and massive strings to ensure it is virtually uncrashable.

---

## License

This project is protected and licensed under the **Apache License 2.0**.
