// src/Field63Tokens.jsx - Visualización de sub-tokens del Campo 63
export default function Field63Tokens({ tokens, parsed }) {
  if (!tokens || tokens.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        No hay sub-tokens en el Campo 63
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Sub-tokens Campo 63 ({tokens.length})
        </h3>
        <span className="text-xs bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 px-2 py-1 rounded">
          BBVA Private Use
        </span>
      </div>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {tokens.map((token, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-lg text-indigo-600 dark:text-indigo-400">
                  {token.id}
                </span>
                <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">
                  {token.longitud} chars
                </span>
                {parsed[token.id]?.valido === false && (
                  <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">
                    Error
                  </span>
                )}
                {parsed[token.id]?.valido === true && parsed[token.id].parsed !== false && (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                    Parseado
                  </span>
                )}
              </div>
            </div>
            
            <div className="font-mono text-xs text-gray-700 dark:text-gray-300 break-all bg-gray-50 dark:bg-gray-900 p-2 rounded mb-2 max-h-24 overflow-auto">
              {token.valor}
            </div>

            {parsed[token.id] && parsed[token.id].parsed !== false && (
              <details className="text-xs">
                <summary className="cursor-pointer text-indigo-600 dark:text-indigo-400 hover:underline">
                  Ver detalles parseados
                </summary>
                <pre className="mt-2 p-2 bg-gray-100 dark:bg-gray-900 rounded overflow-auto max-h-40">
                  {JSON.stringify(parsed[token.id], null, 2)}
                </pre>
              </details>
            )}

            {parsed[token.id]?.error && (
              <div className="mt-2 p-2 bg-red-50 dark:bg-red-900/30 rounded text-red-700 dark:text-red-300 text-xs">
                {parsed[token.id].error}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}