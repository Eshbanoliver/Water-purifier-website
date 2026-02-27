const fs = require('fs');

let html = fs.readFileSync('kent-ro-water-purifiers.html', 'utf8');

const regex = /<div class="product-img"><img src="([^"]+)" alt="([^"]+)"><\/div>/g;

html = html.replace(regex, (match, src, alt) => {
    let filename = alt.toLowerCase().replace(/ /g, '_');

    // Fallback for starling plus due to missing generation
    if (filename === 'kent_starling_plus') {
        filename = 'kent_excell_plus';
    }

    return `<div class="product-img"><img src="assets/${filename}.png" alt="${alt}"></div>`;
});

fs.writeFileSync('kent-ro-water-purifiers.html', html);
console.log('kent-ro-water-purifiers.html updated successfully.');
