const https = require('https');
const fs = require('fs');

const url = 'https://www.kent.co.in/water-purifiers/ro/';

https.get(url, (res) => {
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
        const matches = [...rawData.matchAll(/<img[^>]*src="([^"]+)"[^>]*alt="([^"]*)"/gi)];
        matches.forEach(m => {
            const src = m[1];
            const alt = m[2];
            console.log(alt, "=>", src);
        });
    });
});
