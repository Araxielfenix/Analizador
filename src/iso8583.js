// src/iso8583.js - Parser ISO 8583 robusto (SolidJS compatible, sin JSX)
export class ISO8583Parser {
  constructor() {
    this.fieldDefs = {
      0:  { id: 0,  nombre: 'MTI',              longitud: 'fija',  largo: 4,  tipo: 'n' },
      1:  { id: 1,  nombre: 'Bitmap Extendido', longitud: 'fija',  largo: 16, tipo: 'b' },
      2:  { id: 2,  nombre: 'PAN',              longitud: 'llvar', largo: 19, tipo: 'n' },
      3:  { id: 3,  nombre: 'Processing Code',  longitud: 'fija',  largo: 6,  tipo: 'n' },
      4:  { id: 4,  nombre: 'Amount',           longitud: 'fija',  largo: 12, tipo: 'n' },
      5:  { id: 5,  nombre: 'Settlement Amount',longitud: 'fija',  largo: 12, tipo: 'n' },
      6:  { id: 6,  nombre: 'Cardholder Bill Amt',longitud: 'fija', largo: 12, tipo: 'n' },
      7:  { id: 7,  nombre: 'Txn Date Time',    longitud: 'fija',  largo: 10, tipo: 'n' },
      8:  { id: 8,  nombre: 'Cardholder Bill Conv',longitud: 'fija', largo: 8,  tipo: 'n' },
      9:  { id: 9,  nombre: 'Settlement Conv Rate',longitud: 'fija', largo: 8,  tipo: 'n' },
      10: { id: 10, nombre: 'Cardholder Conv Rate',longitud: 'fija', largo: 8,  tipo: 'n' },
      11: { id: 11, nombre: 'STAN',             longitud: 'fija',  largo: 6,  tipo: 'n' },
      12: { id: 12, nombre: 'Local Time',       longitud: 'fija',  largo: 6,  tipo: 'n' },
      13: { id: 13, nombre: 'Local Date',       longitud: 'fija',  largo: 4,  tipo: 'n' },
      14: { id: 14, nombre: 'Expiration Date',  longitud: 'fija',  largo: 4,  tipo: 'n' },
      15: { id: 15, nombre: 'Settlement Date',  longitud: 'fija',  largo: 4,  tipo: 'n' },
      16: { id: 16, nombre: 'Conversion Date',  longitud: 'fija',  largo: 4,  tipo: 'n' },
      17: { id: 17, nombre: 'Capture Date',     longitud: 'fija',  largo: 4,  tipo: 'n' },
      18: { id: 18, nombre: 'Merchant Type',    longitud: 'fija',  largo: 4,  tipo: 'n' },
      19: { id: 19, nombre: 'Acq Country',      longitud: 'fija',  largo: 3,  tipo: 'n' },
      20: { id: 20, nombre: 'Issuer Country',   longitud: 'fija',  largo: 3,  tipo: 'n' },
      21: { id: 21, nombre: 'Forward Country',  longitud: 'fija',  largo: 3,  tipo: 'n' },
      22: { id: 22, nombre: 'Entry Mode',       longitud: 'fija',  largo: 3,  tipo: 'n' },
      23: { id: 23, nombre: 'Card Seq Number',  longitud: 'fija',  largo: 3,  tipo: 'n' },
      24: { id: 24, nombre: 'Network Intl ID',  longitud: 'fija',  largo: 3,  tipo: 'n' },
      25: { id: 25, nombre: 'POS Cond Code',    longitud: 'fija',  largo: 2,  tipo: 'n' },
      26: { id: 26, nombre: 'POS PIN Cap Code', longitud: 'fija',  largo: 2,  tipo: 'n' },
      27: { id: 27, nombre: 'Auth ID Response', longitud: 'fija',  largo: 1,  tipo: 'n' },
      28: { id: 28, nombre: 'Txn Fee Amount',   longitud: 'llvar', largo: 9,  tipo: 'n' },
      29: { id: 29, nombre: 'Settlement Fee',   longitud: 'llvar', largo: 9,  tipo: 'n' },
      30: { id: 30, nombre: 'Txn Proc Fee',     longitud: 'llvar', largo: 9,  tipo: 'n' },
      31: { id: 31, nombre: 'Acquirer Fee',     longitud: 'llvar', largo: 9,  tipo: 'n' },
      32: { id: 32, nombre: 'Acq Inst ID',      longitud: 'llvar', largo: 11, tipo: 'n' },
      33: { id: 33, nombre: 'Forward Inst ID',  longitud: 'llvar', largo: 11, tipo: 'n' },
      34: { id: 34, nombre: 'PAN Extended',     longitud: 'llvar', largo: 28, tipo: 'n' },
      35: { id: 35, nombre: 'Track 2 Data',     longitud: 'llvar', largo: 37, tipo: 'z' },
      36: { id: 36, nombre: 'Track 3 Data',     longitud: 'lllvar',largo: 104, tipo: 'z' },
      37: { id: 37, nombre: 'Retrieval Ref',    longitud: 'fija',  largo: 12, tipo: 'an' },
      38: { id: 38, nombre: 'Auth ID Response', longitud: 'fija',  largo: 6,  tipo: 'an' },
      39: { id: 39, nombre: 'Response Code',    longitud: 'fija',  largo: 2,  tipo: 'an' },
      40: { id: 40, nombre: 'Service Restr',    longitud: 'fija',  largo: 3,  tipo: 'an' },
      41: { id: 41, nombre: 'Card Acceptor Term ID',longitud: 'fija', largo: 8,  tipo: 'an' },
      42: { id: 42, nombre: 'Card Acceptor ID', longitud: 'fija',  largo: 15, tipo: 'an' },
      43: { id: 43, nombre: 'Card Acceptor Name/Loc',longitud: 'fija', largo: 40, tipo: 'ans' },
      44: { id: 44, nombre: 'Add Resp Data',    longitud: 'llvar', largo: 25, tipo: 'an' },
      45: { id: 45, nombre: 'Track 1 Data',     longitud: 'llvar', largo: 76, tipo: 'z' },
      46: { id: 46, nombre: 'Add ISO Data',     longitud: 'lllvar',largo: 999, tipo: 'an' },
      47: { id: 47, nombre: 'Add National Data',longitud: 'lllvar',largo: 999, tipo: 'an' },
      48: { id: 48, nombre: 'Add Private Data', longitud: 'lllvar',largo: 999, tipo: 'an' },
      49: { id: 49, nombre: 'Currency Code',    longitud: 'fija',  largo: 3,  tipo: 'n' },
      50: { id: 50, nombre: 'Settlement Currency',longitud: 'fija', largo: 3,  tipo: 'n' },
      51: { id: 51, nombre: 'Cardholder Currency',longitud: 'fija', largo: 3,  tipo: 'n' },
      52: { id: 52, nombre: 'PIN Data',         longitud: 'fija',  largo: 16, tipo: 'b' },
      53: { id: 53, nombre: 'Security Control', longitud: 'fija',  largo: 16, tipo: 'b' },
      54: { id: 54, nombre: 'Add Amounts',      longitud: 'lllvar',largo: 120, tipo: 'an' },
      55: { id: 55, nombre: 'EMV Data',         longitud: 'lllvar',largo: 255, tipo: 'b' },
      56: { id: 56, nombre: 'Reserved ISO',     longitud: 'lllvar',largo: 999, tipo: 'an' },
      57: { id: 57, nombre: 'Reserved National',longitud: 'lllvar',largo: 999, tipo: 'an' },
      58: { id: 58, nombre: 'Reserved Private', longitud: 'lllvar',largo: 999, tipo: 'an' },
      59: { id: 59, nombre: 'Reserved Private', longitud: 'lllvar',largo: 999, tipo: 'an' },
      60: { id: 60, nombre: 'Private Use',      longitud: 'lllvar',largo: 999, tipo: 'an' },
      61: { id: 61, nombre: 'Private Use',      longitud: 'lllvar',largo: 999, tipo: 'an' },
      62: { id: 62, nombre: 'Private Use',      longitud: 'lllvar',largo: 999, tipo: 'an' },
      63: { id: 63, nombre: 'Private Use (BBVA Tokens)',longitud: 'lllvar',largo: 999, tipo: 'an' },
      64: { id: 64, nombre: 'MAC',              longitud: 'fija',  largo: 16, tipo: 'b' },
    };
  }

  hexToBin(hex) {
    return hex.split('').map(h => parseInt(h, 16).toString(2).padStart(4, '0')).join('');
  }

  readLength(msg, pos, type, fieldLargo) {
      if (type === 'fija') return { len: fieldLargo || 0, pos };
      if (type === 'llvar') {
        const len = parseInt(msg.substr(pos, 2), 10);
        return { len, pos: pos + 2 };
      }
      if (type === 'lllvar') {
        const len = parseInt(msg.substr(pos, 3), 10);
        return { len, pos: pos + 3 };
      }
      return { len: 0, pos };
    }

  parseBitmap(msg, pos) {
    let primaryHex = msg.substr(pos, 16);
    if (primaryHex.length < 16) throw new Error('Bitmap primario incompleto');
    let bin = this.hexToBin(primaryHex);
    pos += 16;

    let secondaryBits = '';
    if (bin[0] === '1') {
      let secondaryHex = msg.substr(pos, 16);
      if (secondaryHex.length < 16) throw new Error('Bitmap secundario incompleto');
      secondaryBits = this.hexToBin(secondaryHex);
      pos += 16;
    }

    const fullBitmap = bin + secondaryBits;
    return { bitmap: fullBitmap, pos, primaryHex, secondaryHex: secondaryBits ? secondaryBits : null };
  }

  parse(isoMessage) {
    const msg = isoMessage.trim();
    let pos = 0;
    const result = {
      raw: msg,
      mti: '',
      bitmap: '',
      bitmapHex: '',
      secondaryBitmapHex: null,
      fields: {},
      errors: []
    };

    try {
      // Buscar "ISO" y extraer MTI real (4 dígitos después de "ISO")
      let searchPos = msg.indexOf('ISO');
      if (searchPos === -1) {
        // Si no hay "ISO", asumir que el mensaje empieza directo con MTI
        searchPos = 0;
      } else {
        searchPos += 3; // Saltar "ISO"
      }
      
      if (msg.length < searchPos + 4) throw new Error('Mensaje muy corto para MTI');
      result.mti = msg.substr(searchPos, 4);
      pos = searchPos + 4;

      const { bitmap, pos: newPos, primaryHex, secondaryHex } = this.parseBitmap(msg, pos);
      result.bitmap = bitmap;
      result.bitmapHex = primaryHex;
      result.secondaryBitmapHex = secondaryHex;
      pos = newPos;

      for (let i = 0; i < bitmap.length; i++) {
        if (bitmap[i] === '1') {
          const fieldNum = i + 1;
          const def = this.fieldDefs[fieldNum];
          if (!def) {
            result.errors.push(`Campo ${fieldNum} no definido en diccionario`);
            const { len, pos: newPos2 } = this.readLength(msg, pos, 'lllvar');
            pos = newPos2 + len;
            continue;
          }

          const { len, pos: afterLen } = this.readLength(msg, pos, def.longitud, def.largo);
          if (pos + len > msg.length) {
            result.errors.push(`Campo ${fieldNum}: longitud ${len} excede mensaje restante`);
            break;
          }
          const value = msg.substr(pos, len);
          pos = afterLen + len;

          result.fields[fieldNum] = {
            id: fieldNum,
            nombre: def.nombre,
            valor: value,
            longitud: len,
            tipo: def.tipo,
            longitudTipo: def.longitud
          };
        }
      }

      if (result.fields[63]) {
        result.fields[63].subTokens = this.parseField63Tokens(result.fields[63].valor);
      }

      return result;
    } catch (e) {
      result.errors.push(`Error parseando: ${e.message}`);
      return result;
    }
  }

  parseField63Tokens(data) {
      const tokens = [];
      // Tokens BBVA: ! XX00000 <valor> donde XX = 2-3 chars (Q1, Q2, C0, C4, R7, CE, RJ, 04)
      const regex = /!\s*([A-Z0-9]{2,3})(\d{5})\s+([^!]*)/g;
      let match;
    while ((match = regex.exec(data)) !== null) {
      const [, id, lenStr, value] = match;
      const len = parseInt(lenStr, 10);
      const cleanValue = value.trim().substring(0, len);
      tokens.push({ id, longitud: len, valor: cleanValue, raw: match[0] });
    }
    return tokens;
  }

  formatBitmap(bin) {
    return bin.match(/.{1,4}/g).join(' ');
  }
}

export const iso8583Parser = new ISO8583Parser();
export default ISO8583Parser;