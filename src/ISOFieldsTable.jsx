// src/ISOFieldsTable.jsx - Tabla interactiva de campos ISO 8583
import { createSignal, For, Show } from 'solid-js';

export default function ISOFieldsTable(props) {
  const [search, setSearch] = createSignal('');
  const [copiedId, setCopiedId] = createSignal(null);

  const sortedFields = () => {
    if (!props.fields) return [];
    return Object.values(props.fields).sort((a, b) => a.id - b.id);
  };

  const filteredFields = () => {
    const q = search().toLowerCase().trim();
    if (!q) return sortedFields();
    return sortedFields().filter(
      (f) =>
        f.id.toString().includes(q) ||
        f.nombre.toLowerCase().includes(q) ||
        (f.valor && f.valor.toLowerCase().includes(q)) ||
        (f.descripcionLegible && f.descripcionLegible.toLowerCase().includes(q))
    );
  };

  const copyFieldValue = (field) => {
    if (!field.valor) return;
    navigator.clipboard.writeText(field.valor).then(() => {
      setCopiedId(field.id);
      setTimeout(() => setCopiedId(null), 1800);
    });
  };

  return (
    <div className="space-y-4">
      {/* Search Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
            🔍
          </span>
          <input
            type="text"
            value={search()}
            onInput={(e) => setSearch(e.target.value)}
            placeholder="Buscar por número de campo, nombre o valor..."
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>
        <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          Mostrando {filteredFields().length} de {sortedFields().length} campos activos
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700/80 shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800/80 text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
              <th className="px-4 py-3 w-16">Bit</th>
              <th className="px-4 py-3">Nombre del Campo</th>
              <th className="px-4 py-3 w-28">Formato</th>
              <th className="px-4 py-3 w-20 text-right">Long.</th>
              <th className="px-4 py-3">Valor Parseado / Interpretación</th>
              <th className="px-4 py-3 w-16 text-center">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700/60 bg-white dark:bg-slate-900/40 text-xs sm:text-sm font-mono">
            <For each={filteredFields()}>
              {(field) => (
                <tr className="hover:bg-indigo-50/50 dark:hover:bg-slate-800/60 transition-colors group">
                  {/* Bit / Field ID */}
                  <td className="px-4 py-3 font-bold text-indigo-600 dark:text-indigo-400">
                    F{field.id.toString().padStart(2, '0')}
                  </td>

                  {/* Field Name */}
                  <td className="px-4 py-3 font-sans font-medium text-slate-800 dark:text-slate-200">
                    {field.nombre}
                  </td>

                  {/* Format Badge */}
                  <td className="px-4 py-3">
                    <span className="inline-block px-2 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {field.format || field.type}
                    </span>
                  </td>

                  {/* Length */}
                  <td className="px-4 py-3 text-right font-semibold text-slate-500 dark:text-slate-400">
                    {field.longitud}
                  </td>

                  {/* Value / Description */}
                  <td className="px-4 py-3 text-slate-900 dark:text-slate-100 break-all">
                    <div className="font-mono text-xs text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-950 p-1.5 rounded-lg border border-slate-200/60 dark:border-slate-800">
                      {field.valor || <span className="text-slate-400 font-sans italic">&lt;vacío&gt;</span>}
                    </div>
                    <Show when={field.descripcionLegible && field.descripcionLegible !== field.valor}>
                      <div className="mt-1 text-xs font-sans font-medium text-emerald-600 dark:text-emerald-400">
                        💡 {field.descripcionLegible}
                      </div>
                    </Show>
                  </td>

                  {/* Copy Button */}
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => copyFieldValue(field)}
                      title="Copiar valor"
                      className="p-1.5 rounded-lg hover:bg-indigo-100 dark:hover:bg-slate-700 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                    >
                      {copiedId() === field.id ? (
                        <span className="text-emerald-500 font-sans font-bold text-xs">✓</span>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      )}
                    </button>
                  </td>
                </tr>
              )}
            </For>
          </tbody>
        </table>
      </div>
    </div>
  );
}