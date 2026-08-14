// src/ISOMessageInput.jsx - Componente para input del mensaje ISO
import { useRef, useEffect } from 'react';

export default function ISOMessageInput({ 
  rawMessage, 
  setRawMessage, 
  onAnalyze, 
  onExampleLoad 
}) {
  const textareaRef = useRef(null);

  const examples = {
    // Mensaje 1 del archivo Mensaje.txt (request 0200)
    request: `[T: 11:16:06.764][D: 11044][C:    554629******2353][Iap: iap_BBVEMI-M2-05    ][Lp: 0:I0 ][Rw: W][L:  662]ISO02500007702003238C48128A1801E003000000000030000071417160690574511153907140714539901000111003456790121554629******2353=****0016313461050000000000124033UNPSP                 DF           MEXMX0278946354            00010001484016P387CPAY+0000000019EGLO000000000000000010          379& 0000800379! Q100002 90! Q200002 09! C000026 **** 001          5  1 2 2! C400012 102510023660! R700013              ! CE00202 01kBNnCDvCPMtJmT9q/V+Tr0hB4oJ0                                                                                                                                                                            ! RJ00040 2 ae37f673-cd20-4e7c-b244-e792df5e2b66`,
    
    // Mensaje 2 (response 0210)
    response: `[T: 11:16:06.874][D: 11044][C:    554629******2353][Iap: iap_BBVEMI-M2-05    ][Lp: 0:I8 ][Rw: R][L:  388]ISO0250000750210323A84012E90800A0030000000000300000714111606905745111539071407140714010111003456790121554629******2353=****00163134610500000049000000000012403302 0484019EGLO000003000000000197& 0000800197! Q100002 00! Q200002 09! C000026 **** 001          5  1 2 2! C400012 102510023660! R700013              ! RJ00040 2 ae37f673-cd20-4e7c-b244-e792df5e2b66  ! 0400020 C           E     N`,
    
    // Solo la parte ISO (sin headers de log)
    isoOnly: `ISO02500007702003238C48128A1801E003000000000030000071417160690574511153907140714539901000111003456790121554629******2353=****0016313461050000000000124033UNPSP                 DF           MEXMX0278946354            00010001484016P387CPAY+0000000019EGLO000000000000000010          379& 0000800379! Q100002 90! Q200002 09! C000026 **** 001          5  1 2 2! C400012 102510023660! R700013              ! CE00202 01kBNnCDvCPMtJmT9q/V+Tr0hB4oJ0                                                                                                                                                                            ! RJ00040 2 ae37f673-cd20-4e7c-b244-e792df5e2b66`
  };

  useEffect(() => {
    // Auto-focus on mount
    textareaRef.current?.focus();
  }, []);

  const handlePaste = (e) => {
    // Permitir pegar, el onChange actualizará
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          �������� Mensaje ISO 8583
        </h2>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => onExampleLoad(examples.isoOnly)}
            className="px-3 py-1 text-xs bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-300"
          >
            Cargar Request (0200)
          </button>
          <button
            onClick={() => onExampleLoad(examples.response)}
            className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 dark:bg-green-900 dark:text-green-300"
          >
            Cargar Response (0210)
          </button>
        </div>
      </div>

      <textarea
        ref={textareaRef}
        value={rawMessage}
        onChange={(e) => setRawMessage(e.target.value)}
        onPaste={handlePaste}
        placeholder="Pega aquí el mensaje ISO 8583 (puede incluir headers de log tipo [T:...] - se extraerá automáticamente la parte ISO)"
        className="w-full h-32 font-mono text-sm bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-y"
        spellCheck={false}
      />

      <div className="mt-3 flex gap-3">
        <button
          onClick={onAnalyze}
          disabled={!rawMessage.trim()}
          className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          �������� Analizar
        </button>
        <button
          onClick={() => setRawMessage('')}
          className="px-6 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
            ������ Limpiar
        </button>
      </div>

      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        Formatos aceptados: ISO puro, o con headers de log tipo <code className="font-mono bg-gray-200 dark:bg-gray-700 px-1 rounded">[T: 11:16:06.764]...ISO0250...</code>
      </p>
    </div>
  );
}