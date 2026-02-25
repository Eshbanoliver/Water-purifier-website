import os, glob

for filepath in glob.glob('*.html'):
    with open(filepath, 'rb') as f:
        raw = f.read()
    
    # Try to decode, replacing mojibake for ₹
    # UTF-8 bytes for ₹ are E2 82 B9
    # When double-encoded: C3 A2 C2 82 C2 B9
    content = raw.replace(b'\xc3\xa2\xc2\x82\xc2\xb9', b'\xe2\x82\xb9')
    
    # Also fix: â‚¹ pattern in raw bytes if present via Windows-1252 re-encoding
    # E2 80 93 = — (em dash), E2 80 94 = — 
    # C3 A2 E2 82 AC E2 80 9C = double-encoded em dash
    
    with open(filepath, 'wb') as f:
        f.write(content)
    
    print(f'Fixed: {filepath}')

print('Done!')
