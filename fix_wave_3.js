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

// Wave Krystal style RO (Generic high quality)
download('https://m.media-amazon.com/images/I/41K-5qO-mVL._SX522_.jpg', 'assets/wave_krystal_actual.jpg');
