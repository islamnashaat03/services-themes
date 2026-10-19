import base64, json, subprocess
from pathlib import Path

def api(function,**params):
    result=json.loads(subprocess.check_output(['uapi','--output=json','DNS',function]+[k+'='+str(v) for k,v in params.items()]))['result']
    assert result['status']==1, result.get('errors')
    return result
zone='islamnashaat.com'
before=api('parse_zone',zone=zone)
backup=Path('/home/esdfypbc/deploy-backups/20261019-themes-github')
backup.mkdir(mode=0o700,exist_ok=True)
saved=backup/'dns-before.json'
assert not saved.exists(), 'DNS change already attempted; inspect backup first'
saved.write_text(json.dumps(before,indent=2))
records=before['data']
decode=lambda value:base64.b64decode(value).decode('ascii')
soa=next(r for r in records if r.get('record_type')=='SOA')
serial=decode(soa['data_b64'][2])
params={'zone':zone,'serial':serial}
changes=[]
for label in ['law','clinic','folio']:
    for name in [label,'www.'+label]:
        rows=[r for r in records if r.get('dname_raw','').rstrip('.') in [name,name+'.'+zone]]
        address=[r for r in rows if r.get('record_type')=='A']
        assert len(address)==1 and decode(address[0]['data_b64'][0])=='162.0.209.170'
        edit={'line_index':address[0]['line_index'],'dname':name+'.'+zone+'.','ttl':300,'record_type':'CNAME','data':['islamnashaat03.github.io.']}
        params['edit-'+str(len(changes)+1)]=json.dumps(edit)
        changes.append(name)
        for row in rows:
            if row.get('record_type')=='TXT':
                assert decode(row['data_b64'][0]).startswith('v=spf1 ')
                params['remove-'+str(row['line_index'])]=row['line_index']
result=api('mass_edit_zone',**params)
(backup/'dns-result.json').write_text(json.dumps(result,indent=2))
after=api('parse_zone',zone=zone)
(backup/'dns-after.json').write_text(json.dumps(after,indent=2))
for name in changes:
    row=next(r for r in after['data'] if r.get('dname_raw','').rstrip('.') in [name,name+'.'+zone] and r.get('record_type')=='CNAME')
    assert decode(row['data_b64'][0])=='islamnashaat03.github.io.'
print(json.dumps({'verified_cnames':changes,'target':'islamnashaat03.github.io','backup':str(backup)}))
