// src/App.jsx - Componente principal actualizado
import { useState } from 'react';
import { iso8583Parser } from './iso8583.js';
import { parseField63Tokens } from './tokens/index.js';
import ISOMessageInput from './ISOMessageInput.jsx';
import ISOFieldsTable from './ISOFieldsTable.jsx';
import Field63Tokens from './Field63Tokens.jsx';
import TokenRJDisplay from './TokenRJDisplay.jsx';
import './App.css';

function App() {
  const [rawMessage, setRawMessage] = useState('');
  const [parsed, setParsed] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('campos'); // 'campos' | 'campo63' | 'token-rj'

  const handleAnalyze = () => {
    setError(null);
    if (!rawMessage.trim()) {
      setError('Por favor ingresa un mensaje ISO');
      return;
    }

    try {
      const result = iso8583Parser.parse(rawMessage);
      if (result.errors.length > 0) {
        console.warn('Parser warnings:', result.errors);
      }
      // Parsear tokens del campo 63 si existe
      if (result.fields[63]?.subTokens) {
        result.field63Parsed = parseField63Tokens(result.fields[63].subTokens);
      }
      setParsed(result);
    } catch (e) {
      setError(`Error al parsear: ${e.message}`);
      setParsed(null);
    }
  };

  const handleExampleLoad = (example) => {
    setRawMessage(example);
    setError(null);
    setParsed(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
            ��� Analizador ISO 8583 BBVA
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Parser robusto para mensajes ISO 8583 + Campo 63 / Token RJ (3DS 2.0)
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg dark:bg-red-900 dark:border-red-600 dark:text-red-200">
            ������ {error}
          </div>
        )}

        {/* Input Section */}
        <ISOMessageInput 
          rawMessage={rawMessage}
          setRawMessage={setRawMessage}
          onAnalyze={handleAnalyze}
          onExampleLoad={handleExampleLoad}
        />

        {/* Results */}
        {parsed && (
          <div className="mt-8 space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                <div className="text-sm text-gray-500 dark:text-gray-400">MTI</div>
                <div className="text-2xl font-mono font-bold text-indigo-600 dark:text-indigo-400">
                  {parsed.mti}
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                <div className="text-sm text-gray-500 dark:text-gray-400">Bitmap</div>
                <div className="text-sm font-mono text-gray-700 dark:text-gray-300 break-all">
                  {iso8583Parser.formatBitmap(parsed.bitmap)}
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                <div className="text-sm text-gray-500 dark:text-gray-400">Campos presentes</div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {Object.keys(parsed.fields).length}
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                <div className="text-sm text-gray-500 dark:text-gray-400">Campo 63</div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {parsed.fields[63] ? '��� Sí' : '��� No'}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
              <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="flex -mb-px" aria-label="Tabs">
                  <button
                    onClick={() => setActiveTab('campos')}
                    className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                      activeTab === 'campos'
                        ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                    }`}
                  >
                    ��� Campos ISO ({Object.keys(parsed.fields).length})
                  </button>
                  <button
                    onClick={() => setActiveTab('campo63')}
                    className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                      activeTab === 'campo63'
                        ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                    }`}
                    disabled={!parsed.fields[63]}
                  >
                    ��� Campo 63 / Tokens
                  </button>
                  <button
                    onClick={() => setActiveTab('token-rj')}
                    className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                      activeTab === 'token-rj'
                        ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                    }`}
                    disabled={!parsed.field63Parsed?.RJ?.valido}
                  >
                    ������ Token RJ (3DS 2.0)
                  </button>
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'campos' && <ISOFieldsTable fields={parsed.fields} />}
                {activeTab === 'campo63' && parsed.fields[63] && <Field63Tokens tokens={parsed.fields[63].subTokens} parsed={parsed.field63Parsed} />}
                {activeTab === 'token-rj' && parsed.field63Parsed?.RJ && <TokenRJDisplay tokenRJ={parsed.field63Parsed.RJ} />}
              </div>
            </div>

            {/* Raw JSON (collapsible) */}
            <details className="mt-6">
              <summary className="cursor-pointer text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                Ver JSON completo (raw)
              </summary>
              <pre className="mt-2 p-4 bg-gray-100 dark:bg-gray-900 rounded text-xs overflow-auto max-h-96 font-mono">
                {JSON.stringify(parsed, null, 2)}
              </pre>
            </details>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;