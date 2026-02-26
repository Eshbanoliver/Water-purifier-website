const https = require('https');
const fs = require('fs');

function download(url, dest) {
    https.get(url, (res) => {
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => {
            file.close();
            console.log('Downloaded', dest);
        });
    });
}

// 1000 LPH Plant
download('https://m.media-amazon.com/images/I/71uK-V7T8fL._AC_SL1500_.jpg', 'assets/ro_1000.jpg');

// 250 LPH Plant
download('https://m.media-amazon.com/images/I/610tQY40gHL._AC_SL1500_.jpg', 'assets/ro_250.jpg');

// 50 LPH System
download('https://m.media-amazon.com/images/I/61gEDtZ9H6L._AC_SL1500_.jpg', 'assets/ro_50.jpg');

// 25 LPH System
download('https://m.media-amazon.com/images/I/51rY5zH171L._AC_SL1000_.jpg', 'assets/ro_25.jpg');
