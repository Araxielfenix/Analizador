// src/Field63Tokens.jsx - Inspección visual de tokens del Campo 63
import { For, Show } from 'solid-js';

export default function Field63Tokens(props) {
  const tokens = () => props.tokens || [];
  const parsed = () => props.parsed || {};

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          🏷️ Sub-Tokens BBVA / Campo 63 ({tokens().length})
        </h3>
        <span className="text-xs font-semibold px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-full border border-purple-200 dark:border-purple-800">
          Formato ! ID + Longitud + Valor
        </span>
      </div>

      <Show
        when={tokens().length > 0}
        fallback={
          <div className="text-center py-10 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 text-slate-500">
            No se detectaron subtokens del Campo 63 en este mensaje.
          </div>
        }
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <For each={tokens()}>
            {(token) => {
              const p = () => parsed()[token.id];
              return (
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 shadow-sm hover:shadow-md transition">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-black text-xl text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 rounded-lg border border-indigo-200 dark:border-indigo-800">
                        {token.id}
                      </span>
                      <span className="text-xs font-medium text-slate-500 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-md">
                        {token.longitud} bytes
                      </span>
                    </div>

                    <Show when={p()}>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                        Decodificado
                      </span>
                    </Show>
                  </div>

                  {/* Valor Crudo */}
                  <div className="font-mono text-xs bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 p-2.5 rounded-lg border border-slate-200/80 dark:border-slate-800 break-all mb-3 max-h-24 overflow-auto">
                    {token.valor || <span className="text-slate-400">&lt;vacío&gt;</span>}
                  </div>

                  {/* Interpretación */}
                  <Show when={p() && p().desc}>
                    <div className="text-xs font-sans font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/30 p-2 rounded-lg border border-emerald-200/40 dark:border-emerald-900/40">
                      💡 {p().desc}
                    </div>
                  </Show>

                  <Show when={p() && p().rj1}>
                    <div className="text-xs font-sans space-y-1 text-slate-700 dark:text-slate-300 bg-indigo-50/40 dark:bg-indigo-950/30 p-2 rounded-lg border border-indigo-200/40 dark:border-indigo-900/40">
                      <div><strong>Protocolo:</strong> {p().rj1.descripcion}</div>
                      <div><strong>DS-TXN-ID:</strong> {p().rj2.raw || 'N/A'}</div>
                    </div>
                  </Show>
                </div>
              );
            }}
          </For>
        </div>
      </Show>
    </div>
  );
}