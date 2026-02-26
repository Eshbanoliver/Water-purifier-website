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

// Wave i5-400 Titanium Ionizer
download('https://m.media-amazon.com/images/I/61NlP-KXYfL._AC_SL1500_.jpg', 'assets/wave_i5_400.jpg');

// Wave 5G Pro Hot & Cold
download('https://m.media-amazon.com/images/I/617FpE-aT6L._AC_SL1500_.jpg', 'assets/wave_5g_pro.jpg');

// Wave Krystal RO
download('https://m.media-amazon.com/images/I/51rY5zH171L._AC_SL1000_.jpg', 'assets/wave_krystal.jpg');
