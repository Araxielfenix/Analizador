// src/ISOFieldsTable.jsx - Tabla de campos ISO parseados
import { iso8583Parser } from './iso8583.js';

export default function ISOFieldsTable({ fields }) {
  if (!fields || Object.keys(fields).length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        No hay campos para mostrar
      </div>
    );
  }

  // Ordenar campos por número
  const sortedFields = Object.values(fields).sort((a, b) => a.id - b.id);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm font-mono">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800 text-left text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wider">
            <th className="px-3 py-2 w-16">Tag</th>
            <th className="px-3 py-2">Nombre</th>
            <th className="px-3 py-2 w-16">Long</th>
            <th className="px-3 py-2 w-16">Tipo</th>
            <th className="px-3 py-2">Valor</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {sortedFields.map((field) => (
            <tr key={field.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
              <td className="px-3 py-2 font-medium text-indigo-600 dark:text-indigo-400">
                {field.id.toString().padStart(3, '0')}
              </td>
              <td className="px-3 py-2 text-gray-700 dark:text-gray-300 max-w-xs truncate" title={field.nombre}>
                {field.nombre}
              </td>
              <td className="px-3 py-2 text-gray-500 dark:text-gray-400 text-right">
                {field.longitud}
              </td>
              <td className="px-3 py-2 text-gray-500 dark:text-gray-400">
                <span className={`inline-block px-1.5 py-0.5 rounded text-xs ${
                  field.tipo === 'n' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' :
                  field.tipo === 'b' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300' :
                  field.tipo === 'z' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300' :
                  'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                }`}>
                  {field.tipo}
                </span>
              </td>
              <td className="px-3 py-2 text-gray-900 dark:text-gray-100 break-all font-mono text-xs">
                {field.valor || '<vacío>'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded text-xs text-gray-600 dark:text-gray-400">
        <strong>Leyenda tipos:</strong>{' '}
        <span className="inline-block px-1.5 py-0.5 rounded ml-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">n=numeric</span>{' '}
        <span className="inline-block px-1.5 py-0.5 rounded ml-1 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">an=alphanumeric</span>{' '}
        <span className="inline-block px-1.5 py-0.5 rounded ml-1 bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">b=binary</span>{' '}
        <span className="inline-block px-1.5 py-0.5 rounded ml-1 bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300">z=track</span>
      </div>
    </div>
  );
}