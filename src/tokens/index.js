// src/tokens/index.js - Decodificador de Tokens del Campo 63 (BBVA Bancomer / E-Global)
import { tokenRJParser } from './rj.js';

export const MEDIOS_ACCESO_Q2 = {
  '00': '00 - Desconocido (Por omisión)',
  '01': '01 - Autorización por Voz',
  '02': '02 - Cargos Automáticos',
  '03': '03 - Terminal Punto de Venta (TPV)',
  '04': '04 - Interred',
  '05': '05 - Banca Electrónica',
  '06': '06 - Sucursal',
  '07': '07 - Cajeros Automáticos (ATM)',
  '08': '08 - Ventas por Teléfono / Correo (MOTO)',
  '09': '09 - Comercio Electrónico (E-Commerce)',
  '10': '10 - Adquirente Doméstico',
  '11': '11 - Adquirente Internacional',
  '12': '12 - Red de Cajeros Doméstica',
  '13': '13 - Red de Cajeros Internacional',
  '14': '14 - Audiorespuesta',
  '17': '17 - Servidores Multicaja',
  '20': '20 - Quick Payment Service (QPS)'
};

export const MODO_AUTORIZACION_Q1 = {
  '0': '0 - Respuesta por el emisor en línea (Autorizado o Declinado)',
  '1': '1 - Respuesta por el Switch fuera de línea (Stand-In)',
  '2': '2 - Capturado Off-line por el negocio en punto de servicio',
  '4': '4 - Autorizado Off-line del negocio (Archivo Negativo)',
  '5': '5 - Transacción forzada o de ajuste (220)',
  '6': '6 - Respuesta por Stand-In con listas positivas',
  '9': '9 - Default / Por omisión',
  '90': '90 - Respuesta por Host / Default en Requerimiento',
  '00': '00 - Respuesta Aprobada en Línea'
};

export function parseTokenQ1(valor) {
  const code = valor.trim();
  return {
    id: 'Q1',
    nombre: 'Modo de Autorización',
    raw: valor,
    desc: MODO_AUTORIZACION_Q1[code] || `Modo: ${code}`
  };
}

export function parseTokenQ2(valor) {
  const code = valor.trim();
  return {
    id: 'Q2',
    nombre: 'Medio de Acceso',
    raw: valor,
    desc: MEDIOS_ACCESO_Q2[code] || `Medio de acceso: ${code}`
  };
}

export function parseTokenC0(valor) {
  return {
    id: 'C0',
    nombre: 'Validación CVV2 / CVC2 / CAVV',
    raw: valor,
    desc: 'Códigos de validación de seguridad de tarjeta y criptograma de autenticación'
  };
}

export function parseTokenC4(valor) {
  const attendedMap = { '0': 'Atendida por personal', '1': 'No atendida (autoservicio)', '2': 'Sin terminal (voz)' };
  const locMap = { '0': 'En local del comercio', '1': 'Remota', '2': 'Ubicación Tarjetahabiente (E-Commerce)', '3': 'Sin terminal' };
  
  const attended = valor.length >= 1 ? attendedMap[valor[0]] || valor[0] : '';
  const loc = valor.length >= 3 ? locMap[valor[2]] || valor[2] : '';

  return {
    id: 'C4',
    nombre: 'Datos de la Terminal POS',
    raw: valor,
    desc: `Terminal ${attended}${loc ? ' | Ubicación: ' + loc : ''}`
  };
}

export function parseTokenR7(valor) {
  const bonusFlag = valor[0] || '';
  const isBonus = bonusFlag === 'S' ? 'Sí (Terminal propia con soporte de campañas)' : bonusFlag === 'N' ? 'No (Sin soporte de campañas)' : 'Terminal ajena';
  return {
    id: 'R7',
    nombre: 'Indicador Bonus Merchant & Referencia Campañas',
    raw: valor,
    desc: `Bonus Merchant: ${isBonus}`
  };
}

export function parseTokenCE(valor) {
  return {
    id: 'CE',
    nombre: 'Cifrado / Token de Seguridad',
    raw: valor,
    desc: 'Token de datos cifrados de la transacción / Criptograma'
  };
}

export const tokenParsers = {
  'RJ': tokenRJParser,
  'Q1': { parse: parseTokenQ1 },
  'Q2': { parse: parseTokenQ2 },
  'C0': { parse: parseTokenC0 },
  'C4': { parse: parseTokenC4 },
  'R7': { parse: parseTokenR7 },
  'CE': { parse: parseTokenCE }
};

export function parseField63TokensFromString(data) {
  if (!data) return [];
  const tokens = [];
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

export function parseField63Tokens(subTokens) {
  const results = {};
  for (const token of subTokens) {
    const parser = tokenParsers[token.id];
    if (parser) {
      results[token.id] = parser.parse(token.valor);
    } else {
      results[token.id] = {
        id: token.id,
        longitud: token.longitud,
        valor: token.valor,
        parsed: false,
        desc: `Subtoken ${token.id} (Longitud: ${token.longitud})`
      };
    }
  }
  return results;
}

export default { tokenParsers, parseField63Tokens, parseField63TokensFromString };