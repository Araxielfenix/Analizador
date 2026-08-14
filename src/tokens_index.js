// src/tokens/index.js - Registry de tokens del Campo 63 (BBVA)

import { tokenRJParser } from './rj.js';

// Mapa de parsers por ID de token (3 chars)
export const tokenParsers = {
  'RJ': tokenRJParser,
  // Futuro: agregar Q1, Q2, C0, C4, R7, CE, etc.
};

// Parsea todos los sub-tokens del campo 63
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

export default { tokenParsers, parseField63Tokens };