const https = require('https');
const fs = require('fs');

function downloadImageSearch(query, filename) {
    const url = 'https://html.duckduckgo.com/html/?q=' + encodeURIComponent(query);
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            const matches = data.match(/src="(\/\/external-content\.duckduckgo\.com\/iu\/\?u=[^"]+)"/);
            if (matches && matches.length > 1) {
                let imgUrl = 'https:' + matches[1];
                https.get(imgUrl, (imgRes) => {
                    if (imgRes.statusCode === 200) {
                        const file = fs.createWriteStream(filename);
                        imgRes.pipe(file);
                        file.on('finish', () => {
                            file.close();
                            console.log('Saved ' + filename);
                        });
                    } else {
                        console.log('Failed to download ' + imgUrl + ' for ' + query);
                    }
                }).on('error', err => console.log('Error downloading: ', err.message));
            } else {
                console.log('No images found for ' + query);
            }
        });
    }).on('error', err => console.log('Error fetching search: ', err.message));
}

downloadImageSearch('Merlin Matrix Digital RO Water Purifier', 'marlin_matrix.jpg');
downloadImageSearch('Merlin Planet Digital RO Water Purifier', 'marlin_planet.jpg');
