// src/iso8583.js - Parser ISO 8583 E-Global / BBVA Bancomer

export const EGLOBAL_FIELD_DEFS = {
  1:   { nombre: 'Bitmap Secundario', format: 'AN F 16', type: 'fija', len: 16 },
  3:   { nombre: 'Processing Code (Código de Procesamiento)', format: 'N F 6', type: 'fija', len: 6 },
  4:   { nombre: 'Transaction Amount (Monto)', format: 'N F 12', type: 'fija', len: 12 },
  5:   { nombre: 'Settlement Amount (Monto Liquidación)', format: 'N F 12', type: 'fija', len: 12 },
  7:   { nombre: 'Transmission Date and Time (Fecha/Hora Transmisión)', format: 'N F 10', type: 'fija', len: 10 },
  10:  { nombre: 'Conversion Rate, Cardholder Billing', format: 'N F 8', type: 'fija', len: 8 },
  11:  { nombre: 'System Trace Audit Number (STAN)', format: 'N F 6', type: 'fija', len: 6 },
  12:  { nombre: 'Local Transaction Time (Hora Local)', format: 'N F 6', type: 'fija', len: 6 },
  13:  { nombre: 'Local Transaction Date (Fecha Local)', format: 'N F 4', type: 'fija', len: 4 },
  15:  { nombre: 'Settlement Date (Fecha Liquidación)', format: 'N F 4', type: 'fija', len: 4 },
  17:  { nombre: 'Capture Date (Fecha Captura)', format: 'N F 4', type: 'fija', len: 4 },
  18:  { nombre: 'Merchant Type (Giro del Comercio)', format: 'N F 4', type: 'fija', len: 4 },
  22:  { nombre: 'Point of Service Entry Mode (Modo de Entrada POS)', format: 'N F 3', type: 'fija', len: 3 },
  25:  { nombre: 'Point of Service Condition Code', format: 'N F 2', type: 'fija', len: 2 },
  32:  { nombre: 'Acquiring Institution ID Code', format: 'N V 2:11', type: 'llvar', maxLen: 11 },
  35:  { nombre: 'Track 2 Data (Banda / Tarjeta)', format: 'ANS V 2:37', type: 'llvar', maxLen: 37 },
  37:  { nombre: 'Retrieval Reference Number (Folio / RRN)', format: 'AN F 12', type: 'fija', len: 12 },
  38:  { nombre: 'Authorization Identification Response (Autorización)', format: 'AN F 6', type: 'fija', len: 6 },
  39:  { nombre: 'Response Code (Código de Respuesta)', format: 'AN F 2', type: 'fija', len: 2 },
  41:  { nombre: 'Card Acceptor Terminal ID (ID Terminal POS)', format: 'ANS F 16', type: 'fija', len: 16 },
  43:  { nombre: 'Card Acceptor Name/Location (Nombre y Ubicación Comercio)', format: 'ANS F 40', type: 'fija', len: 40 },
  44:  { nombre: 'Additional Response Data', format: 'ANS V 2:25', type: 'llvar', maxLen: 25 },
  45:  { nombre: 'Track 1 Data', format: 'ANS V 2:76', type: 'llvar', maxLen: 76 },
  48:  { nombre: 'Additional Data - Retailer Data (Afiliación / Datos Comercio)', format: 'ANS V 3:27', type: 'lllvar', maxLen: 999 },
  49:  { nombre: 'Transaction Currency Code (Moneda)', format: 'N F 3', type: 'fija', len: 3 },
  50:  { nombre: 'Settlement Currency Code', format: 'N F 3', type: 'fija', len: 3 },
  52:  { nombre: 'PIN Data (PIN Cifrado)', format: 'AN F 16', type: 'fija', len: 16 },
  53:  { nombre: 'Security-Related Control Information', format: 'N F 16', type: 'fija', len: 16 },
  54:  { nombre: 'Additional Amounts', format: 'ANS V 3:12', type: 'lllvar', maxLen: 12 },
  58:  { nombre: 'Redención de Puntos / Campo 58', format: 'ANS V 3:244', type: 'lllvar', maxLen: 244 },
  59:  { nombre: 'Datos de Campaña / Campo 59', format: 'ANS V 3:999', type: 'lllvar', maxLen: 999 },
  60:  { nombre: 'POS Terminal Data', format: 'ANS V 3:16', type: 'lllvar', maxLen: 16 },
  61:  { nombre: 'POS Card Issuer Category Response Data', format: 'ANS V 3:19', type: 'lllvar', maxLen: 19 },
  62:  { nombre: 'Postal Code (Código Postal)', format: 'ANS V 3:10', type: 'lllvar', maxLen: 10 },
  63:  { nombre: 'POS Additional Data (Tokens BBVA)', format: 'ANS V 3:999', type: 'lllvar', maxLen: 999 },
  70:  { nombre: 'Network Management Information Code', format: 'N F 3', type: 'fija', len: 3 },
  90:  { nombre: 'Original Data Elements', format: 'ANS F 42', type: 'fija', len: 42 },
  103: { nombre: 'Account Identification 2', format: 'ANS V 2:28', type: 'llvar', maxLen: 28 },
  120: { nombre: 'Key Management', format: 'ANS V 3:9', type: 'lllvar', maxLen: 9 },
  123: { nombre: 'Cryptographic Service Message', format: 'ANS V 3:553', type: 'lllvar', maxLen: 553 },
  125: { nombre: 'Settlement Data Management Information', format: 'ANS F 15', type: 'fija', len: 15 }
};

export const MTI_DESCRIPTIONS = {
  '0200': 'Solicitud de Autorización Financiera (0200)',
  '0210': 'Respuesta a Solicitud de Autorización (0210)',
  '0220': 'Notificación de Autorización (Stand-In/Offline)',
  '0221': 'Notificación de Autorización (Re-envío)',
  '0230': 'Respuesta a Notificación de Autorización',
  '0420': 'Solicitud / Notificación de Reverso (0420)',
  '0421': 'Notificación de Reverso (Re-envío)',
  '0430': 'Respuesta a Notificación de Reverso (0430)',
  '0800': 'Solicitud de Administración de Red (Sign-on / Echo)',
  '0810': 'Respuesta de Administración de Red'
};

export const RESPONSE_CODE_DESCRIPTIONS = {
  '00': 'Aprobada (Approved)',
  '01': 'Referir al Emisor (Refer to card issuer)',
  '02': 'Referir al Emisor (Refer to card issuer special)',
  '03': 'Comercio Inválido (Invalid merchant)',
  '04': 'Retener Tarjeta (Pick-up card)',
  '05': 'Transacción No Honrada (Do not honor)',
  '06': 'Error General (Error)',
  '07': 'Retener Tarjeta (Pick-up card special)',
  '08': 'Aprobar con ID (Honor with ID)',
  '12': 'Transacción Inválida (Invalid transaction)',
  '13': 'Monto Inválido (Invalid amount)',
  '14': 'Tarjeta Inválida (Invalid card number)',
  '15': 'Emisor Inexistente (No such issuer)',
  '19': 'Reintentar Transacción (Re-enter transaction)',
  '30': 'Error de Formato (Format error)',
  '39': 'Cuenta de Crédito No Existe (No credit account)',
  '41': 'Tarjeta Perdida (Lost card)',
  '43': 'Tarjeta Robada (Stolen card)',
  '49': 'Reservado para Uso ISO / Proceso Especial',
  '51': 'Fondos Insuficientes (Not sufficient funds)',
  '54': 'Tarjeta Expirada (Expired card)',
  '55': 'PIN Incorrecto (Incorrect PIN)',
  '57': 'Transacción No Permitida en Tarjeta',
  '58': 'Transacción No Permitida en Terminal',
  '61': 'Excede Límite de Retiro',
  '62': 'Tarjeta Restringida',
  '68': 'Tiempo de Espera Agotado (Time Out / Late Reply)',
  '91': 'Switch / Emisor Fuera de Línea (Issuer inoperative)',
  '96': 'Falla de Sistema (System malfunction)',
  'B1': 'Transacción Susceptible de Conversión (Campañas/Puntos)'
};

export class ISO8583Parser {
  hexToBin(hex) {
    return hex.split('').map(h => parseInt(h, 16).toString(2).padStart(4, '0')).join('');
  }

  formatBitmap(hexStr) {
    if (!hexStr) return '';
    return hexStr.match(/.{1,4}/g)?.join(' ') || hexStr;
  }

  parse(isoMessage) {
    if (!isoMessage || typeof isoMessage !== 'string') {
      return { errors: ['Mensaje vacío o no es cadena de texto'] };
    }

    const raw = isoMessage.trim();
    let pos = raw.indexOf('ISO');
    if (pos === -1) pos = 0;
    else pos += 3; // Saltar 'ISO'

    const header = raw.substring(pos, pos + 9);
    pos += 9;

    const mti = raw.substring(pos, pos + 4);
    pos += 4;

    const primaryBitmapHex = raw.substring(pos, pos + 16);
    pos += 16;

    let primaryBin = this.hexToBin(primaryBitmapHex);
    let secondaryBitmapHex = null;
    let fullBin = primaryBin;

    // Si el bit 1 es '1', hay Bitmap Secundario (16 caracteres hexadecimales más)
    if (primaryBin[0] === '1') {
      secondaryBitmapHex = raw.substring(pos, pos + 16);
      pos += 16;
      fullBin += this.hexToBin(secondaryBitmapHex);
    }

    const result = {
      raw,
      header,
      headerParsed: {
        producto: header.substring(0, 2),
        release: header.substring(2, 4),
        estatus: header.substring(4, 7),
        origen: header.substring(7, 8),
        responder: header.substring(8, 9)
      },
      mti,
      mtiDescripcion: MTI_DESCRIPTIONS[mti] || `MTI ${mti}`,
      primaryBitmapHex,
      secondaryBitmapHex,
      bitmapBin: fullBin,
      fields: {},
      field63Tokens: [],
      field63Parsed: {},
      errors: []
    };

    for (let i = 0; i < fullBin.length; i++) {
      if (fullBin[i] === '1') {
        const fieldNum = i + 1;
        const def = EGLOBAL_FIELD_DEFS[fieldNum];

        if (!def) {
          result.errors.push(`Campo ${fieldNum} presente en bitmap pero sin definición en diccionario`);
          break;
        }

        let dataLen = 0;
        let afterLenPos = pos;

        if (def.type === 'fija') {
          dataLen = def.len;
        } else if (def.type === 'llvar') {
          const lenStr = raw.substring(pos, pos + 2);
          dataLen = parseInt(lenStr, 10);
          afterLenPos = pos + 2;
        } else if (def.type === 'lllvar') {
          const lenStr = raw.substring(pos, pos + 3);
          dataLen = parseInt(lenStr, 10);
          afterLenPos = pos + 3;
        }

        if (isNaN(dataLen) || dataLen < 0) {
          result.errors.push(`Campo ${fieldNum}: longitud inválida "${dataLen}"`);
          break;
        }

        const value = raw.substring(afterLenPos, afterLenPos + dataLen);
        pos = afterLenPos + dataLen;

        result.fields[fieldNum] = {
          id: fieldNum,
          nombre: def.nombre,
          format: def.format,
          longitud: dataLen,
          type: def.type,
          valor: value,
          descripcionLegible: this.humanizeFieldValue(fieldNum, value)
        };
      }
    }

    // Parsear sub-tokens del Campo 63 si está presente
    if (result.fields[63]?.valor) {
      result.field63Tokens = this.parseField63Tokens(result.fields[63].valor);
    }

    return result;
  }

  humanizeFieldValue(fieldNum, value) {
    if (!value) return '';
    switch (fieldNum) {
      case 3: {
        const typeCode = value.substring(0, 2);
        const mapType = {
          '00': 'Compra',
          '09': 'Cash Advance / Compra con Cash Back',
          '16': 'Consulta de Puntos',
          '17': 'Dinero Móvil',
          '18': 'Compra con Puntos',
          '28': 'Pago de Tarjeta',
          '40': 'Transferencia',
          '41': 'Retiro en Corresponsales',
          '42': 'Situación de Fondos "Retiro sin Tarjeta"',
          '50': 'Multipago',
          '92': 'Inicialización de Llaves'
        };
        return mapType[typeCode] ? `${value} (${mapType[typeCode]})` : value;
      }
      case 4: {
        const num = parseInt(value, 10);
        return isNaN(num) ? value : `$${(num / 100).toFixed(2)}`;
      }
      case 22: {
        const mode = value.substring(0, 2);
        const mapMode = {
          '00': 'Desconocido',
          '01': 'Manual (Digitada)',
          '02': 'Banda Magnética',
          '05': 'Chip EMV',
          '10': 'Card on File / Cargos recurrentes',
          '80': 'Fallback',
          '90': 'Banda Íntegra al Adquirente',
          '95': 'Chip Leído CVV No Confiable'
        };
        return mapMode[mode] ? `${value} (${mapMode[mode]})` : value;
      }
      case 39: {
        return RESPONSE_CODE_DESCRIPTIONS[value] ? `${value} - ${RESPONSE_CODE_DESCRIPTIONS[value]}` : value;
      }
      case 49: {
        if (value === '484') return '484 (MXN - Peso Mexicano)';
        if (value === '840') return '840 (USD - Dólar EE.UU.)';
        return value;
      }
      default:
        return value;
    }
  }

  parseField63Tokens(data) {
    if (!data) return [];
    const tokens = [];
    // tokens BBVA: ! XX00000 <valor> donde XX es el ID de token
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
}

export const iso8583Parser = new ISO8583Parser();
export default ISO8583Parser;