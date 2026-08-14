// src/TokenRJDisplay.jsx - Visualización detallada del Token RJ (3DS 2.0)
export default function TokenRJDisplay({ tokenRJ }) {
  if (!tokenRJ || tokenRJ.error) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        {tokenRJ?.error || 'Token RJ no disponible'}
      </div>
    );
  }

  const formatted = tokenRJ.formatForUI ? tokenRJ.formatForUI(tokenRJ) : {};
  
  // Determinar si es MasterCard o Visa
  const isMastercard = tokenRJ.rj1?.esMastercard;
  const isVisa = tokenRJ.rj1?.esVisa;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
            �������� Token RJ — Indicador Protocolo 3DS 2.0
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Campo ISO 63 — Anexo V BBVA — Longitud fija: 40 chars (00040)
          </p>
        </div>
        <div className="flex gap-2">
          {isMastercard && (
            <span className="px-3 py-1 bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 rounded-full text-sm font-medium">
              �������� MasterCard
            </span>
          )}
          {isVisa && (
            <span className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded-full text-sm font-medium">
              �������� Visa
            </span>
          )}
          {!isMastercard && !isVisa && (
            <span className="px-3 py-1 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-full text-sm">
              �������� Marca no determinada
            </span>
          )}
        </div>
      </div>

      {/* RJ.1 - Protocolo 3DS */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
            <span className="font-mono text-indigo-600 dark:text-indigo-400">RJ.1</span>
            Protocolo 3DS
          </h4>
          <span className={`px-3 py-1 rounded-full text-sm font-mono ${
            isMastercard ? 'bg-red-100 text-red-700' :
            isVisa ? 'bg-blue-100 text-blue-700' :
            'bg-gray-100 text-gray-700'
          }`}>
            Valor: {tokenRJ.rj1?.raw || 'N/A'}
          </span>
        </div>
        <div className="bg-gray-50 dark:bg-gray-900 rounded p-4 font-mono text-base">
          {formatted['RJ.1 Protocolo 3DS'] || tokenRJ.rj1?.descripcion || 'Sin descripción'}
        </div>
        <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
          MasterCard: 0=Desconocido, 1=3DS 1.0, 2=3DS 2.0 | Visa: 0=3DS 1.02, 1-9/A/B/D/E/F=3DS 2.0 varios flows
        </div>
      </div>

      {/* RJ.2 - DS-TXN-ID */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2 mb-4">
          <span className="font-mono text-indigo-600 dark:text-indigo-400">RJ.2</span>
          DS-TXN-ID (Directory Server Transaction ID)
        </h4>
        <div className="bg-gray-50 dark:bg-gray-900 rounded p-4 font-mono text-sm break-all">
          {tokenRJ.rj2?.raw || 'No presente (espacios)'}
        </div>
        <div className="mt-3 flex items-center gap-4 text-sm">
          <span className={`px-2 py-1 rounded ${tokenRJ.rj2?.esUUID ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'}`}>
            {tokenRJ.rj2?.esUUID ? '��� UUID válido (formato estándar)' : '��� No es UUID estándar'}
          </span>
          <span className="text-gray-500 dark:text-gray-400">
            Uso exclusivo MasterCard 3DS 2.0
          </span>
        </div>
      </div>

      {/* RJ.3 - User Field (futuro) */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2 mb-4">
          <span className="font-mono text-indigo-600 dark:text-indigo-400">RJ.3</span>
          Campo de Usuario / Futuro
        </h4>
        <div className="bg-gray-50 dark:bg-gray-900 rounded p-4 font-mono text-sm">
          {tokenRJ.rj3?.raw ? `Valor: "${tokenRJ.rj3.raw}"` : 'Espacios (no utilizado)'}
        </div>
        <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
          {tokenRJ.rj3?.descripcion || 'Reservado para uso futuro. Debe venir en espacios.'}
        </div>
      </div>

      {/* Notas de implementación BBVA */}
      <div className="bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
        <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2 flex items-center gap-2">
          ������ Notas de implementación BBVA (según Anexo V)
        </h4>
        <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
          <li>��� Adquirente nacional 3DS 2.0 MasterCard: Autorizador BBVA exige indicador versión 2.0</li>
          <li>��� Token RJ con valores default si no viene de adquirente BBVA para bins MasterCard: RJ.1=00, RJ.2=espacios</li>
          <li>��� Si Token vacío en transacción bin MasterCard → fluye hacia emisor BBVA</li>
          <li>��� Adquirente nacional 3DS 2.0 Visa: BBVA NO recibe indicador 3DS 2.0; Token no se envía a emisor</li>
          <li>��� Adquirente Internacional MasterCard: Mapear DE 48.66.1 → RJ.1, DE 48.66.2 → RJ.2</li>
          <li>��� Adquirente Internacional Visa: BBVA NO recibe indicador 3DS 2.0</li>
        </ul>
      </div>

      {/* Raw JSON */}
      <details className="bg-gray-100 dark:bg-gray-900 rounded p-4">
        <summary className="cursor-pointer text-sm text-gray-500 dark:text-gray-400">
          Ver JSON completo del Token RJ
        </summary>
        <pre className="mt-2 text-xs overflow-auto">
          {JSON.stringify(tokenRJ, null, 2)}
        </pre>
      </details>
    </div>
  );
}