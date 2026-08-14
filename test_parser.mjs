import {iso8583Parser} from './src/iso8583.js';
import {parseField63Tokens} from './src/tokens/index.js';
import fs from 'fs';

const msg = fs.readFileSync('C:/Temp/Mensaje.txt', 'utf8');
console.log('=== MENSAJE 1 ===');
const lines = msg.split('\n');
const iso1 = lines[0].match(/ISO[\dA-F]+/)[0];
console.log('ISO extraído:', iso1);
const r1 = iso8583Parser.parse(iso1);
console.log('MTI:', r1.mti);
console.log('Bitmap:', r1.bitmapHex);
console.log('Campos:', Object.keys(r1.fields).length);
if(r1.fields[63]) {
  console.log('Campo 63: SI');
  console.log('Subtokens:', r1.fields[63].subTokens?.length);
  console.log('Subtokens IDs:', r1.fields[63].subTokens?.map(t=>t.id));
  if(r1.fields[63].subTokens) {
    r1.fields[63].subTokens.forEach(t=>console.log('  -', t.id, t.longitud, t.valor.substring(0,50)));
  }
  if(r1.field63Parsed?.RJ) {
    console.log('RJ:', JSON.stringify(r1.field63Parsed.RJ, null, 2));
  }
}