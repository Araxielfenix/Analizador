import {blur} from './blurAlerta.js';

const inputsDatos = () => {
    return (
        <div id="divInputs">
            <div class="grid justify-items-center grid-cols-1 pt-3 pb-5">
                <a id="analizarButton"
                    class="inline-block select-none rounded border border-current px-8 py-3 text-sm font-medium bg-indigo-600 text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-indigo-500"
                    href="#" onclick={blur}>
                    Analizar
                </a>
            </div>
            <div class="flex gap-3 justify-center flex-wrap">
                <input type="text" id="codigo1" disabled name="200" class="shrink order-1 mt-1 px-3 py-2 text-gray-700 dark:text-white text-center bg-white dark:bg-slate-700 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="Código (0200)" />
                <input type="text" id="codigo2" disabled name="210" class="shrink order-2 mt-1 px-3 py-2 text-gray-700 dark:text-white text-center bg-white dark:bg-slate-700 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="Código (0210)" />
            </div>
            <div class="flex gap-3 justify-center flex-wrap pt-2">
                <input type="text" id="cuatrillave" disabled name="cuatri" class="shrink order-1 mt-1 px-3 py-2 text-gray-700 dark:text-white text-center bg-white dark:bg-slate-700 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="Cuatrillave" />
            </div>
            <div class="flex gap-3 justify-center flex-wrap pt-2">
                <input type="text" id="tarjeta" disabled name="card" class="shrink order-1 mt-1 px-3 py-2 text-gray-700 dark:text-white text-center bg-white dark:bg-slate-700 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="Tarjeta" />
            </div>
            <div class="flex gap-3 justify-center flex-wrap pt-2"> 
                <input type="text" id="nombreComercio" disabled name="com" class="shrink order-1 mt-1 px-3 py-2 text-gray-700 dark:text-white text-center bg-white dark:bg-slate-700 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="Comercio" />
                <input type="text" id="numeroComercio" disabled name="numCom" class="shrink order-2 mt-1 px-3 py-2 text-gray-700 dark:text-white text-center bg-white dark:bg-slate-700 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="Numero de comercio" />
            </div>
            <div class="flex gap-3 justify-center flex-wrap pt-2">
                <input type="text" id="folio" disabled name="ticket" class="shrink order-1 mt-1 px-3 py-2 text-gray-700 dark:text-white text-center bg-white dark:bg-slate-700 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="Folio" />
            </div>
            <div class="flex gap-3 justify-center flex-wrap pt-2">
                <input type="text" id="monto" disabled name="money" class="shrink order-1 mt-1 px-3 py-2 text-gray-700 dark:text-white text-center bg-white dark:bg-slate-700 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="Monto" />
            </div>
            <div class="flex gap-3 justify-center flex-wrap pt-2">
                <input type="date" id="fecha" disabled name="ticket" class="shrink order-1 mt-1 px-3 py-2 text-gray-700 dark:text-white text-center bg-white dark:bg-slate-700 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="" />
            </div>
            <div class="flex gap-3 justify-center flex-wrap pt-2"> 
                <input type="time" id="hora1" disabled name="com" class="shrink order-1 mt-1 px-3 py-2 text-gray-700 dark:text-white text-center bg-white dark:bg-slate-700 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="" />
                <input type="time" id="hora2" disabled name="numCom" class="shrink order-2 mt-1 px-3 py-2 text-gray-700 dark:text-white text-center bg-white dark:bg-slate-700 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="" />
            </div>
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
