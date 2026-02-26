const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

let replacedCount = 0;
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // The spaces around | might differ slightly or be identical
    const needle1 = '&copy; Copyright 2026 | Shantiraj Associates';
    const needle2 = '© Copyright 2026 | Shantiraj Associates';
    const replacement = '&copy; Copyright 2026 | <a href="index.html" style="color: inherit; text-decoration: none;">Shantiraj Associates</a>';

    content = content.replaceAll(needle1, replacement);
    content = content.replaceAll(needle2, replacement);

    if (content !== original) {
        fs.writeFileSync(file, content);
        replacedCount++;
    }
});

console.log('Replaced in ' + replacedCount + ' files.');
