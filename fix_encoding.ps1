$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
$files = Get-ChildItem -Path . -Filter *.html

foreach ($file in $files) {
    # Read file as bytes first
    $bytes = [System.IO.File]::ReadAllBytes($file.FullName)
    
    # Decode with UTF-8  
    $content = [System.Text.Encoding]::UTF8.GetString($bytes)
    $content = $content.TrimStart([char]0xFEFF)
    
    # Fix common mojibake patterns for ₹ (U+20B9)
    # When UTF-8 bytes E2 82 B9 are read as Windows-1252, they become â‚¹
    $content = $content -replace 'â‚¹', '₹'
    
    # Also fix: Ã¢â€šÂ¹ (double-encoded)
    $content = $content -replace 'Ã¢â€šÂ¹', '₹'
    
    # Fix â€" (em dash mojibake) -> —
    $content = $content -replace 'â€"', '—'
    
    # Fix â€" (en dash) -> –
    $content = $content -replace 'â€"', '–'
    
    # Fix â€™ (right single quote) -> '
    $content = $content -replace 'â€™', "'"
    
    # Fix â€œ and â€ (smart quotes)
    $content = $content -replace 'â€œ', '"'
    $content = $content -replace 'â€', '"'
    
    # Write back as proper UTF-8 without BOM
    [System.IO.File]::WriteAllText($file.FullName, $content, $utf8NoBom)
    Write-Host "Fixed: $($file.Name)"
}

Write-Host "Done! All files fixed."
