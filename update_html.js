const fs = require('fs');
const newServicesMenu = `<li class="nav-item-has-mega"><a href="services.html" class="nav-link$$$">Services <i class="fas fa-chevron-down" style="font-size:0.7em; margin-left:4px;"></i></a>
                        <span class="nav-dot"></span>
                        <div class="mega-menu">
                            <a href="kent-ro-water-purifiers.html" class="mega-menu-item"><i class="fas fa-tint"></i> Kent RO Water Purifiers</a>
                            <a href="marlin-ro-water-purifiers.html" class="mega-menu-item"><i class="fas fa-water"></i> Marlin RO Water Purifiers</a>
                            <a href="apple-water-purifiers.html" class="mega-menu-item"><i class="fas fa-apple-alt"></i> Apple Water Purifiers</a>
                            <a href="nexlin-vibe.html" class="mega-menu-item"><i class="fas fa-bolt"></i> Nexlin Vibe</a>
                            <a href="aqua-s.html" class="mega-menu-item"><i class="fas fa-shield-alt"></i> Aqua S</a>
                            <a href="aqua-ro-water-purifiers.html" class="mega-menu-item"><i class="fas fa-tint"></i> Aqua RO Water Purifiers</a>
                            <a href="wave-ro-water-purifiers.html" class="mega-menu-item"><i class="fas fa-wave-square"></i> Wave RO Water Purifiers</a>
                            <a href="water-coolers.html" class="mega-menu-item"><i class="fas fa-snowflake"></i> Water Coolers</a>
                            <a href="commercial-ro-water-purifier.html" class="mega-menu-item"><i class="fas fa-industry"></i> Commercial RO Water Purifier</a>
                            <a href="all-ro-spare-parts.html" class="mega-menu-item"><i class="fas fa-cogs"></i> All RO Spare Parts</a>
                        </div>
                    </li>`;

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
let replacedCount = 0;
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    let original = content;

    const navLinkActive = '<li><a href="services.html" class="nav-link active">Services</a><span class="nav-dot"></span></li>';
    const navLinkNormal = '<li><a href="services.html" class="nav-link">Services</a><span class="nav-dot"></span></li>';
    const navLinkNormal2 = '<li><a href="services.html" class="nav-link" >Services</a><span class="nav-dot"></span></li>';

    if (content.includes(navLinkActive)) {
        content = content.replace(navLinkActive, newServicesMenu.replace('$$$', ' active'));
    } else if (content.includes(navLinkNormal)) {
        content = content.replace(navLinkNormal, newServicesMenu.replace('$$$', ''));
    } else if (content.includes(navLinkNormal2)) {
        content = content.replace(navLinkNormal2, newServicesMenu.replace('$$$', ''));
    }

    if (content !== original) {
        fs.writeFileSync(file, content);
        replacedCount++;
    } else {
        console.log('Failed to replace in: ' + file);
    }
});
console.log('Replaced in ' + replacedCount + ' files.');
