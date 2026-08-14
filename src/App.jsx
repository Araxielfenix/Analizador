// src/App.jsx - Componente principal de la Aplicación SolidJS
import { createSignal, createEffect, Show } from 'solid-js';
import { parseIsoFull } from './analizarIso.js';
import ISOMessageInput from './ISOMessageInput.jsx';
import QuickInputs from './QuickInputs.jsx';
import ISOFieldsTable from './ISOFieldsTable.jsx';
import Field63Tokens from './Field63Tokens.jsx';
import TokenRJDisplay from './TokenRJDisplay.jsx';

function App() {
  const [rawMessage, setRawMessage] = createSignal('');
  const [parsed, setParsed] = createSignal(null);
  const [activeTab, setActiveTab] = createSignal('resumen');
  const [isDarkMode, setIsDarkMode] = createSignal(
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  // Sync dark mode class on html / document element
  createEffect(() => {
    if (isDarkMode()) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  });

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode());

  const handleAnalyze = () => {
    const text = rawMessage();
    if (!text || !text.trim()) return;

    try {
      const result = parseIsoFull(text);
      setParsed(result);
    } catch (e) {
      console.error('Error al analizar:', e);
    }
  };

  const handleLoadMessage = (msg) => {
    setRawMessage(msg);
    const result = parseIsoFull(msg);
    setParsed(result);
  };

  const handleClear = () => {
    setRawMessage('');
    setParsed(null);
  };

  const fieldsCount = () => (parsed()?.fields ? Object.keys(parsed().fields).length : 0);
  const tokensCount = () => (parsed()?.field63Tokens ? parsed().field63Tokens.length : 0);
  const hasTokenRJ = () => Boolean(parsed()?.field63Parsed?.RJ);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300 pb-16">
      {/* Header Bar */}
      <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/Araxielfenix/Analizador"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[10px] flex items-center justify-center font-black text-indigo-600 dark:text-indigo-400 text-sm">
                  ISO
                </div>
              </div>
              <div>
                <h1 className="font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-800 dark:from-white dark:via-indigo-200 dark:to-slate-300 bg-clip-text text-transparent">
                  Analizador ISO 8583
                </h1>
                <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-400 tracking-wider uppercase">
                  E-Global / BBVA Bancomer
                </p>
              </div>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold rounded-full border border-indigo-200 dark:border-indigo-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Especificación 2021
            </span>

            {/* Links a otras herramientas */}
            <a
              href="https://araxielfenix.github.io/Comparador/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-block px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
            >
              Comparador
            </a>
            <a
              href="https://araxielfenix.github.io/Formateador-ISO8583/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-block px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
            >
              Formateador
            </a>

            {/* Dark Mode Switch */}
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors shadow-inner"
              aria-label="Cambiar tema"
            >
              {isDarkMode() ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Input Area */}
        <ISOMessageInput
          rawMessage={rawMessage()}
          onMessageChange={setRawMessage}
          onAnalyze={handleAnalyze}
          onLoadMessage={handleLoadMessage}
          onClear={handleClear}
        />

        {/* Results Area */}
        <Show when={parsed()}>
          <div className="space-y-6 animate-fadeIn">
            {/* Quick Summary Inputs */}
            <QuickInputs summary={parsed()?.summary} />

            {/* Tabs Bar */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200/80 dark:border-slate-700/80 overflow-hidden">
              <div className="border-b border-slate-200 dark:border-slate-700 px-4 pt-3 bg-slate-50/50 dark:bg-slate-900/30">
                <nav className="flex gap-2 overflow-x-auto pb-px" aria-label="Tabs">
                  <button
                    onClick={() => setActiveTab('resumen')}
                    className={`px-5 py-3 font-semibold text-xs sm:text-sm rounded-t-xl transition-all border-b-2 ${
                      activeTab() === 'resumen'
                        ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-800 shadow-sm'
                        : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                    }`}
                  >
                    📋 Resumen Rápido
                  </button>

                  <button
                    onClick={() => setActiveTab('campos')}
                    className={`px-5 py-3 font-semibold text-xs sm:text-sm rounded-t-xl transition-all border-b-2 ${
                      activeTab() === 'campos'
                        ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-800 shadow-sm'
                        : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                    }`}
                  >
                    🔍 Campos ISO 8583 ({fieldsCount()})
                  </button>

                  <button
                    onClick={() => setActiveTab('campo63')}
                    className={`px-5 py-3 font-semibold text-xs sm:text-sm rounded-t-xl transition-all border-b-2 ${
                      activeTab() === 'campo63'
                        ? 'border-purple-600 text-purple-600 dark:text-purple-400 bg-white dark:bg-slate-800 shadow-sm'
                        : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                    }`}
                  >
                    🏷️ Sub-Tokens BBVA ({tokensCount()})
                  </button>

                  <button
                    onClick={() => setActiveTab('token-rj')}
                    disabled={!hasTokenRJ()}
                    className={`px-5 py-3 font-semibold text-xs sm:text-sm rounded-t-xl transition-all border-b-2 ${
                      activeTab() === 'token-rj'
                        ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400 bg-white dark:bg-slate-800 shadow-sm'
                        : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 disabled:opacity-40 disabled:cursor-not-allowed'
                    }`}
                  >
                    🔐 Token RJ (3DS 2.0)
                  </button>

                  <button
                    onClick={() => setActiveTab('json')}
                    className={`px-5 py-3 font-semibold text-xs sm:text-sm rounded-t-xl transition-all border-b-2 ${
                      activeTab() === 'json'
                        ? 'border-slate-600 text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 shadow-sm'
                        : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                    }`}
                  >
                    💻 JSON Raw
                  </button>
                </nav>
              </div>

              {/* Tab Contents */}
              <div className="p-6">
                <Show when={activeTab() === 'resumen'}>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700/60">
                        <div className="text-xs font-semibold text-slate-400 uppercase">ISO Header</div>
                        <div className="font-mono text-xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-1">
                          {parsed()?.header}
                        </div>
                      </div>

                      <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700/60">
                        <div className="text-xs font-semibold text-slate-400 uppercase">Tipo Mensaje (MTI)</div>
                        <div className="font-mono text-xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-1">
                          {parsed()?.mti}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                          {parsed()?.mtiDescripcion}
                        </div>
                      </div>

                      <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700/60">
                        <div className="text-xs font-semibold text-slate-400 uppercase">Bitmap Primario (Hex)</div>
                        <div className="font-mono text-sm font-bold text-slate-700 dark:text-slate-300 mt-1 truncate">
                          {parsed()?.primaryBitmapHex}
                        </div>
                      </div>

                      <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700/60">
                        <div className="text-xs font-semibold text-slate-400 uppercase">Campos Extraídos</div>
                        <div className="font-mono text-xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
                          {fieldsCount()} campos
                        </div>
                      </div>
                    </div>

                    <ISOFieldsTable fields={parsed()?.fields} />
                  </div>
                </Show>

                <Show when={activeTab() === 'campos'}>
                  <ISOFieldsTable fields={parsed()?.fields} />
                </Show>

                <Show when={activeTab() === 'campo63'}>
                  <Field63Tokens tokens={parsed()?.field63Tokens} parsed={parsed()?.field63Parsed} />
                </Show>

                <Show when={activeTab() === 'token-rj'}>
                  <TokenRJDisplay tokenRJ={parsed()?.field63Parsed?.RJ} />
                </Show>

                <Show when={activeTab() === 'json'}>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-slate-500">Estructura del resultado JSON:</span>
                      <button
                        onClick={() => navigator.clipboard.writeText(JSON.stringify(parsed(), null, 2))}
                        className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-xs font-medium rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600"
                      >
                        Copiar JSON
                      </button>
                    </div>
                    <pre className="p-4 bg-slate-900 text-slate-100 rounded-xl text-xs overflow-auto max-h-[500px] font-mono">
                      {JSON.stringify(parsed(), null, 2)}
                    </pre>
                  </div>
                </Show>
              </div>
            </div>
          </div>
        </Show>
      </main>
    </div>
  );
}

export default App;