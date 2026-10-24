"""Restore the original BMO download assets from the live portfolio."""
import hashlib
import json
from pathlib import Path
import urllib.request

root = Path(__file__).resolve().parent.parent
assets = json.loads((root / 'scripts/import-bmo-assets.json').read_text())
for asset in assets:
    path = root / 'public/downloads' / asset['name']
    if path.exists() and hashlib.sha256(path.read_bytes()).hexdigest() == asset['sha256']:
        print(f"Already verified: {asset['name']}")
        continue
    url = 'https://vunnyg.com/downloads/' + asset['name']
    request = urllib.request.Request(url, headers={'User-Agent': 'Personal-Website-Asset-Import'})
    with urllib.request.urlopen(request, timeout=180) as response:
        data = response.read()
    if len(data) != asset['size'] or hashlib.sha256(data).hexdigest() != asset['sha256']:
        raise RuntimeError(f"Asset integrity check failed: {asset['name']}")
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(data)
    print(f"Downloaded and verified: {asset['name']} ({len(data)} bytes)")
