import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile,stat,readdir} from 'node:fs/promises';
import path from 'node:path';
const ids=['law-firm','medical-clinic','creative-portfolio','real-estate','construction-company','training-center'];
const json=async f=>JSON.parse(await readFile(f,'utf8'));
const html=async(id,locale)=>readFile(path.join('dist',id,locale?'en/index.html':'index.html'),'utf8');
test('six standalone packages default to Arabic and contain meaningful English pages',async()=>{
 for(const id of ids){const ar=await html(id,false),en=await html(id,true);assert.match(ar,/<html lang="ar" dir="rtl"/);assert.match(en,/<html lang="en" dir="ltr"/);for(const h of [ar,en]){assert.equal((h.match(/<h1\b/g)||[]).length,1,id);assert.match(h,/data-prerendered="true"/);assert.match(h,new RegExp(`data-theme="${id}"`));assert.match(h,new RegExp(h.startsWith('<!doctype html><html lang="ar"')?'href="/en/"':'href="/ar/"'));assert.match(h,/noindex,follow/);}assert.equal(ar,await readFile(path.join('dist',id,'ar/index.html'),'utf8'));}
});
function shape(v){if(Array.isArray(v))return v.map(shape);if(v&&typeof v==='object')return Object.fromEntries(Object.keys(v).sort().map(k=>[k,shape(v[k])]));return typeof v;}
test('Arabic and English content keep identical schemas for future imports',async()=>{for(const id of ids)assert.deepEqual(shape(await json(`dist/${id}/theme-content/ar.json`)),shape(await json(`dist/${id}/theme-content/en.json`)),id);});
test('manifests describe template versions, editable content and future adapter truthfully',async()=>{
 for(const id of ids){const m=await json(`dist/${id}/theme-manifest.json`);assert.equal(m.templateId,id);assert.equal(m.schemaVersion,1);assert.equal(m.templateVersion,'1.0.0');assert.deepEqual(m.locales,['ar','en']);assert.equal(m.defaultLocale,'ar');assert.equal(m.mawqi.installed,false);assert.equal(m.attribution.clientProject,false);assert.ok(m.editableFields.length>30);assert.ok(m.sections.length>=4);const c=await json(`dist/${id}/theme-content/ar.json`);for(const f of m.editableFields){const v=f.path.split('/').slice(1).reduce((o,k)=>o[k],c);assert.equal(typeof v,'string',f.path);assert.equal(v,f.default);}}
});
test('each package includes every runtime asset referenced by its prerendered page',async()=>{
 for(const id of ids){const root=path.resolve('dist',id);for(const locale of [false,true]){const h=await html(id,locale);for(const m of h.matchAll(/<(?:img|script|link)\b[^>]*>/g)){if(m[0].startsWith('<link')&&!/rel="stylesheet"/.test(m[0]))continue;for(const a of m[0].matchAll(/(?:src|href)="([^"]+)"/g)){const u=a[1];assert.ok(!/^https?:/.test(u),`${id}: remote runtime asset`);if(u.startsWith('/'))assert.ok((await stat(path.join(root,u))).isFile(),`${id}: ${u}`);}}}}
});
test('local form confirmations cannot claim submitted information or real appointments',async()=>{
 const clinic=await html('medical-clinic',false);assert.match(clinic,/لن|لا تُ|لا تُرسل|لن تُرسل|لا تُدخل|لا تدخل/);const c=await json('dist/medical-clinic/theme-content/en.json');assert.match(c.form.success,/nothing was sent/);assert.match(c.form.success,/No appointment has been booked/);const law=await json('dist/law-firm/theme-content/en.json');assert.match(law.people.note,/fictional/i);
});
