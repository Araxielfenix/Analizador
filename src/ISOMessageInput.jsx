// src/ISOMessageInput.jsx - Componente de entrada para el mensaje ISO 8583
import { createSignal } from 'solid-js';

export default function ISOMessageInput(props) {
  const sampleMessages = {
    request: `[T: 11:16:06.764][D: 11044][C:    554629******2353][Iap: iap_BBVEMI-M2-05    ][Lp: 0:I0 ][Rw: W][L:  662]ISO02500007702003238C48128A1801E003000000000030000071417160690574511153907140714539901000111003456790121554629******2353=****0016313461050000000000124033UNPSP                 DF           MEXMX0278946354            00010001484016P387CPAY+0000000019EGLO000000000000000010          379& 0000800379! Q100002 90! Q200002 09! C000026 **** 001          5  1 2 2! C400012 102510023660! R700013              ! CE00202 01kBNnCDvCPMtJmT9q/V+Tr0hB4oJ0                                                                                                                                                                            ! RJ00040 2 ae37f673-cd20-4e7c-b244-e792df5e2b66`,
    response: `[T: 11:16:06.874][D: 11044][C:    554629******2353][Iap: iap_BBVEMI-M2-05    ][Lp: 0:I8 ][Rw: R][L:  388]ISO0250000750210323A84012E90800A0030000000000300000714111606905745111539071407140714010111003456790121554629******2353=****00163134610500000049000000000012403302 0484019EGLO000003000000000197& 0000800197! Q100002 00! Q200002 09! C000026 **** 001          5  1 2 2! C400012 102510023660! R700013              ! RJ00040 2 ae37f673-cd20-4e7c-b244-e792df5e2b66  ! 0400020 C           E     N`,
    pureIso: `ISO02500007702003238C48128A1801E003000000000030000071417160690574511153907140714539901000111003456790121554629******2353=****0016313461050000000000124033UNPSP                 DF           MEXMX0278946354            00010001484016P387CPAY+0000000019EGLO000000000000000010          379& 0000800379! Q100002 90! Q200002 09! C000026 **** 001          5  1 2 2! C400012 102510023660! R700013              ! CE00202 01kBNnCDvCPMtJmT9q/V+Tr0hB4oJ0                                                                                                                                                                            ! RJ00040 2 ae37f673-cd20-4e7c-b244-e792df5e2b66`
  };

  const handleLoadSample = (key) => {
    const text = sampleMessages[key];
    props.onLoadMessage(text);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200/80 dark:border-slate-700/80 p-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <span className="p-2 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-xl">
              📥
            </span>
            Entrada de Mensaje ISO 8583
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Pega una trama ISO 8583 o una línea de log BBVA <code className="font-mono bg-slate-100 dark:bg-slate-700/50 px-1 py-0.5 rounded text-indigo-500">[T:...][L:...]</code>.
          </p>
        </div>

        {/* Presets */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-slate-400">Presets:</span>
          <button
            onClick={() => handleLoadSample('request')}
            className="px-3 py-1.5 text-xs font-medium bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/60 text-indigo-600 dark:text-indigo-300 rounded-lg border border-indigo-200 dark:border-indigo-800 transition"
          >
            Solicitud (0200)
          </button>
          <button
            onClick={() => handleLoadSample('response')}
            className="px-3 py-1.5 text-xs font-medium bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:hover:bg-emerald-900/60 text-emerald-600 dark:text-emerald-300 rounded-lg border border-emerald-200 dark:border-emerald-800 transition"
          >
            Respuesta (0210)
          </button>
          <button
            onClick={() => handleLoadSample('pureIso')}
            className="px-3 py-1.5 text-xs font-medium bg-purple-50 hover:bg-purple-100 dark:bg-purple-900/30 dark:hover:bg-purple-900/60 text-purple-600 dark:text-purple-300 rounded-lg border border-purple-200 dark:border-purple-800 transition"
          >
            ISO Puro
          </button>
        </div>
      </div>

      {/* Textarea */}
      <textarea
        value={props.rawMessage || ''}
        onInput={(e) => props.onMessageChange(e.target.value)}
        placeholder="Pega el mensaje ISO 8583 aquí..."
        className="w-full h-36 font-mono text-xs sm:text-sm bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all resize-y shadow-inner"
        spellCheck={false}
      />

      {/* Actions */}
      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={props.onAnalyze}
            disabled={!props.rawMessage?.trim()}
            className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-indigo-500/25 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            ⚡ Parsear y Analizar Mensaje
          </button>
          <button
            onClick={props.onClear}
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-medium text-sm rounded-xl transition"
          >
            🧹 Limpiar
          </button>
        </div>

        <span className="text-xs text-slate-400 font-mono hidden sm:inline">
          {props.rawMessage ? `${props.rawMessage.length} caracteres` : ''}
        </span>
      </div>
    </div>
  );
}