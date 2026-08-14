// src/QuickInputs.jsx - Componente de resumen de campos principales
import { createSignal } from 'solid-js';

export default function QuickInputs(props) {
  const [copied, setCopied] = createSignal(false);

  const summary = () => props.summary || {};

  const handleCopySummary = () => {
    const s = summary();
    if (!s.mti && !s.tarjeta && !s.folio) return;

    const text = [
      `Código (MTI): ${s.mti || ''} - ${s.mtiDesc || ''}`,
      `Código Respuesta (F39): ${s.responseCode || ''}`,
      `Cuatrillave: ${s.cuatrillave || ''}`,
      `Tarjeta: ${s.tarjeta || ''}`,
      `Afiliación / Núm. Comercio: ${s.numeroComercio || ''}`,
      `Nombre Comercio: ${s.nombreComercio || ''}`,
      `Folio (RRN): ${s.folio || ''}`,
      `Monto: $${s.monto || '0.00'}`,
      `Fecha (MMDD): ${s.fechaMMDD || ''}`,
      `Hora Local: ${s.horaLocal || ''}`,
      `Hora Transmisión: ${s.horaTxn || ''}`
    ].join('\n');

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200/80 dark:border-slate-700/80 p-6 transition-all duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-700/60">
        <div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            📊 Resumen de Transacción (Inputs)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Valores clave desglosados del mensaje ISO 8583 listo para validación o reporte.
          </p>
        </div>
        <button
          onClick={handleCopySummary}
          disabled={!summary().mti}
          className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 shadow-md ${
            copied()
              ? 'bg-emerald-600 text-white shadow-emerald-500/20 ring-2 ring-emerald-400'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/20 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed'
          }`}
        >
          {copied() ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>¡Copiado al Portapapeles!</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              <span>Copiar Resumen</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* MTI */}
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Código (MTI)
          </label>
          <input
            type="text"
            readOnly
            value={summary().mti || ''}
            placeholder="0200 / 0210"
            className="w-full font-mono text-center font-bold text-indigo-600 dark:text-indigo-400 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm focus:outline-none"
          />
        </div>

        {/* Response Code */}
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Código Respuesta (F39)
          </label>
          <input
            type="text"
            readOnly
            value={summary().responseCode || ''}
            placeholder="00 (Approved)"
            className="w-full font-mono text-center font-bold text-emerald-600 dark:text-emerald-400 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm focus:outline-none"
          />
        </div>

        {/* Cuatrillave */}
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Cuatrillave
          </label>
          <input
            type="text"
            readOnly
            value={summary().cuatrillave || ''}
            placeholder="STAN + Fecha"
            className="w-full font-mono text-center text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm focus:outline-none"
          />
        </div>

        {/* Tarjeta */}
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Tarjeta (PAN)
          </label>
          <input
            type="text"
            readOnly
            value={summary().tarjeta || ''}
            placeholder="554629******2353"
            className="w-full font-mono text-center text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm focus:outline-none"
          />
        </div>

        {/* Monto */}
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Monto (F4)
          </label>
          <input
            type="text"
            readOnly
            value={summary().monto ? `$${summary().monto}` : ''}
            placeholder="$0.00"
            className="w-full font-mono text-center font-bold text-amber-600 dark:text-amber-400 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm focus:outline-none"
          />
        </div>

        {/* Folio RRN */}
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Folio (RRN F37)
          </label>
          <input
            type="text"
            readOnly
            value={summary().folio || ''}
            placeholder="001631346105"
            className="w-full font-mono text-center text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm focus:outline-none"
          />
        </div>

        {/* Número Comercio / Afiliación */}
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Afiliación / Num. Comercio
          </label>
          <input
            type="text"
            readOnly
            value={summary().numeroComercio || ''}
            placeholder="8946354"
            className="w-full font-mono text-center text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm focus:outline-none"
          />
        </div>

        {/* Nombre Comercio */}
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Nombre Comercio
          </label>
          <input
            type="text"
            readOnly
            value={summary().nombreComercio || ''}
            placeholder="UNPSP DF MEX"
            className="w-full font-sans text-center text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm focus:outline-none truncate"
          />
        </div>

        {/* Fecha */}
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Fecha (MMDD)
          </label>
          <input
            type="text"
            readOnly
            value={summary().fechaMMDD || ''}
            placeholder="MMDD"
            className="w-full font-mono text-center text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm focus:outline-none"
          />
        </div>

        {/* Hora Local */}
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Hora Local (F12)
          </label>
          <input
            type="text"
            readOnly
            value={summary().horaLocal ? `${summary().horaLocal.substring(0,2)}:${summary().horaLocal.substring(2,4)}:${summary().horaLocal.substring(4,6)}` : ''}
            placeholder="HH:MM:SS"
            className="w-full font-mono text-center text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm focus:outline-none"
          />
        </div>

        {/* Hora Transmisión */}
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Hora Transmisión (F7)
          </label>
          <input
            type="text"
            readOnly
            value={summary().horaTxn ? `${summary().horaTxn.substring(0,2)}:${summary().horaTxn.substring(2,4)}:${summary().horaTxn.substring(4,6)}` : ''}
            placeholder="HH:MM:SS"
            className="w-full font-mono text-center text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm focus:outline-none"
          />
        </div>

        {/* Terminal ID */}
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Terminal ID (F41)
          </label>
          <input
            type="text"
            readOnly
            value={summary().terminalId || ''}
            placeholder="0000000000124033"
            className="w-full font-mono text-center text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
