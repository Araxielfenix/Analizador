// src/analizarIso.js - Versión robusta usando el nuevo parser
import { iso8583Parser } from './iso8583.js';
import { parseField63Tokens, parseField63TokensFromString } from './tokens/index.js';

let lastParsedResult = null;

export function analizarIso05() {
  // Obtener el texto del textarea "textAreaIso"
  const textArea = document.getElementById("textAreaIso");
  if (!textArea) {
    console.error('No se encontró textAreaIso');
    return;
  }

  let IsoMsg = textArea.value;
  
  // Extraer la parte ISO usando el header [L: NNN] del log BBVA
  // Esto es CRÍTICO: el mensaje tiene espacios y caracteres no-hex,
  // así que el regex /ISO[\dA-F]+/ se detenía en el primer espacio.
  const lMatch = IsoMsg.match(/\[L:\s*(\d+)\]ISO(.*)/s);
  if (lMatch) {
    const expectedLen = parseInt(lMatch[1], 10);
    const afterIso = lMatch[2];
    IsoMsg = afterIso.substring(0, expectedLen);
  } else {
    // Fallback: buscar "ISO" y tomar hasta el siguiente [ o fin de línea
    const isoMatch = IsoMsg.match(/ISO[\s\S]*?(?=\n|\[|$)/);
    if (isoMatch) {
      IsoMsg = isoMatch[0];
    }
  }

  try {
    // Parsear con el nuevo parser robusto
    const result = iso8583Parser.parse(IsoMsg);
    
    if (result.errors.length > 0) {
      console.warn('Parser warnings:', result.errors);
    }

    // Parsear tokens del campo 63 si existe (estándar ISO)
    if (result.fields[63]?.subTokens) {
      result.field63Parsed = parseField63Tokens(result.fields[63].subTokens);
    }
    
    // Parsear tokens BBVA en campo 48 (Add Private Data) - ¡BBVA usa este campo!
    if (result.fields[48]?.valor) {
      const tokens48 = parseField63TokensFromString(result.fields[48].valor);
      if (tokens48.length > 0) {
        result.field63Parsed = { ...result.field63Parsed, ...parseField63Tokens(tokens48) };
        console.log('Tokens BBVA encontrados en campo 48:', tokens48.map(t => t.id).join(', '));
      }
    }
    
    // Parsear tokens BBVA en campo 47 (Add National Data) - también puede tener tokens
    if (result.fields[47]?.valor) {
      const tokens47 = parseField63TokensFromString(result.fields[47].valor);
      if (tokens47.length > 0) {
        result.field63Parsed = { ...result.field63Parsed, ...parseField63Tokens(tokens47) };
        console.log('Tokens BBVA encontrados en campo 47:', tokens47.map(t => t.id).join(', '));
      }
    }

    // Parseo GLOBAL: buscar TODOS los tokens BBVA (! XX00000 ...) en el ISO completo
    // Esto captura RJ y cualquier token que quede fuera de los campos 47/48
    const globalTokens = parseField63TokensFromString(IsoMsg);
    if (globalTokens.length > 0) {
      const parsedGlobal = parseField63Tokens(globalTokens);
      result.field63Parsed = { ...result.field63Parsed, ...parsedGlobal };
      const newTokens = Object.keys(parsedGlobal).filter(k => !result.field63Parsed?.[k]);
      if (newTokens.length > 0) {
        console.log('Tokens BBVA encontrados en ISO completo (barrido global):', newTokens.join(', '));
      }
    }

    lastParsedResult = result;
    
    // Llenar campos en la UI (compatibilidad con código existente)
    llenarCamposDesdeResultado(result);
    
    return result;
  } catch (e) {
    console.error('Error al parsear:', e);
    alert('Error al parsear mensaje ISO: ' + e.message);
    return null;
  }
}

// Función de compatibilidad para llenar los inputs existentes
function llenarCamposDesdeResultado(result) {
  // MTI / Código transacción
  const mti = result.mti || '';
  const codigo1 = mti.substring(0, 4); // 0200, 0210, etc
  
  // Campo 39 = Response Code
  const responseCode = result.fields[39]?.valor || '';
  
  // Cuatrillave (últimos 4 dígitos STAN + primeros 4 de fecha/hora)
  const stan = result.fields[11]?.valor || '';
  const txnDateTime = result.fields[7]?.valor || '';
  const cuatrillave = stan.slice(-4) + (txnDateTime ? txnDateTime.substring(0, 4) : '');

  // PAN (campo 2)
  const pan = result.fields[2]?.valor || '';
  const tarjeta = pan.replace(/(\d{6})\d+(\d{4})/, '$1******$2'); // Enmascarar

  // Monto (campo 4)
  const amountRaw = result.fields[4]?.valor || '0';
  const monto = (parseInt(amountRaw, 10) / 100).toFixed(2);

  // Fecha (campo 7 = MMDDhhmmss, campo 13 = MMDD)
  const fecha = result.fields[13]?.valor || (result.fields[7]?.valor?.substring(0, 4) || '');
  
  // Hora local (campo 12 = hhmmss)
  const hora1 = result.fields[12]?.valor || (result.fields[7]?.valor?.substring(4, 10) || '');

  // Hora transmisión (campo 7 = MMDDhhmmss)
  const hora2 = result.fields[7]?.valor?.substring(4, 10) || '';

  // Número de comercio (extraer del campo 43)
  let numeroComercio = '';
  const campo43 = result.fields[43]?.valor || '';
  const mx027Match = campo43.match(/MX027(\d+)/);
  if (mx027Match) {
    numeroComercio = mx027Match[1].substring(0, 10);
  } else {
    // Fallback: buscar patrón de 10 dígitos
    const digits = campo43.match(/\d{10,}/);
    if (digits) numeroComercio = digits[0].substring(0, 10);
  }

  // Nombre comercio (campo 43, antes de MX027)
  let nombreComercio = '';
  if (mx027Match) {
    nombreComercio = campo43.substring(0, mx027Match.index).trim();
  } else {
    nombreComercio = campo43.trim().substring(0, 40);
  }

  // Folio (campo 37 = Retrieval Ref)
  const folio = result.fields[37]?.valor || '';

  // Llamar a la función original de llenarInputs
  if (typeof llenarCampos === 'function') {
    llenarCampos(
      codigo1,           // código1 (MTI)
      responseCode,      // código2 (Response Code)
      cuatrillave,       // cuatrillave
      tarjeta,           // tarjeta (enmascarada)
      numeroComercio,    // numeroComercio
      nombreComercio,    // nombreComercio
      folio,             // folio
      monto,             // monto
      fecha,             // fecha
      hora1,             // hora1
      hora2              // hora2
    );
  }

  // MOSTRAR TOKEN RJ EN CONSOLA PARA DEBUG
  if (result.field63Parsed?.RJ) {
    console.log('=== TOKEN RJ DETECTADO ===', result.field63Parsed.RJ);
  }
  
  if (result.field63Parsed) {
    console.log('=== CAMPO 63 TOKENS ===', result.field63Parsed);
  }
}

// Exportar para uso externo
export { lastParsedResult };
export default { analizarIso05, lastParsedResult };