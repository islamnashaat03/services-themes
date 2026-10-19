import hashlib, json, subprocess, tarfile
from pathlib import Path

home = Path('/home/esdfypbc')
archive = home / 'services-themes-20261019.tar.gz'
mapping = {'law-firm':'law', 'medical-clinic':'clinic', 'creative-portfolio':'folio'}
with tarfile.open(str(archive)) as package:
    members = package.getmembers()
    for m in members:
        parts = Path(m.name).parts
        assert parts and parts[0] in mapping and '..' not in parts
        assert not m.issym() and not m.islnk()
    for theme, label in mapping.items():
        root = home / (label + '.islamnashaat.com')
        assert root.is_dir() and root.resolve().parent == home
        assert all(p.name == 'cgi-bin' for p in root.iterdir()), 'Target contains existing content'
    counts = {}
    for m in members:
        parts = Path(m.name).parts
        root = home / (mapping[parts[0]] + '.islamnashaat.com')
        target = root.joinpath(*parts[1:])
        assert target.resolve() == root.resolve() or root.resolve() in target.resolve().parents
        if m.isdir():
            target.mkdir(parents=True, exist_ok=True)
        elif m.isfile():
            target.parent.mkdir(parents=True, exist_ok=True)
            data = package.extractfile(m).read()
            target.write_bytes(data)
            target.chmod(0o644)
            assert hashlib.sha256(target.read_bytes()).digest() == hashlib.sha256(data).digest()
            counts[parts[0]] = counts.get(parts[0], 0) + 1
    print(json.dumps({'deployed_and_hash_verified':counts}))
print('SSL_TOOLS')
for name in ['acme.sh','certbot']:
    subprocess.run(['sh','-c','command -v '+name])
for name in ['.acme.sh','bin']:
    p=home/name
    if p.is_dir(): print(name, [x.name for x in p.iterdir()][:25])
