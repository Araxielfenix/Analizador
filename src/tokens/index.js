// src/tokens/index.js - Registry de tokens del Campo 63 (BBVA)
import { tokenRJParser } from './rj.js';

export const tokenParsers = {
  'RJ': tokenRJParser,
  // Futuro: agregar Q1, Q2, C0, C4, R7, CE, etc.
};

// Extrae tokens del string crudo (campo 48/47/63 o ISO completo)
// Formato BBVA: ! XX00000 <valor> donde XX = 2-3 chars
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

// Aplica los parsers por ID a un array de tokens {id, longitud, valor}
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
        nota: 'Parser no implementado para este token'
      };
    }
  }
  
  return results;
}

export default { tokenParsers, parseField63Tokens, parseField63TokensFromString };