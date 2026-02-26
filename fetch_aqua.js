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

// Aqua Swift (Classic Blue/White Cabinet)
download('https://m.media-amazon.com/images/I/71uV6tK7oKL._SX679_.jpg', 'assets/aqua_swift_actual.jpg');

// Aqua-S Transparent (White/Transparent Cabinet)
download('https://m.media-amazon.com/images/I/61MvT7T9fKL._SX679_.jpg', 'assets/aqua_s_transparent.jpg');
