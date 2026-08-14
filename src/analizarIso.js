// src/analizarIso.js - Parser & Extractor de datos resumen ISO 8583
import { iso8583Parser } from './iso8583.js';
import { parseField63Tokens, parseField63TokensFromString } from './tokens/index.js';
import { llenarCampos } from './llenarInputs.js';

let lastParsedResult = null;

export function parseIsoFull(rawMsg) {
  if (!rawMsg || typeof rawMsg !== 'string') return null;

  let cleanMsg = rawMsg.trim();
  
  // Extraer la parte ISO usando el header [L: NNN] del log BBVA si está presente
  const lMatch = cleanMsg.match(/\[L:\s*(\d+)\]ISO(.*)/s);
  if (lMatch) {
    const expectedLen = parseInt(lMatch[1], 10);
    const afterIso = lMatch[2];
    cleanMsg = 'ISO' + afterIso.substring(0, expectedLen);
  } else {
    const isoMatch = cleanMsg.match(/ISO[\s\S]*?(?=\n|\[|$)/);
    if (isoMatch) {
      cleanMsg = isoMatch[0];
    }
  }

  const result = iso8583Parser.parse(cleanMsg);

  // Parsear sub-tokens del campo 63
  if (result.fields[63]?.valor) {
    const subTokens = result.field63Tokens.length > 0 
      ? result.field63Tokens 
      : parseField63TokensFromString(result.fields[63].valor);
    result.field63Parsed = parseField63Tokens(subTokens);
  }

  // Búsqueda global de tokens BBVA (! XX00000...)
  const globalTokens = parseField63TokensFromString(cleanMsg);
  if (globalTokens.length > 0) {
    const parsedGlobal = parseField63Tokens(globalTokens);
    result.field63Parsed = { ...result.field63Parsed, ...parsedGlobal };
  }

  result.summary = extractQuickSummary(result);
  lastParsedResult = result;
  return result;
}

export function extractQuickSummary(result) {
  if (!result || !result.fields) return {};

  const mti = result.mti || '';
  const responseCode = result.fields[39]?.valor || '';

  // STAN (F11) y Fecha/Hora (F7)
  const stan = result.fields[11]?.valor || '';
  const txnDateTime = result.fields[7]?.valor || '';
  const cuatrillave = stan.slice(-4) + (txnDateTime ? txnDateTime.substring(0, 4) : '');

  // Tarjeta (F35 o F2)
  let tarjeta = '';
  const track2 = result.fields[35]?.valor || '';
  const panField = result.fields[2]?.valor || '';
  const cardRaw = track2.split('=')[0] || panField;
  if (cardRaw) {
    tarjeta = cardRaw.length >= 10 
      ? cardRaw.replace(/^(\d{6})\d+(\d{4})$/, '$1******$2')
      : cardRaw;
  }

  // Monto (F4)
  const amountRaw = result.fields[4]?.valor || '0';
  const amountNum = parseInt(amountRaw, 10);
  const monto = isNaN(amountNum) ? '0.00' : (amountNum / 100).toFixed(2);

  // Fecha y Horas (F13, F12, F7)
  const fechaMMDD = result.fields[13]?.valor || (txnDateTime ? txnDateTime.substring(0, 4) : '');
  const horaLocal = result.fields[12]?.valor || (txnDateTime ? txnDateTime.substring(4, 10) : '');
  const horaTxn = txnDateTime ? txnDateTime.substring(4, 10) : '';

  // Afiliación / Número de Comercio (F48 o F43)
  let numeroComercio = '';
  const campo48 = result.fields[48]?.valor || '';
  const afilMatch = campo48.match(/^(\d{7,10})/);
  if (afilMatch) {
    numeroComercio = afilMatch[1];
  }

  // Nombre Comercio (F43)
  const campo43 = result.fields[43]?.valor || '';
  let nombreComercio = campo43.replace(/\s+/g, ' ').trim();
  if (!numeroComercio) {
    const mxMatch = campo43.match(/MX027(\d+)/);
    if (mxMatch) {
      numeroComercio = mxMatch[1].substring(0, 10);
      nombreComercio = campo43.substring(0, mxMatch.index).trim();
    }
  }

  // Folio / RRN (F37)
  const folio = result.fields[37]?.valor || '';

  // Terminal ID (F41)
  const terminalId = result.fields[41]?.valor || '';

  return {
    mti,
    mtiDesc: result.mtiDescripcion,
    responseCode,
    cuatrillave,
    tarjeta,
    numeroComercio,
    nombreComercio,
    folio,
    monto,
    fechaMMDD,
    horaLocal,
    horaTxn,
    terminalId
  };
}

export function analizarIso05() {
  const textArea = document.getElementById("textAreaIso");
  if (!textArea) return null;

  const result = parseIsoFull(textArea.value);
  if (result && result.summary) {
    const s = result.summary;
    llenarCampos(
      s.mti,
      s.responseCode,
      s.cuatrillave,
      s.tarjeta,
      s.numeroComercio,
      s.nombreComercio,
      s.folio,
      s.monto,
      s.fechaMMDD,
      s.horaLocal,
      s.horaTxn
    );
  }
  return result;
}

export { lastParsedResult };
export default { parseIsoFull, extractQuickSummary, analizarIso05, lastParsedResult };