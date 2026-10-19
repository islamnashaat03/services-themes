import base64,hashlib,json,shutil,subprocess,tarfile
from pathlib import Path
home=Path('/home/esdfypbc')
mapping={'law-firm':'law','medical-clinic':'clinic','creative-portfolio':'folio'}
zone=json.loads(subprocess.check_output(['uapi','--output=json','DNS','parse_zone','zone=islamnashaat.com']))['result']
assert zone['status']==1
for label in mapping.values():
    row=next(r for r in zone['data'] if r.get('dname_raw','').rstrip('.') in [label,label+'.islamnashaat.com'] and r.get('record_type')=='CNAME')
    assert base64.b64decode(row['data_b64'][0]).decode()=='islamnashaat03.github.io.'
backup=home/'deploy-backups/20261019-themes-github/retired-shared-copies'
assert not backup.exists()
with tarfile.open(str(home/'services-themes-20261019.tar.gz')) as archive:
    for member in archive.getmembers():
        if not member.isfile():continue
        parts=Path(member.name).parts
        assert parts[0] in mapping and '..' not in parts
        root=home/(mapping[parts[0]]+'.islamnashaat.com')
        target=root.joinpath(*parts[1:])
        assert root.resolve() in target.resolve().parents
        assert hashlib.sha256(target.read_bytes()).digest()==hashlib.sha256(archive.extractfile(member).read()).digest(),'Live copy changed; stop'
backup.mkdir(mode=0o700)
for theme,label in mapping.items():
    root=home/(label+'.islamnashaat.com')
    assert root.resolve().parent==home
    assert json.loads((root/'theme-manifest.json').read_text())['templateId']==theme
    destination=backup/theme
    destination.mkdir()
    for item in root.iterdir():
        if item.name!='cgi-bin':shutil.move(str(item),str(destination/item.name))
    assert not (root/'index.html').exists()
print(json.dumps({'static_copies_archived':list(mapping),'backup':str(backup),'dns':'GitHub Pages'}))
