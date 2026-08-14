import {blur} from './blurAlerta.js';

const inputsDatos = () => {
    return (
        <div id="divInputs">
            {/* Botón Analizar */}
            <div class="grid justify-items-center grid-cols-1 pt-3 pb-5">
                <a id="analizarButton"
                    class="inline-block select-none rounded border border-current px-8 py-3 text-sm font-medium bg-indigo-600 text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-indigo-500"
                    href="#" onclick={blur}>
                    Analizar
                </a>
            </div>

            {/* Sección 1: Códigos de transacción y respuesta */}
            <fieldset class="w-full max-w-4xl mx-auto mb-4 p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50">
                <legend class="px-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400">Códigos de Transacción</legend>
                <div class="flex gap-3 justify-center flex-wrap">
                    <div class="flex flex-col items-center gap-1">
                        <input type="text" id="codigo1" disabled name="200" 
                            class="px-3 py-2 text-gray-700 dark:text-white text-center bg-white dark:bg-slate-700 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 w-32" 
                            placeholder="MTI (0200)" title="Message Type Indicator: 0200=Request, 0210=Response, 0400=Reversal, etc." />
                        <label class="text-xs text-slate-500 dark:text-slate-400">MTI</label>
                    </div>
                    <div class="flex flex-col items-center gap-1">
                        <input type="text" id="codigo2" disabled name="210" 
                            class="px-3 py-2 text-gray-700 dark:text-white text-center bg-white dark:bg-slate-700 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 w-32" 
                            placeholder="Resp (00)" title="Código de respuesta (Campo 39): 00=Aprobado, 01=Referir, 05=No honrar, 51=Fondos insuficientes, etc." />
                        <label class="text-xs text-slate-500 dark:text-slate-400">Resp. Code</label>
                    </div>
                </div>
            </fieldset>

            {/* Sección 2: Identificadores clave */}
            <fieldset class="w-full max-w-4xl mx-auto mb-4 p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50">
                <legend class="px-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400">Identificadores</legend>
                <div class="flex gap-3 justify-center flex-wrap">
                    <div class="flex flex-col items-center gap-1">
                        <input type="text" id="cuatrillave" disabled name="cuatri" 
                            class="px-3 py-2 text-gray-700 dark:text-white text-center bg-white dark:bg-slate-700 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 w-40" 
                            placeholder="Cuatrillave" title="Últimos 4 dígitos STAN + primeros 4 de fecha/hora (Campo 11 + Campo 7)" />
                        <label class="text-xs text-slate-500 dark:text-slate-400">Cuatrillave</label>
                    </div>
                    <div class="flex flex-col items-center gap-1">
                        <input type="text" id="stan" disabled name="stan" 
                            class="px-3 py-2 text-gray-700 dark:text-white text-center bg-white dark:bg-slate-700 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 w-24" 
                            placeholder="STAN" title="System Trace Audit Number (Campo 11) - 6 dígitos" />
                        <label class="text-xs text-slate-500 dark:text-slate-400">STAN</label>
                    </div>
                    <div class="flex flex-col items-center gap-1">
                        <input type="text" id="rrn" disabled name="rrn" 
                            class="px-3 py-2 text-gray-700 dark:text-white text-center bg-white dark:bg-slate-700 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 w-40" 
                            placeholder="RRN" title="Retrieval Reference Number (Campo 37) - 12 dígitos" />
                        <label class="text-xs text-slate-500 dark:text-slate-400">RRN</label>
                    </div>
                    <div class="flex flex-col items-center gap-1">
                        <input type="text" id="authId" disabled name="auth" 
                            class="px-3 py-2 text-gray-700 dark:text-white text-center bg-white dark:bg-slate-700 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 w-24" 
                            placeholder="Auth ID" title="Authorization ID Response (Campo 38) - 6 dígitos" />
                        <label class="text-xs text-slate-500 dark:text-slate-400">Auth ID</label>
                    </div>
                </div>
            </fieldset>

            {/* Sección 3: Tarjeta y comercio */}
            <fieldset class="w-full max-w-4xl mx-auto mb-4 p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50">
                <legend class="px-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400">Tarjeta y Comercio</legend>
                <div class="flex gap-3 justify-center flex-wrap">
                    <div class="flex flex-col items-center gap-1 w-72">
                        <input type="text" id="tarjeta" disabled name="card" 
                            class="px-3 py-2 text-gray-700 dark:text-white text-center bg-white dark:bg-slate-700 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 w-full" 
                            placeholder="Tarjeta (enmascarada)" title="PAN enmascarado: primeros 6 + últimos 4 (Campo 2)" />
                        <label class="text-xs text-slate-500 dark:text-slate-400">PAN</label>
                    </div>
                    <div class="flex flex-col items-center gap-1 w-72">
                        <input type="text" id="entryMode" disabled name="entry" 
                            class="px-3 py-2 text-gray-700 dark:text-white text-center bg-white dark:bg-slate-700 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 w-full" 
                            placeholder="Entry Mode" title="Modo de entrada (Campo 22): 051=Chip, 071=Contactless, 021=Magstripe, 801=E-commerce, etc." />
                        <label class="text-xs text-slate-500 dark:text-slate-400">Entry Mode</label>
                    </div>
                </div>
                <div class="flex gap-3 justify-center flex-wrap pt-2">
                    <div class="flex flex-col items-center gap-1 w-72">
                        <input type="text" id="nombreComercio" disabled name="com" 
                            class="px-3 py-2 text-gray-700 dark:text-white text-center bg-white dark:bg-slate-700 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 w-full" 
                            placeholder="Nombre comercio" title="Card Acceptor Name/Location (Campo 43)" />
                        <label class="text-xs text-slate-500 dark:text-slate-400">Comercio</label>
                    </div>
                    <div class="flex flex-col items-center gap-1 w-48">
                        <input type="text" id="numeroComercio" disabled name="numCom" 
                            class="px-3 py-2 text-gray-700 dark:text-white text-center bg-white dark:bg-slate-700 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 w-full" 
                            placeholder="Nº comercio" title="Número de comercio extraído de Campo 43 (MX027...)" />
                        <label class="text-xs text-slate-500 dark:text-slate-400">Nº Comercio</label>
                    </div>
                    <div class="flex flex-col items-center gap-1 w-48">
                        <input type="text" id="terminalId" disabled name="termId" 
                            class="px-3 py-2 text-gray-700 dark:text-white text-center bg-white dark:bg-slate-700 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 w-full" 
                            placeholder="Terminal" title="Card Acceptor Terminal ID (Campo 41)" />
                        <label class="text-xs text-slate-500 dark:text-slate-400">Terminal ID</label>
                    </div>
                    <div class="flex flex-col items-center gap-1 w-36">
                        <input type="text" id="mcc" disabled name="mcc" 
                            class="px-3 py-2 text-gray-700 dark:text-white text-center bg-white dark:bg-slate-700 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 w-full" 
                            placeholder="MCC" title="Merchant Category Code (Campo 18)" />
                        <label class="text-xs text-slate-500 dark:text-slate-400">MCC</label>
                    </div>
                </div>
            </fieldset>

            {/* Sección 4: Montos */}
            <fieldset class="w-full max-w-4xl mx-auto mb-4 p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50">
                <legend class="px-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400">Montos y Moneda</legend>
                <div class="flex gap-3 justify-center flex-wrap">
                    <div class="flex flex-col items-center gap-1">
                        <input type="text" id="monto" disabled name="money" 
                            class="px-3 py-2 text-gray-700 dark:text-white text-center bg-white dark:bg-slate-700 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 w-40" 
                            placeholder="Monto" title="Amount Transaction (Campo 4) - en centavos, mostrado en formato moneda" />
                        <label class="text-xs text-slate-500 dark:text-slate-400">Monto</label>
                    </div>
                    <div class="flex flex-col items-center gap-1">
                        <input type="text" id="montoLiq" disabled name="moneyLiq" 
                            class="px-3 py-2 text-gray-700 dark:text-white text-center bg-white dark:bg-slate-700 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 w-40" 
                            placeholder="Monto Liq." title="Settlement Amount (Campo 5)" />
                        <label class="text-xs text-slate-500 dark:text-slate-400">Monto Liq.</label>
                    </div>
                    <div class="flex flex-col items-center gap-1">
                        <input type="text" id="montoTitular" disabled name="moneyCard" 
                            class="px-3 py-2 text-gray-700 dark:text-white text-center bg-white dark:bg-slate-700 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 w-40" 
                            placeholder="Monto Tit." title="Cardholder Billing Amount (Campo 6)" />
                        <label class="text-xs text-slate-500 dark:text-slate-400">Monto Tit.</label>
                    </div>
                    <div class="flex flex-col items-center gap-1">
                        <input type="text" id="moneda" disabled name="curr" 
                            class="px-3 py-2 text-gray-700 dark:text-white text-center bg-white dark:bg-slate-700 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 w-24" 
                            placeholder="Moneda" title="Transaction Currency Code (Campo 49): 484=MXN, 840=USD, 978=EUR" />
                        <label class="text-xs text-slate-500 dark:text-slate-400">Moneda</label>
                    </div>
                </div>
            </fieldset>

            {/* Sección 5: Fechas y Horas (FORZADO 24h) */}
            <fieldset class="w-full max-w-4xl mx-auto mb-4 p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50">
                <legend class="px-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400">Fechas y Horas (Formato 24h)</legend>
                <div class="flex gap-3 justify-center flex-wrap">
                    <div class="flex flex-col items-center gap-1">
                        <input type="date" id="fecha" disabled name="fecha" 
                            class="px-3 py-2 text-gray-700 dark:text-white text-center bg-white dark:bg-slate-700 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 w-44" 
                            title="Local Date (Campo 13) o derivada de Campo 7 (MMDD)" />
                        <label class="text-xs text-slate-500 dark:text-slate-400">Fecha Local</label>
                    </div>
                    <div class="flex flex-col items-center gap-1">
                        <input type="time" id="hora1" disabled name="hora1" step="1"
                            class="px-3 py-2 text-gray-700 dark:text-white text-center bg-white dark:bg-slate-700 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 w-36" 
                            title="Local Time HH:MM:SS 24h (Campo 12)" />
                        <label class="text-xs text-slate-500 dark:text-slate-400">Hora Local</label>
                    </div>
                    <div class="flex flex-col items-center gap-1">
                        <input type="time" id="hora2" disabled name="hora2" step="1"
                            class="px-3 py-2 text-gray-700 dark:text-white text-center bg-white dark:bg-slate-700 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 w-36" 
                            title="Transmission Time HH:MM:SS 24h (Campo 7)" />
                        <label class="text-xs text-slate-500 dark:text-slate-400">Hora Transm.</label>
                    </div>
                    <div class="flex flex-col items-center gap-1">
                        <input type="date" id="fechaLiq" disabled name="fechaLiq" 
                            class="px-3 py-2 text-gray-700 dark:text-white text-center bg-white dark:bg-slate-700 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 w-44" 
                            title="Settlement Date (Campo 15) - MMDD" />
                        <label class="text-xs text-slate-500 dark:text-slate-400">Fecha Liq.</label>
                    </div>
                    <div class="flex flex-col items-center gap-1">
                        <input type="date" id="fechaCaptura" disabled name="fechaCap" 
                            class="px-3 py-2 text-gray-700 dark:text-white text-center bg-white dark:bg-slate-700 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 w-44" 
                            title="Capture Date (Campo 17) - MMDD" />
                        <label class="text-xs text-slate-500 dark:text-slate-400">Fecha Capt.</label>
                    </div>
                </div>
            </fieldset>

            {/* Sección 6: Procesamiento y Red */}
            <fieldset class="w-full max-w-4xl mx-auto mb-4 p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50">
                <legend class="px-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400">Procesamiento y Red</legend>
                <div class="flex gap-3 justify-center flex-wrap">
                    <div class="flex flex-col items-center gap-1 w-48">
                        <input type="text" id="procCode" disabled name="procCode" 
                            class="px-3 py-2 text-gray-700 dark:text-white text-center bg-white dark:bg-slate-700 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 w-full" 
                            placeholder="Proc Code" title="Processing Code (Campo 3): 6 dígitos (tipo transacción + cuenta + moneda)" />
                        <label class="text-xs text-slate-500 dark:text-slate-400">Proc. Code</label>
                    </div>
                    <div class="flex flex-col items-center gap-1 w-48">
                        <input type="text" id="condCode" disabled name="condCode" 
                            class="px-3 py-2 text-gray-700 dark:text-white text-center bg-white dark:bg-slate-700 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 w-full" 
                            placeholder="Cond Code" title="POS Condition Code (Campo 25)" />
                        <label class="text-xs text-slate-500 dark:text-slate-400">Cond. Code</label>
                    </div>
                    <div class="flex flex-col items-center gap-1 w-48">
                        <input type="text" id="acqInst" disabled name="acqInst" 
                            class="px-3 py-2 text-gray-700 dark:text-white text-center bg-white dark:bg-slate-700 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 w-full" 
                            placeholder="Acquirer" title="Acquiring Institution ID (Campo 32)" />
                        <label class="text-xs text-slate-500 dark:text-slate-400">Adquiriente</label>
                    </div>
                    <div class="flex flex-col items-center gap-1 w-48">
                        <input type="text" id="fwdInst" disabled name="fwdInst" 
                            class="px-3 py-2 text-gray-700 dark:text-white text-center bg-white dark:bg-slate-700 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 w-full" 
                            placeholder="Forward" title="Forwarding Institution ID (Campo 33)" />
                        <label class="text-xs text-slate-500 dark:text-slate-400">Forward Inst</label>
                    </div>
                </div>
            </fieldset>

            {/* Sección 7: Track 2 (datos sensibles - solo mostrar indicador) */}
            <fieldset class="w-full max-w-4xl mx-auto mb-4 p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50">
                <legend class="px-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400">Datos de Pista</legend>
                <div class="flex gap-3 justify-center flex-wrap">
                    <div class="flex flex-col items-center gap-1 w-72">
                        <input type="text" id="track2Present" disabled name="trk2" 
                            class="px-3 py-2 text-gray-700 dark:text-white text-center bg-white dark:bg-slate-700 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 w-full" 
                            placeholder="Track 2" title="Track 2 Data (Campo 35) - PAN=expiry+service code+PVV+discretionary. Mostrado: SÍ/NO + longitud" />
                        <label class="text-xs text-slate-500 dark:text-slate-400">Track 2</label>
                    </div>
                    <div class="flex flex-col items-center gap-1 w-72">
                        <input type="text" id="track2Pan" disabled name="trk2pan" 
                            class="px-3 py-2 text-gray-700 dark:text-white text-center bg-white dark:bg-slate-700 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 w-full" 
                            placeholder="PAN Track2" title="PAN extraído del Track 2 (para verificación cruzada con Campo 2)" />
                        <label class="text-xs text-slate-500 dark:text-slate-400">PAN Track2</label>
                    </div>
                </div>
            </fieldset>

            {/* Sección 8: Campo 63 / Token RJ (NUEVO) */}
            <fieldset class="w-full max-w-4xl mx-auto mb-4 p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 bg-amber-50/50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
                <legend class="px-2 text-sm font-semibold text-amber-700 dark:text-amber-400">���� Campo 63 - Tokens BBVA (3DS 2.0)</legend>
                <div class="flex gap-3 justify-center flex-wrap">
                    <div class="flex flex-col items-center gap-1 w-72">
                        <input type="text" id="campo63Tokens" disabled name="campo63" 
                            class="px-3 py-2 text-gray-700 dark:text-white text-center bg-white dark:bg-slate-700 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 w-full" 
                            placeholder="Tokens detectados" title="Sub-tokens parseados del Campo 63: RJ, Q1, Q2, C0, C4, R7, CE, etc." />
                        <label class="text-xs text-slate-500 dark:text-slate-400">Tokens C.63</label>
                    </div>
                    <div class="flex flex-col items-center gap-1 w-72">
                        <input type="text" id="tokenRJ1" disabled name="rj1" 
                            class="px-3 py-2 text-gray-700 dark:text-white text-center bg-white dark:bg-slate-700 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 w-full" 
                            placeholder="RJ.1" title="RJ.1 - 3DS Protocol Version: 0=Desconocido, 1=3DS 1.0, 2=EMV 3DS 2.0 (MasterCard), 3=EMV 3DS 2.0 (Visa)" />
                        <label class="text-xs text-slate-500 dark:text-slate-400">RJ.1 (3DS)</label>
                    </div>
                    <div class="flex flex-col items-center gap-1 w-72">
                        <input type="text" id="tokenRJ2" disabled name="rj2" 
                            class="px-3 py-2 text-gray-700 dark:text-white text-center bg-white dark:bg-slate-700 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 w-full" 
                            placeholder="RJ.2" title="RJ.2 - DS Transaction ID (UUID)" />
                        <label class="text-xs text-slate-500 dark:text-slate-400">RJ.2 (DS-TxnID)</label>
                    </div>
                </div>
            </fieldset>

            {/* Sección 9: Datos completos (expandible) */}
            <details class="w-full max-w-4xl mx-auto mb-4 p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50" id="detalleCompleto">
                <summary class="cursor-pointer px-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 select-none">
                    ��� Ver todos los campos parseados (expandir)
                </summary>
                <div class="mt-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2" id="camposCompletos">
                    {/* Se llena dinámicamente desde JS */}
                </div>
            </details>

            {/* Botón Copiar */}
            <div class="grid justify-items-center grid-cols-1 py-3">
                <a id="copiar"
                    class="hidden select-none rounded border border-current px-8 py-3 text-sm font-medium bg-indigo-600 text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-indigo-500"
                    href="#" onclick={blur}>
                    Copiar
                </a>
            </div>
        </div>
    );
}

export default inputsDatos;