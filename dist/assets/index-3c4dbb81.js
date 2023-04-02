(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(r){if(r.ep)return;r.ep=!0;const i=t(r);fetch(r.href,i)}})();let Ce=xe;const E=1,j=2,pe={owned:null,cleanups:null,context:null,owner:null};var p=null;let K=null,m=null,g=null,h=null,F=0;function Oe(e,s){const t=m,n=p,r=e.length===0,i=r?pe:{owned:null,cleanups:null,context:null,owner:s===void 0?n:s},o=r?e:()=>e(()=>ee(()=>T(i)));p=i,m=null;try{return N(o,!0)}finally{m=t,p=n}}function Y(e,s,t){const n=Le(e,s,!1,E);me(n)}function ee(e){if(m===null)return e();const s=m;m=null;try{return e()}finally{m=s}}function Se(e,s,t){let n=e.value;return(!e.comparator||!e.comparator(n,s))&&(e.value=s,e.observers&&e.observers.length&&N(()=>{for(let r=0;r<e.observers.length;r+=1){const i=e.observers[r],o=K&&K.running;o&&K.disposed.has(i),(o?!i.tState:!i.state)&&(i.pure?g.push(i):h.push(i),i.observers&&be(i)),o||(i.state=E)}if(g.length>1e6)throw g=[],new Error},!1)),s}function me(e){if(!e.fn)return;T(e);const s=p,t=m,n=F;m=p=e,$e(e,e.value,n),m=t,p=s}function $e(e,s,t){let n;try{n=e.fn(s)}catch(r){return e.pure&&(e.state=E,e.owned&&e.owned.forEach(T),e.owned=null),e.updatedAt=t+1,ve(r)}(!e.updatedAt||e.updatedAt<=t)&&(e.updatedAt!=null&&"observers"in e?Se(e,n):e.value=n,e.updatedAt=t)}function Le(e,s,t,n=E,r){const i={fn:e,state:n,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:s,owner:p,context:null,pure:t};return p===null||p!==pe&&(p.owned?p.owned.push(i):p.owned=[i]),i}function he(e){if(e.state===0)return;if(e.state===j)return J(e);if(e.suspense&&ee(e.suspense.inFallback))return e.suspense.effects.push(e);const s=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<F);)e.state&&s.push(e);for(let t=s.length-1;t>=0;t--)if(e=s[t],e.state===E)me(e);else if(e.state===j){const n=g;g=null,N(()=>J(e,s[0]),!1),g=n}}function N(e,s){if(g)return e();let t=!1;s||(g=[]),h?t=!0:h=[],F++;try{const n=e();return _e(t),n}catch(n){t||(h=null),g=null,ve(n)}}function _e(e){if(g&&(xe(g),g=null),e)return;const s=h;h=null,s.length&&N(()=>Ce(s),!1)}function xe(e){for(let s=0;s<e.length;s++)he(e[s])}function J(e,s){e.state=0;for(let t=0;t<e.sources.length;t+=1){const n=e.sources[t];if(n.sources){const r=n.state;r===E?n!==s&&(!n.updatedAt||n.updatedAt<F)&&he(n):r===j&&J(n,s)}}}function be(e){for(let s=0;s<e.observers.length;s+=1){const t=e.observers[s];t.state||(t.state=j,t.pure?g.push(t):h.push(t),t.observers&&be(t))}}function T(e){let s;if(e.sources)for(;e.sources.length;){const t=e.sources.pop(),n=e.sourceSlots.pop(),r=t.observers;if(r&&r.length){const i=r.pop(),o=t.observerSlots.pop();n<r.length&&(i.sourceSlots[o]=n,r[n]=i,t.observerSlots[n]=o)}}if(e.owned){for(s=e.owned.length-1;s>=0;s--)T(e.owned[s]);e.owned=null}if(e.cleanups){for(s=e.cleanups.length-1;s>=0;s--)e.cleanups[s]();e.cleanups=null}e.state=0,e.context=null}function ve(e){throw e}function je(e,s,t){let n=t.length,r=s.length,i=n,o=0,l=0,a=s[r-1].nextSibling,d=null;for(;o<r||l<i;){if(s[o]===t[l]){o++,l++;continue}for(;s[r-1]===t[i-1];)r--,i--;if(r===o){const c=i<n?l?t[l-1].nextSibling:t[i-l]:a;for(;l<i;)e.insertBefore(t[l++],c)}else if(i===l)for(;o<r;)(!d||!d.has(s[o]))&&s[o].remove(),o++;else if(s[o]===t[i-1]&&t[l]===s[r-1]){const c=s[--r].nextSibling;e.insertBefore(t[l++],s[o++].nextSibling),e.insertBefore(t[--i],c),s[r]=t[i]}else{if(!d){d=new Map;let u=l;for(;u<i;)d.set(t[u],u++)}const c=d.get(s[o]);if(c!=null)if(l<c&&c<i){let u=o,f=1,I;for(;++u<r&&u<i&&!((I=d.get(s[u]))==null||I!==c+f);)f++;if(f>c-l){const k=s[o];for(;l<c;)e.insertBefore(t[l++],k)}else e.replaceChild(t[l++],s[o++])}else o++;else s[o++].remove()}}}const ce="_$DX_DELEGATE";function z(e,s,t,n={}){let r;return Oe(i=>{r=i,s===document?e():Fe(s,e(),s.firstChild?null:void 0,t)},n.owner),()=>{r(),s.textContent=""}}function R(e,s,t){let n;const r=()=>{const o=document.createElement("template");return o.innerHTML=e,t?o.content.firstChild.firstChild:o.content.firstChild},i=s?()=>(n||(n=r())).cloneNode(!0):()=>ee(()=>document.importNode(n||(n=r()),!0));return i.cloneNode=i,i}function Me(e,s=window.document){const t=s[ce]||(s[ce]=new Set);for(let n=0,r=e.length;n<r;n++){const i=e[n];t.has(i)||(t.add(i),s.addEventListener(i,Ne))}}function ue(e,s,t,n){if(n)Array.isArray(t)?(e[`$$${s}`]=t[0],e[`$$${s}Data`]=t[1]):e[`$$${s}`]=t;else if(Array.isArray(t)){const r=t[0];e.addEventListener(s,t[0]=i=>r.call(e,t[1],i))}else e.addEventListener(s,t)}function Fe(e,s,t,n){if(t!==void 0&&!n&&(n=[]),typeof s!="function")return M(e,s,n,t);Y(r=>M(e,s(),r,t),n)}function Ne(e){const s=`$$${e.type}`;let t=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==t&&Object.defineProperty(e,"target",{configurable:!0,value:t}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return t||document}});t;){const n=t[s];if(n&&!t.disabled){const r=t[`${s}Data`];if(r!==void 0?n.call(t,r,e):n.call(t,e),e.cancelBubble)return}t=t._$host||t.parentNode||t.host}}function M(e,s,t,n,r){for(;typeof t=="function";)t=t();if(s===t)return t;const i=typeof s,o=n!==void 0;if(e=o&&t[0]&&t[0].parentNode||e,i==="string"||i==="number")if(i==="number"&&(s=s.toString()),o){let l=t[0];l&&l.nodeType===3?l.data=s:l=document.createTextNode(s),t=w(e,t,n,l)}else t!==""&&typeof t=="string"?t=e.firstChild.data=s:t=e.textContent=s;else if(s==null||i==="boolean")t=w(e,t,n);else{if(i==="function")return Y(()=>{let l=s();for(;typeof l=="function";)l=l();t=M(e,l,t,n)}),()=>t;if(Array.isArray(s)){const l=[],a=t&&Array.isArray(t);if(Z(l,s,t,r))return Y(()=>t=M(e,l,t,n,!0)),()=>t;if(l.length===0){if(t=w(e,t,n),o)return t}else a?t.length===0?fe(e,l,n):je(e,t,l):(t&&w(e),fe(e,l));t=l}else if(s instanceof Node){if(Array.isArray(t)){if(o)return t=w(e,t,n,s);w(e,t,null,s)}else t==null||t===""||!e.firstChild?e.appendChild(s):e.replaceChild(s,e.firstChild);t=s}else console.warn("Unrecognized value. Skipped inserting",s)}return t}function Z(e,s,t,n){let r=!1;for(let i=0,o=s.length;i<o;i++){let l=s[i],a=t&&t[i];if(l instanceof Node)e.push(l);else if(!(l==null||l===!0||l===!1))if(Array.isArray(l))r=Z(e,l,a)||r;else if(typeof l=="function")if(n){for(;typeof l=="function";)l=l();r=Z(e,Array.isArray(l)?l:[l],Array.isArray(a)?a:[a])||r}else e.push(l),r=!0;else{const d=String(l);a&&a.nodeType===3?(a.data=d,e.push(a)):e.push(document.createTextNode(d))}}return r}function fe(e,s,t=null){for(let n=0,r=s.length;n<r;n++)e.insertBefore(s[n],t)}function w(e,s,t,n){if(t===void 0)return e.textContent="";const r=n||document.createTextNode("");if(s.length){let i=!1;for(let o=s.length-1;o>=0;o--){const l=s[o];if(r!==l){const a=l.parentNode===e;!i&&!o?a?e.replaceChild(r,l):e.insertBefore(r,t):a&&l.remove()}else i=!0}}else e.insertBefore(r,t);return[r]}const Te=R('<nav class="navbar navbar-expand-lg navbar-light bg-light " id="navBar"><div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 "><div class="flex h-16 items-center justify-between "><div class="md:flex md:items-center md:gap-12 hover:outline-none"><a class="group relative inline-flex items-center overflow-hidden text-teal-600" href="https://github.com/AraxielFenix"><img class="h-12 rounded-full border-2 border-indigo-600 hover:border-indigo-500 hover:scale-90 transform transition duration-500 ease-in-out z-40 hover:outline-none" src="https://static-cdn.jtvnw.net/jtv_user_pictures/6f424ca8-2f68-43c6-b021-a3134ace9225-profile_image-70x70.png" alt="AraxielFenix"><label class="text-gray-700 text-sm font-bold mb-2 md:mb-1 pr-3 group-hover:translate-x-1 -translate-x-full transition-transform z-10 cursor-pointer dark:text-white hover:outline-none" for="inline-full-name">Araxiel Fenix </a></div><div class="flex items-center gap-4"><a class="group relative inline-flex items-center overflow-hidden rounded bg-indigo-600 px-8 py-3 text-white hover:outline-none focus:ring active:bg-indigo-500" href="https://araxielfenix.github.io/Comparador/"><span class="absolute left-0 -translate-x-full transition-transform group-hover:translate-x-4"><svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M13,7V4H11v3H7v2h4v3l5-4L13,7z M20.5,11.5c-0.3,0-0.6,0.1-0.8,0.4l-2.7,2.7c-0.4,0.4-0.4,1,0,1.4l2.7,2.7c0.4,0.4,1,0.4,1.4,0l2.7-2.7c0.4-0.4,0.4-1,0-1.4l-2.7-2.7C21.1,11.6,20.8,11.5,20.5,11.5z M3.5,11.5c-0.3,0-0.6,0.1-0.8,0.4L0,14.6c-0.4,0.4-0.4,1,0,1.4l2.7,2.7c0.4,0.4,1,0.4,1.4,0l2.7-2.7c0.4-0.4,0.4-1,0-1.4l-2.7-2.7C4.1,11.6,3.8,11.5,3.5,11.5z" fill="currentColor"></span><span class="text-sm font-medium transition-all group-hover:ml-4">Comparador'),ze=()=>Te(),Re=R('<div class="absolute hidden border border-slate-50/60 backdrop-blur-[2px] shadow-sm top-1/4 right-1/4 left-1/4 h-2/5 rounded-md z-40 content-center bg-slate-900/60" id="divAlerta"><label class="grow align-middle text-center py-40" id="textoAlerta">No deberias estar leyendo esto 😒'),He=()=>Re();let P="";function Ue(e,s,t,n,r,i,o,l,a,d,c){document.getElementById("codigo1").value=e,document.getElementById("codigo2").value=s,document.getElementById("cuatrillave").value=t,document.getElementById("tarjeta").value=n,document.getElementById("numeroComercio").value=r,document.getElementById("nombreComercio").value=i,document.getElementById("folio").value=o,document.getElementById("monto").value="$"+l;var u=new Date,f=u.getUTCFullYear();document.getElementById("fecha").value=f+"-"+a.substring(0,2)+"-"+a.substring(2,4),document.getElementById("hora1").value=d.substring(0,2)+":"+d.substring(2,4)+":"+d.substring(4,6),document.getElementById("hora2").value=c.substring(0,2)+":"+c.substring(2,4)+":"+c.substring(4,6),document.getElementById("copiar").classList.remove("hidden"),document.getElementById("copiar").classList.add("inline-block"),P="Código: "+e+`
Código de respuesta: `+s+`
Cuatrillave: `+t+`
Tarjeta: `+n+`
Número de comercio: `+r+`
Nombre de comercio: `+i+`
Folio: `+o+`
Monto: $`+l+`
`,P+="fecha: "+document.getElementById("fecha").value+`
hora1: `+document.getElementById("hora1").value+`
hora2: `+document.getElementById("hora2").value}function Ge(){for(var e=document.getElementById("textAreaIso").value,s=e.split("]"),t=s[2].substring(7,23),n=e.indexOf("ISO"),r=e.substring(n+100,e.length),i=r.substring(r.indexOf(t),20),o=r.indexOf(i),l=e.substring(n+16,n+32),a="",d=0;d<l.length;d++)a+=("0000"+parseInt(l[d],16).toString(2)).substr(-4);var c=e.indexOf(l),u=e.substring(c-4,c);if(a.charAt(2)==1)var f=e.substring(n+32,n+38),I=e.indexOf(f);if(a.charAt(3)==1)var k=e.substring(I+6,I+18),H=e.indexOf(k);if(a.charAt(4)==1)var ye=e.substring(H+12,H+24),B=e.indexOf(ye);else var B=H;if(a.charAt(6)==1)var te=e.substring(B+12,B+22),U=e.indexOf(te);if(a.charAt(9)==1)var we=e.substring(U+10,U+18),C=e.indexOf(we);else var C=U;if(a.charAt(10)==1)var x=e.substring(C+10,C+16),O=e.indexOf(x);else var O=C;if(a.charAt(11)==1)var Ee=e.substring(O+6,O+12),S=e.indexOf(x)+6;else var S=O;if(a.charAt(12)==1){e.substring(S+6,S+10);var $=e.indexOf(x)+12}else var $=S;if(a.charAt(14)==1)var Ie=e.substring($+4,$+8),L=e.indexOf(x)+16;else var L=$;if(a.charAt(16)==1)var Be=e.substring(L+4,L+8),_=e.indexOf(x)+20;else var _=L;if(a.charAt(17)==1)var G=e.substring(_,_+4),Q=e.indexOf(G);else var Q=_;if(a.charAt(21)==1)var se=e.substring(Q+4,Q+7),ne=e.indexOf(se);if(a.charAt(24)==1)var Ae=e.substring(ne+3,ne+5),re=e.indexOf(G)+9;if(a.charAt(30)==1)var ie=e.substring(re,o+n-2),le=e.indexOf(ie);else var le=re;if(a.charAt(34)==1){for(var b="",d=le+31;d<e.length&&isNaN(e.substring(d,d+1));d++)b+=e.substring(d,d+1);var V=e.indexOf(b)}if(a.charAt(33)==1)var oe=e.substring(V+b.length,V+b.length+12),v=e.indexOf(oe);else var v=V+b.length;if(a.charAt(37)==1){var ae=e.substring(v+12,v+18);e.indexOf(ae)}var y=e.substring(e.indexOf(l),e.length);if(y=y.substring(y.indexOf("ISO")+12,y.indexOf("ISO")+16),a.charAt(40)==1)var q=e.substring(v,v+12),D=e.indexOf(q);else var D=v;if(a.charAt(42)==1)var ke=e.indexOf("MX027"),A=e.substring(D+19,ke),X=e.indexOf(A),de=e.substring(X+A.length+5,X+A.length+12);else var X=D;console.log("Bitmap: "+l),console.log("Bitmap Binario: "+a),console.log("Processing Code: "+f),console.log("System Trace Audit Number: "+x),console.log("Settlement Date: "+Ie),console.log("Capture Date: "+Be),console.log("Merchant Type: "+G),console.log("Entry Mode: "+se),console.log("Condition Code: "+Ae),console.log("Acquiring Institution Identification Code: "+ie),console.log("Track 2 Data: "+b),console.log("Retrieval Reference Number: "+oe),console.log("Authorization Identification Response: "+ae),console.log("Response Code: "+y),console.log("Card Acceptor Terminal Identification: "+q),console.log("Card Acceptor Name/Location: "+A),console.log("Numero Comercio: "+de),Ue(u,y,"1"+u.substring(1,4)+" "+f.substring(0,2)+" "+f.substring(2,4)+" "+f.substring(4,6),i,de,A,q.substring(3,12),k/100,e.substring(B+34,B+38),te.substring(4,10),Ee)}function Qe(e){navigator.clipboard.writeText(e)}function ge(){var e=2e3;switch(event.target.id){case"copiar":document.getElementById("numeroComercio").value!=""&&(Qe(P),document.getElementById("textoAlerta").innerHTML="Copiado al portapapeles"),W(e);break;case"analizarButton":document.getElementById("textAreaIso").value==""?(document.getElementById("textoAlerta").innerHTML="No se ha ingresado un mensaje ISO",W(e)):document.getElementById("textAreaIso").value.length<=700?(e=3600,document.getElementById("textoAlerta").innerHTML="No es posible analizar el mensaje ISO debido a que no cumple con el formato requerido.",W(e)):(console.log(document.getElementById("textAreaIso").value.length),Ge());break}}function W(e){Ve(),document.getElementById("analizarButton").classList.add("invisible"),document.getElementById("divAlerta").classList.remove("hidden"),document.getElementById("divAlerta").classList.add("flex"),setTimeout(function(){document.getElementById("divAlerta").classList.remove("flex"),document.getElementById("divAlerta").classList.add("hidden"),document.getElementById("analizarButton").classList.remove("invisible"),qe()},e)}function Ve(){document.getElementById("navBar").classList.add("blur-sm"),document.getElementById("textAreaIso").classList.add("blur-sm"),document.getElementById("divInputs").classList.add("blur-sm")}function qe(){document.getElementById("navBar").classList.remove("blur-sm"),document.getElementById("textAreaIso").classList.remove("blur-sm"),document.getElementById("divInputs").classList.remove("blur-sm")}const De=R(`<div class="grid justify-items-center grid-cols-1 pt-3"><textarea type="text" id="textAreaIso" class="pb-8 mx-auto h-64 w-11/12 peer block min-h-[auto] rounded border-slate-300 border shadow-sm dark:bg-slate-700 py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none" id="mensajeIso" placeholder="Ejemplo: 
[T: 00:00:00.000][D: 00000][C:    000000xxxxxx0000][Iap: iap_BBVEMI0_P0      ][Lp: 0:I00][Rw: W][L:  000]ISO00000000000000000C00000A0000E000000000000000000000000000000000000000000000000000000000000000000000000000000xxxxxx0000=********************0000000000000B00EAB         NOMBRE DE COMERCIO MEXICO      000MX0000000000            00000000000000B000AGRE+0000000000EGLO0000000000000000000000000000000&amp; 0000000000! Q000000 00! Q000000 00! C000000 ****    0000000000        ! C000000 000000000000! R000000              ! B000000 0FF000000000000000000E000A0A0000F0DE0000000000000000000000000C00000B00000000000000F000000F000000000A00A0B00000000000000000000000000000000000000000000000000000! B000000 CF0000000ICCE0F0C0000000000000000000000000000000A0000000000000000000000000000000! B000000 0000000000000000000
[T: 00:00:00.000][D: 00000][C:    000000xxxxxx0000][Iap: iap_BBVEMI0_P0      ][Lp: 0:I0 ][Rw: R][L:  000]ISO0000000000000000A00000E00000A0000000000000000000000000000000000000000000000000000000000000000000000000000xxxxxx0000=********************000000000000000000000B00EAB         00 0000000EGLO000000000000000000&amp; 0000000000! Q000000 00! Q000000 00! C000000 ****    0000000000        ! C000000 000000000000! R000000              ! 0000000 C           0     N">`),Xe=()=>De(),Ke=R('<div id="divInputs"><div class="grid justify-items-center grid-cols-1 pt-3 pb-5"><a id="analizarButton" class="hiddeninline-block rounded border border-current px-8 py-3 text-sm font-medium bg-indigo-600 text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-indigo-500" href="#">Analizar</a></div><div class="flex gap-3 justify-center flex-wrap"><input type="text" id="codigo1" disabled name="200" class="shrink order-1 mt-1 px-3 py-2 text-gray-700 dark:text-white text-center bg-white dark:bg-slate-700 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="Código (0200)"><input type="text" id="codigo2" disabled name="210" class="shrink order-2 mt-1 px-3 py-2 text-gray-700 dark:text-white text-center bg-white dark:bg-slate-700 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="Código (0210)"></div><div class="flex gap-3 justify-center flex-wrap pt-2"><input type="text" id="cuatrillave" disabled name="cuatri" class="shrink order-1 mt-1 px-3 py-2 text-gray-700 dark:text-white text-center bg-white dark:bg-slate-700 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="Cuatrillave"></div><div class="flex gap-3 justify-center flex-wrap pt-2"><input type="text" id="tarjeta" disabled name="card" class="shrink order-1 mt-1 px-3 py-2 text-gray-700 dark:text-white text-center bg-white dark:bg-slate-700 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="Tarjeta"></div><div class="flex gap-3 justify-center flex-wrap pt-2"><input type="text" id="nombreComercio" disabled name="com" class="shrink order-1 mt-1 px-3 py-2 text-gray-700 dark:text-white text-center bg-white dark:bg-slate-700 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="Comercio"><input type="text" id="numeroComercio" disabled name="numCom" class="shrink order-2 mt-1 px-3 py-2 text-gray-700 dark:text-white text-center bg-white dark:bg-slate-700 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="Numero de comercio"></div><div class="flex gap-3 justify-center flex-wrap pt-2"><input type="text" id="folio" disabled name="ticket" class="shrink order-1 mt-1 px-3 py-2 text-gray-700 dark:text-white text-center bg-white dark:bg-slate-700 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="Folio"></div><div class="flex gap-3 justify-center flex-wrap pt-2"><input type="text" id="monto" disabled name="money" class="shrink order-1 mt-1 px-3 py-2 text-gray-700 dark:text-white text-center bg-white dark:bg-slate-700 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="Monto"></div><div class="flex gap-3 justify-center flex-wrap pt-2"><input type="date" id="fecha" disabled name="ticket" class="shrink order-1 mt-1 px-3 py-2 text-gray-700 dark:text-white text-center bg-white dark:bg-slate-700 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder=""></div><div class="flex gap-3 justify-center flex-wrap pt-2"><input type="time" id="hora1" disabled name="com" class="shrink order-1 mt-1 px-3 py-2 text-gray-700 dark:text-white text-center bg-white dark:bg-slate-700 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder=""><input type="time" id="hora2" disabled name="numCom" class="shrink order-2 mt-1 px-3 py-2 text-gray-700 dark:text-white text-center bg-white dark:bg-slate-700 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder=""></div><div class="grid justify-items-center grid-cols-1 py-3"><a id="copiar" class="hidden rounded border border-current px-8 py-3 text-sm font-medium bg-indigo-600 text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-indigo-500" href="#">Copiar'),We=()=>(()=>{const e=Ke(),s=e.firstChild,t=s.firstChild,n=s.nextSibling,r=n.nextSibling,i=r.nextSibling,o=i.nextSibling,l=o.nextSibling,a=l.nextSibling,d=a.nextSibling,c=d.nextSibling,u=c.nextSibling,f=u.firstChild;return ue(t,"click",ge,!0),ue(f,"click",ge,!0),e})();Me(["click"]);z(ze,document.getElementById("nav"));z(He,document.getElementById("alerta"));z(Xe,document.getElementById("mensajeIso"));z(We,document.getElementById("inputsDatos"));
