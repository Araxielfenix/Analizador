// src/analizarIso.js - Versión robusta usando el nuevo parser
import { iso8583Parser } from './iso8583.js';
import { parseField63Tokens } from './tokens/index.js';

let lastParsedResult = null;

export function analizarIso05() {
  // Obtener el texto del textarea "textAreaIso"
  const textArea = document.getElementById("textAreaIso");
  if (!textArea) {
    console.error('No se encontró textAreaIso');
    return;
  }

  let IsoMsg = textArea.value;
  
  // Extraer la parte ISO si tiene headers de log [T:...]
  const isoMatch = IsoMsg.match(/ISO[\dA-F]+/);
  if (isoMatch) {
    IsoMsg = isoMatch[0];
  }

  try {
    // Parsear con el nuevo parser robusto
    const result = iso8583Parser.parse(IsoMsg);
    
    if (result.errors.length > 0) {
      console.warn('Parser warnings:', result.errors);
    }

    // Parsear tokens del campo 63 si existe
    if (result.fields[63]?.subTokens) {
      result.field63Parsed = parseField63Tokens(result.fields[63].subTokens);
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
  
  // Monto liquidación (campo 5)
  const amountLiqRaw = result.fields[5]?.valor || '0';
  const montoLiq = (parseInt(amountLiqRaw, 10) / 100).toFixed(2);
  
  // Monto titular (campo 6)
  const amountTitRaw = result.fields[6]?.valor || '0';
  const montoTitular = (parseInt(amountTitRaw, 10) / 100).toFixed(2);

  // Moneda (campo 49)
  const moneda = result.fields[49]?.valor || '484'; // Default MXN

  // Fecha (campo 7 = MMDDhhmmss, campo 13 = MMDD)
  const fecha = result.fields[13]?.valor || (result.fields[7]?.valor?.substring(0, 4) || '');
  
  // Hora local (campo 12 = hhmmss)
  const hora1 = result.fields[12]?.valor || (result.fields[7]?.valor?.substring(4, 10) || '');

  // Hora transmisión (campo 7 = MMDDhhmmss)
  const hora2 = result.fields[7]?.valor?.substring(4, 10) || '';

  // Fecha liquidación (campo 15 = MMDD)
  const fechaLiq = result.fields[15]?.valor || '';
  
  // Fecha captura (campo 17 = MMDD)
  const fechaCaptura = result.fields[17]?.valor || '';

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

  // Terminal ID (campo 41)
  const terminalId = result.fields[41]?.valor || '';
  
  // MCC (campo 18)
  const mcc = result.fields[18]?.valor || '';
  
  // Folio (campo 37 = Retrieval Ref)
  const folio = result.fields[37]?.valor || '';
  
  // Auth ID (campo 38)
  const authId = result.fields[38]?.valor || '';
  
  // RRN (campo 37) - mismo que folio
  const rrn = folio;
  
  // Entry Mode (campo 22)
  const entryMode = result.fields[22]?.valor || '';
  
  // Processing Code (campo 3)
  const procCode = result.fields[3]?.valor || '';
  
  // Condition Code (campo 25)
  const condCode = result.fields[25]?.valor || '';
  
  // Acquirer Inst (campo 32)
  const acqInst = result.fields[32]?.valor || '';
  
  // Forward Inst (campo 33)
  const fwdInst = result.fields[33]?.valor || '';

  // Track 2 (campo 35)
  const track2 = result.fields[35]?.valor || '';
  const track2Present = track2 ? `SÍ (${track2.length} chars)` : 'NO';
  // Extraer PAN del track2 (antes del =)
  const track2Pan = track2 ? track2.split('=')[0] : '';

  // Campo 63 / Token RJ
  let campo63Tokens = '';
  let tokenRJ1 = '';
  let tokenRJ2 = '';
  if (result.field63Parsed) {
    const tokens = Object.keys(result.field63Parsed);
    campo63Tokens = tokens.join(', ');
    if (result.field63Parsed.RJ) {
      tokenRJ1 = result.field63Parsed.RJ.RJ1_desc || result.field63Parsed.RJ.RJ1 || '';
      tokenRJ2 = result.field63Parsed.RJ.RJ2 || '';
    }
  }

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
      hora2,             // hora2
      // Nuevos campos
      stan,              // STAN
      rrn,               // RRN
      authId,            // Auth ID
      entryMode,         // Entry Mode
      terminalId,        // Terminal ID
      mcc,               // MCC
      montoLiq,          // Monto Liquidación
      montoTitular,      // Monto Titular
      moneda,            // Moneda
      fechaLiq,          // Fecha Liquidación
      fechaCaptura,      // Fecha Captura
      procCode,          // Processing Code
      condCode,          // Condition Code
      acqInst,           // Acquirer Inst
      fwdInst,           // Forward Inst
      track2Present,     // Track 2 presente
      track2Pan,         // PAN Track2
      campo63Tokens,     // Tokens Campo 63
      tokenRJ1,          // RJ.1
      tokenRJ2           // RJ.2
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