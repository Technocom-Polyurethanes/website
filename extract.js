import fs from 'fs';

const html = fs.readFileSync('/tmp/attachments/7456fb66_index - Copy.html', 'utf-8');
const start = html.indexOf('const L={');
const end = html.indexOf('/* ---------------- language ---------------- */');

if (start !== -1 && end !== -1) {
  const dict = `export ` + html.substring(start, end).trim();
  fs.writeFileSync('src/translations.ts', dict);
  console.log('Translations saved');
} else {
  console.log('Match failed: start ' + start + ' end ' + end);
}
