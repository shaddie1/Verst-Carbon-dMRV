// Extracts the bundled source assets + template from the single-file artifact.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { gunzipSync } from 'node:zlib';

const html = readFileSync('Verst Carbon dMRV Platform.html', 'utf8');

function grab(type) {
  const re = new RegExp(`<script type="__bundler/${type}">([\\s\\S]*?)</script>`, 'i');
  const m = html.match(re);
  if (!m) throw new Error(`missing ${type}`);
  return m[1].trim();
}

const manifest = JSON.parse(grab('manifest'));
const template = JSON.parse(grab('template'));

mkdirSync('extracted', { recursive: true });
writeFileSync('extracted/template.html', template);

const extMap = {};
for (const [uuid, entry] of Object.entries(manifest)) {
  let bytes = Buffer.from(entry.data, 'base64');
  if (entry.compressed) bytes = gunzipSync(bytes);
  const ext = entry.mime.includes('javascript') ? 'js'
    : entry.mime.includes('css') ? 'css'
    : entry.mime.includes('html') ? 'html'
    : entry.mime.split('/')[1] || 'bin';
  const name = `${uuid}.${ext}`;
  writeFileSync(`extracted/${name}`, bytes);
  extMap[uuid] = { mime: entry.mime, file: name, bytes: bytes.length };
  console.log(`${name}\t${entry.mime}\t${bytes.length} bytes`);
}
console.log('\nAssets:', Object.keys(manifest).length);
