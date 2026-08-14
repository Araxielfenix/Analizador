export let datos = "";

export function llenarCampos(
    codigo1, codigo2, cuatrillave, tarjeta, numeroComercio, nombreComercio, folio, monto, fecha, hora1, hora2,
    // Nuevos campos
    stan, rrn, authId, entryMode, terminalId, mcc,
    montoLiq, montoTitular, moneda,
    fechaLiq, fechaCaptura,
    procCode, condCode, acqInst, fwdInst,
    track2Present, track2Pan,
    campo63Tokens, tokenRJ1, tokenRJ2
) {
    // Campos existentes
    document.getElementById("codigo1").value = codigo1;
    document.getElementById("codigo2").value = codigo2;
    document.getElementById("cuatrillave").value = cuatrillave;
    document.getElementById("tarjeta").value = tarjeta;
    document.getElementById("numeroComercio").value = numeroComercio;
    document.getElementById("nombreComercio").value = nombreComercio;
    document.getElementById("folio").value = folio;
    document.getElementById("monto").value = "$" + monto;
    
    // Fecha - usar año actual
    var today = new Date();
    var year = today.getUTCFullYear();
    document.getElementById("fecha").value = year + "-" + fecha.substring(0, 2) + "-" + fecha.substring(2, 4);
    
    // Horas - formato 24h HH:MM:SS (type="time" lo muestra en 24h según locale)
    document.getElementById("hora1").value = hora1.substring(0, 2) + ":" + hora1.substring(2, 4) + ":" + hora1.substring(4, 6);
    document.getElementById("hora2").value = hora2.substring(0, 2) + ":" + hora2.substring(2, 4) + ":" + hora2.substring(4, 6);

    // Nuevos campos básicos
    if (document.getElementById("stan")) document.getElementById("stan").value = stan;
    if (document.getElementById("rrn")) document.getElementById("rrn").value = rrn;
    if (document.getElementById("authId")) document.getElementById("authId").value = authId;
    if (document.getElementById("entryMode")) document.getElementById("entryMode").value = entryMode;
    if (document.getElementById("terminalId")) document.getElementById("terminalId").value = terminalId;
    if (document.getElementById("mcc")) document.getElementById("mcc").value = mcc;
    
    // Montos
    if (document.getElementById("montoLiq")) document.getElementById("montoLiq").value = "$" + montoLiq;
    if (document.getElementById("montoTitular")) document.getElementById("montoTitular").value = "$" + montoTitular;
    if (document.getElementById("moneda")) document.getElementById("moneda").value = moneda;
    
    // Fechas adicionales
    if (document.getElementById("fechaLiq") && fechaLiq) {
        document.getElementById("fechaLiq").value = year + "-" + fechaLiq.substring(0, 2) + "-" + fechaLiq.substring(2, 4);
    }
    if (document.getElementById("fechaCaptura") && fechaCaptura) {
        document.getElementById("fechaCaptura").value = year + "-" + fechaCaptura.substring(0, 2) + "-" + fechaCaptura.substring(2, 4);
    }
    
    // Procesamiento
    if (document.getElementById("procCode")) document.getElementById("procCode").value = procCode;
    if (document.getElementById("condCode")) document.getElementById("condCode").value = condCode;
    if (document.getElementById("acqInst")) document.getElementById("acqInst").value = acqInst;
    if (document.getElementById("fwdInst")) document.getElementById("fwdInst").value = fwdInst;
    
    // Track 2
    if (document.getElementById("track2Present")) document.getElementById("track2Present").value = track2Present;
    if (document.getElementById("track2Pan")) document.getElementById("track2Pan").value = track2Pan;
    
    // Campo 63 / Token RJ
    if (document.getElementById("campo63Tokens")) document.getElementById("campo63Tokens").value = campo63Tokens;
    if (document.getElementById("tokenRJ1")) document.getElementById("tokenRJ1").value = tokenRJ1;
    if (document.getElementById("tokenRJ2")) document.getElementById("tokenRJ2").value = tokenRJ2;

    // Llenar panel de detalle completo
    llenarDetalleCompleto({
        codigo1, codigo2, cuatrillave, tarjeta, numeroComercio, nombreComercio, folio, monto, 
        fecha: document.getElementById("fecha").value,
        hora1: document.getElementById("hora1").value,
        hora2: document.getElementById("hora2").value,
        stan, rrn, authId, entryMode, terminalId, mcc,
        montoLiq, montoTitular, moneda,
        fechaLiq: document.getElementById("fechaLiq")?.value || '',
        fechaCaptura: document.getElementById("fechaCaptura")?.value || '',
        procCode, condCode, acqInst, fwdInst,
        track2Present, track2Pan,
        campo63Tokens, tokenRJ1, tokenRJ2
    });

    // Mostrar botón "copiar"
    document.getElementById("copiar").classList.remove("hidden");
    document.getElementById("copiar").classList.add("inline-block");

    // Store data in variable "datos"
    datos = "Código: " + codigo1 + "\n" + 
            "Código de respuesta: " + codigo2 + "\n" + 
            "Cuatrillave: " + cuatrillave + "\n" + 
            "Tarjeta: " + tarjeta + "\n" + 
            "Número de comercio: " + numeroComercio + "\n" + 
            "Nombre de comercio: " + nombreComercio + "\n" + 
            "Folio: " + folio + "\n" + 
            "Monto: $" + monto + "\n";
    datos += "Fecha: " + document.getElementById("fecha").value + "\n" + 
             "Hora Local: " + document.getElementById("hora1").value + "\n" + 
             "Hora Transm.: " + document.getElementById("hora2").value;
}

function llenarDetalleCompleto(data) {
    const container = document.getElementById("camposCompletos");
    if (!container) return;
    
    const fieldLabels = {
        codigo1: "MTI (Campo 0)",
        codigo2: "Response Code (Campo 39)",
        cuatrillave: "Cuatrillave (STAN+Fecha)",
        tarjeta: "PAN enmascarado (Campo 2)",
        stan: "STAN (Campo 11)",
        rrn: "RRN (Campo 37)",
        authId: "Auth ID Response (Campo 38)",
        entryMode: "Entry Mode (Campo 22)",
        terminalId: "Terminal ID (Campo 41)",
        mcc: "MCC (Campo 18)",
        numeroComercio: "Nº Comercio (Campo 43)",
        nombreComercio: "Nombre Comercio (Campo 43)",
        folio: "Folio/RRN (Campo 37)",
        monto: "Monto Transacción (Campo 4)",
        montoLiq: "Monto Liquidación (Campo 5)",
        montoTitular: "Monto Titular (Campo 6)",
        moneda: "Moneda (Campo 49)",
        fecha: "Fecha Local (Campo 13/7)",
        fechaLiq: "Fecha Liquidación (Campo 15)",
        fechaCaptura: "Fecha Captura (Campo 17)",
        hora1: "Hora Local (Campo 12)",
        hora2: "Hora Transmisión (Campo 7)",
        procCode: "Processing Code (Campo 3)",
        condCode: "Condition Code (Campo 25)",
        acqInst: "Adquiriente (Campo 32)",
        fwdInst: "Forward Inst (Campo 33)",
        track2Present: "Track 2 (Campo 35)",
        track2Pan: "PAN Track2 (Campo 35)",
        campo63Tokens: "Tokens Campo 63",
        tokenRJ1: "RJ.1 - 3DS Protocol",
        tokenRJ2: "RJ.2 - DS Txn ID"
    };

    container.innerHTML = "";
    for (const [key, label] of Object.entries(fieldLabels)) {
        const value = data[key] || "";
        if (value) {
            const div = document.createElement("div");
            div.className = "p-2 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700";
            div.innerHTML = `<span class="text-xs text-slate-500 dark:text-slate-400 block mb-0.5">${label}</span><span class="text-sm font-mono text-gray-800 dark:text-gray-200 break-all">${value}</span>`;
            container.appendChild(div);
        }
    }
}

export default { llenarCampos, datos };