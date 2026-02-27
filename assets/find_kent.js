const https = require('https');
const fs = require('fs');

const models = [
    "Kent Crystal Star",
    "Kent Elite Plus",
    "Kent Elegant",
    "Kent Crystal Star Black",
    "Kent Grand Star",
    "Kent Elegant Copper",
    "Kent Elite II Plus",
    "Kent Super Plus",
    "Kent Crystal Alkaline",
    "Kent Grand Plus Black",
    "Kent Ultra",
    "Kent Grand Plus",
    "Kent Perk",
    "Kent Excell Plus",
    "Kent Pearl Star",
    "Kent Starling Plus"
];

function tryUrl(url) {
    return new Promise((resolve) => {
        https.get(url, (res) => {
            resolve({ url, status: res.statusCode });
        }).on('error', () => resolve({ url, status: 500 }));
    });
}

async function check() {
    for (let m of models) {
        let formatted = m.toLowerCase().replace(/ /g, '-');
        let url1 = `https://www.kent.co.in/images/water-purifiers/ro/${formatted}/${formatted}.png`;
        let res = await tryUrl(url1);
        if (res.status === 200) {
            console.log(`Found: ${m} -> ${url1}`);
        } else {
            let url2 = `https://www.kent.co.in/images/water-purifiers/ro/${formatted}/${formatted}.jpg`;
            res = await tryUrl(url2);
            if (res.status === 200) {
                console.log(`Found: ${m} -> ${url2}`);
            } else {
                console.log(`Not found: ${m}`);
            }
        }
    }
}
check();
