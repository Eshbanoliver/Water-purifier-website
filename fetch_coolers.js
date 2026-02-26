const https = require('https');
const fs = require('fs');

function download(url, dest) {
    https.get(url, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
            return download(res.headers.location, dest);
        }
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => {
            file.close();
            console.log('Downloaded', dest);
        });
    }).on('error', (err) => {
        console.error('Error downloading ' + url + ': ' + err.message);
    });
}

// Blue Star Water Cooler SDLX 2040
download('https://m.media-amazon.com/images/I/412A+1z8JBL._SX300_SY300_.jpg', 'assets/bluestar_cooler.jpg');

// Blue Star Water Dispenser
download('https://m.media-amazon.com/images/I/51nN4Uv25xL._SX300_SY300_.jpg', 'assets/bluestar_dispenser.jpg');

// Voltas Water Cooler
download('https://m.media-amazon.com/images/I/61P0Qf7bKFL._SX425_.jpg', 'assets/voltas_cooler.jpg');

// Voltas Minimagic Pure R Water Dispenser
download('https://m.media-amazon.com/images/I/51c-gIokXlL._SX300_SY300_.jpg', 'assets/voltas_dispenser.jpg');
