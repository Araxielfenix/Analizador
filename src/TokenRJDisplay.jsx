// src/TokenRJDisplay.jsx - Visualización detallada del Token RJ (3DS 2.0)
import { Show } from 'solid-js';

export default function TokenRJDisplay(props) {
  const tokenRJ = () => props.tokenRJ || {};

  const isMastercard = () => tokenRJ().rj1?.esMastercard;
  const isVisa = () => tokenRJ().rj1?.esVisa;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-6 rounded-2xl shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-lg text-xs font-mono font-bold">
              Token RJ (Campo 63)
            </span>
            <span className="text-xs text-indigo-200">Anexo V - Protocolo 3DS 2.0</span>
          </div>
          <h3 className="text-2xl font-black mt-2 tracking-tight">
            🔐 Indicador de Autenticación 3D Secure 2.0
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Longitud fija: 40 caracteres (00040). Requerido para autorizaciones E-Commerce seguras.
          </p>
        </div>

        <div className="flex gap-2">
          <Show when={isMastercard()}>
            <span className="px-3.5 py-1.5 bg-red-500/20 text-red-300 border border-red-500/40 rounded-xl text-xs font-bold flex items-center gap-1.5">
              🔴 MasterCard
            </span>
          </Show>
          <Show when={isVisa()}>
            <span className="px-3.5 py-1.5 bg-blue-500/20 text-blue-300 border border-blue-500/40 rounded-xl text-xs font-bold flex items-center gap-1.5">
              🔵 Visa
            </span>
          </Show>
        </div>
      </div>

      {/* RJ.1 */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <span className="font-mono bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded text-sm">
              RJ.1
            </span>
            Versión y Método de Autenticación 3DS
          </h4>
          <span className="font-mono text-xs font-bold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-lg">
            Valor: "{tokenRJ().rj1?.raw || ''}"
          </span>
        </div>
        <div className="font-mono text-sm bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
          {tokenRJ().rj1?.descripcion || 'Sin descripción'}
        </div>
      </div>

      {/* RJ.2 */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <span className="font-mono bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded text-sm">
              RJ.2
            </span>
            DS-TXN-ID (Directory Server Transaction ID)
          </h4>
          <Show when={tokenRJ().rj2?.esUUID}>
            <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-lg border border-emerald-200 dark:border-emerald-800">
              ✓ UUID Válido
            </span>
          </Show>
        </div>
        <div className="font-mono text-sm bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-4 rounded-xl border border-slate-200 dark:border-slate-800 break-all select-all">
          {tokenRJ().rj2?.raw || 'No presente'}
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
          Identificador único universal de transacción otorgado por el Directory Server (DS) de la marca.
        </p>
      </div>

      {/* BBVA Specification notes */}
      <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 rounded-2xl p-5 text-xs text-amber-800 dark:text-amber-300 space-y-2">
        <h5 className="font-bold text-sm flex items-center gap-2">
          💡 Reglas de Negocio BBVA Bancomer (Anexo V - ISO 8583):
        </h5>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>MasterCard Nacional:</strong> Obligatorio enviar indicador de versión 3DS 2.0. Si no viene informado, se asignan valores por omisión (RJ.1=00, RJ.2=espacios).</li>
          <li><strong>Visa Nacional:</strong> El autorizador BBVA no recibe este indicador; no se contempla en el envío.</li>
          <li><strong>Internacional MasterCard:</strong> Mapeo desde DE 48.66.1 (RJ.1) y DE 48.66.2 (RJ.2).</li>
        </ul>
      </div>
    </div>
  );
}