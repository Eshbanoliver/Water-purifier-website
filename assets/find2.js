const https = require('https');
const fs = require('fs');

const models = [
    "Kent Crystal Star",
    "Kent Elite Plus",
    "Kent Elegant",
    "Kent Crystal Star Black",
    "Kent Grand Star",
    "Kent Elegant Copper",
    "Kent Elite 2 Plus",
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

const slugs = models.map(m => m.toLowerCase().replace(/ /g, '-'));

function checkUrl(url) {
    return new Promise((resolve) => {
        https.request(url, { method: 'HEAD' }, (res) => resolve(res.statusCode)).on('error', () => resolve(500)).end();
    });
}

async function findImages() {
    const exts = ['.png', '.jpg', '.webp'];
    const dirs = ['water-purifiers/ro', 'ro', 'water-purifiers/uv'];

    for (let i = 0; i < slugs.length; i++) {
        let baseSlug = slugs[i];
        let found = false;
        for (let dir of dirs) {
            for (let ext of exts) {
                let url = `https://www.kent.co.in/images/${dir}/${baseSlug}/${baseSlug}${ext}`;
                let status = await checkUrl(url);
                if (status === 200) {
                    console.log(`Model: ${models[i]} => ${url}`);
                    found = true;
                    break;
                }

                let url2 = `https://www.kent.co.in/images/${dir}/${baseSlug}${ext}`;
                status = await checkUrl(url2);
                if (status === 200) {
                    console.log(`Model: ${models[i]} => ${url2}`);
                    found = true;
                    break;
                }
            }
            if (found) break;
        }
    }
}
findImages();
