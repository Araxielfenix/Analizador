function analizarIso05() {
    // Obtener el texto del textarea "mensajeIso" y guardarlo en la variable "IsoMsg".
    var IsoMsg = document.getElementById("mensajeIso").value;
    var IsoMsgSplitKey = IsoMsg.split("]");
    var tarjeta = IsoMsgSplitKey[2].substring(7, 23);
    // Busca en "IsoMsg" la palabra "ISO" y guarda la posición en la variable "posicionIso".
    var posicionIso = IsoMsg.indexOf("ISO");
    var tarjeta2 = IsoMsg.substring(posicionIso, IsoMsg.length);
    //Busca la segunda ocurrencia de "tarjeta" en el mensaje ISO a partir de la posición de posicionIso.
    var card = tarjeta2.substring(tarjeta2.search(tarjeta), tarjeta2.search(tarjeta) + 16);
    // Guarda la posición de card en la variable "cardPos".
    var cardPos = tarjeta2.search(card);
    // 16 posiciones después de "ISO" se encuentra el bitmap y es de 16 caracteres.
    var bitmap = IsoMsg.substring(posicionIso + 16, posicionIso + 32);
    
    // Convierte cada caracter del bitmap a binario y lo guarda en la variable "bitmapBin" en formato de 4 bits.
    var bitmapBin = "";
    for (var i = 0; i < bitmap.length; i++) {
        bitmapBin += ("0000" + parseInt(bitmap[i], 16).toString(2)).substr(-4);
    }

    // Busca en "IsoMsg" el bitmap y guarda la posición en la variable "IsoMsgBitMapPos".
    var IsoMsgBitMapPos = IsoMsg.indexOf(bitmap);
    //123456789 0123456789 0123456789 0123456789 0123456789 012345678901234
    //001100100 0111000110 0010010000 0010010100 0101000011 000000000011110

    // Obtener el codigo de la transacción, se encuentra 4 posiciones antes del bitmap.
    var IsoMsgCodTrans = IsoMsg.substring(IsoMsgBitMapPos - 4, IsoMsgBitMapPos);

    // Si el tercer bit del bitmap es 1, entonces se obtiene el processing code, es de 6 caracteres despues del bitmap.
    if (bitmapBin.charAt(2) == 1) {
        var processingCode = IsoMsg.substring(posicionIso + 32, posicionIso + 38);
        var processingCodePos = IsoMsg.indexOf(processingCode);
    }    

    // Si el cuarto bit del bitmap es 1, entonces se obtiene el amount, es de 12 caracteres despues de processingCodePos.
    if (bitmapBin.charAt(3) == 1) {
        var amount = IsoMsg.substring(processingCodePos + 6, processingCodePos + 18);
        var amountPos = IsoMsg.indexOf(amount);
    }

    // Si el quinto bit del bitmap es 1, entonces se obtiene el Settlement Amount, es de 12 caracteres despues del amount.
    if (bitmapBin.charAt(4) == 1) {
        var settlementAmount = IsoMsg.substring(amountPos + 12, amountPos + 24);
        var settlementAmountPos = IsoMsg.indexOf(settlementAmount);
    }
    else {
        var settlementAmountPos = amountPos;
    }

    // Si el septimo bit del bitmap es 1, entonces se obtiene el transmission date and time (MMDDhhmmss), es de 10 caracteres despues del settlement amount si existe, sino es de 10 caracteres despues del amount.
    if (bitmapBin.charAt(6) == 1) {
        var transmissionDateTime = IsoMsg.substring(settlementAmountPos + 12, settlementAmountPos + 22);
        var transmissionDateTimePos = IsoMsg.indexOf(transmissionDateTime);
    }

    // Si el decimo bit del bitmap es 1, entonces se obtiene el Conversion Rate, Cardholder Billing, es de 8 caracteres despues del transmission date and time.
    if (bitmapBin.charAt(9) == 1) {
        var conversionRateCardholderBilling = IsoMsg.substring(transmissionDateTimePos + 10, transmissionDateTimePos + 18);
        var conversionRateCardholderBillingPos = IsoMsg.indexOf(conversionRateCardholderBilling);
    }
    else{
        var conversionRateCardholderBillingPos = transmissionDateTimePos;
    }

    // Si el decimoprimer bit del bitmap es 1, entonces se obtiene el System Trace Audit Number, es de 6 caracteres despues del cardholder billing.
    if (bitmapBin.charAt(10) == 1) {
        var systemTraceAuditNumber = IsoMsg.substring(conversionRateCardholderBillingPos + 10, conversionRateCardholderBillingPos + 16);
        var systemTraceAuditNumberPos = IsoMsg.indexOf(systemTraceAuditNumber);
    }
    else{
        var systemTraceAuditNumberPos = conversionRateCardholderBillingPos;
    }

    // Si el duodecimo bit del bitmap es 1, entonces se obtiene el Local Transaction Time, es de 6 caracteres despues del system trace audit number.
    if (bitmapBin.charAt(11) == 1) {
        var localTransactionTime = IsoMsg.substring(systemTraceAuditNumberPos + 6, systemTraceAuditNumberPos + 12);
        var localTransactionTimePos = IsoMsg.indexOf(systemTraceAuditNumber) + 6;
    }
    else{
        var localTransactionTimePos = systemTraceAuditNumberPos;
    }

    // Si el decimotercer bit del bitmap es 1, entonces se obtiene el Local Transaction Date, es de 4 caracteres despues del local transaction time.
    if (bitmapBin.charAt(12) == 1) {
        var localTransactionDate = IsoMsg.substring(localTransactionTimePos + 6, localTransactionTimePos + 10);
        var localTransactionDatePos = IsoMsg.indexOf(systemTraceAuditNumber) + 12;
    }
    else{
        var localTransactionDatePos = localTransactionTimePos;
    }


    // Si el decimoquinto bit del bitmap es 1, entonces se obtiene el Settlement Date, es de 4 caracteres despues del local transaction date.
    if (bitmapBin.charAt(14) == 1) {
        var settlementDate = IsoMsg.substring(localTransactionDatePos + 4, localTransactionDatePos + 8);
        var settlementDatePos = IsoMsg.indexOf(systemTraceAuditNumber) + 16;
    }
    else{
        var settlementDatePos = localTransactionDatePos;
    }

    // Si el decimoseptimo bit del bitmap es 1, entonces se obtiene el Capture Date, es de 4 caracteres despues del settlement date.
    if (bitmapBin.charAt(16) == 1) {
        var captureDate = IsoMsg.substring(settlementDatePos + 4, settlementDatePos + 8);
        var captureDatePos = IsoMsg.indexOf(systemTraceAuditNumber) + 20;
    }
    else{
        var captureDatePos = settlementDatePos;
    }

    // Si el decimooctavo bit del bitmap es 1, entonces se obtiene el Merchant Type, es de 4 caracteres despues del capture date.
    if (bitmapBin.charAt(17) == 1) {
        var merchantType = IsoMsg.substring(captureDatePos, captureDatePos + 4);
        var merchantTypePos = IsoMsg.indexOf(merchantType);
    }
    else{
        var merchantTypePos = captureDatePos;
    }

    // Si el vigesimosegundo bit del bitmap es 1, entonces se obtiene el Entry mode, es de 3 caracteres despues del merchant type.
    if (bitmapBin.charAt(21) == 1) {
        var entryMode = IsoMsg.substring(merchantTypePos + 4, merchantTypePos + 7);
        var entryModePos = IsoMsg.indexOf(entryMode);
    }

    // Si el vigesimoquinto bit del bitmap es 1, entonces se obtiene el Condition code, es de 2 caracteres despues del entry mode.
    if (bitmapBin.charAt(24) == 1) {
        var conditionCode = IsoMsg.substring(entryModePos + 3, entryModePos + 5);
        var conditionCodePos = IsoMsg.indexOf(merchantType) + 9;
    }


    // Si el trigésimosegundo bit del bitmap es 1, entonces se obtiene el Acquiring Institution Identification Code, Se encuentra despues del condition code y antes de card.
    if (bitmapBin.charAt(30) == 1) {
        var acquiringInstitutionIdentificationCode = IsoMsg.substring(conditionCodePos, (cardPos + posicionIso) - 2);
        var acquiringInstitutionIdentificationCodePos = IsoMsg.indexOf(acquiringInstitutionIdentificationCode);
    }
    else{
        var acquiringInstitutionIdentificationCodePos = conditionCodePos;
    }

    // Si el trigésimoquinto bit del bitmap es 1, entonces se obtiene el track 2 Data, Se encuentra 18 posiciones despues del acquiring institution identification code y termina cuando si se encuentra un numero.
    if (bitmapBin.charAt(34) == 1) {
        var track2Data = ""
        for (var i = (acquiringInstitutionIdentificationCodePos + 31); i < IsoMsg.length; i++) {
            if (isNaN(IsoMsg.substring(i, i + 1))) {
                track2Data += IsoMsg.substring(i, i + 1);
            }
            else{
                break;
            }
        }
        var track2DataPos = IsoMsg.indexOf(track2Data);
    }

    // Si el trigésimosexto bit del bitmap es 1, entonces se obtiene el Retrieval Reference Number, Se encuentra 12 posiciones despues del track 2 data.
    if (bitmapBin.charAt(33) == 1) {
        var retrievalReferenceNumber = IsoMsg.substring((track2DataPos + track2Data.length), (track2DataPos + track2Data.length) + 12);
        var retrievalReferenceNumberPos = IsoMsg.indexOf(retrievalReferenceNumber);
    }
    else{
        var retrievalReferenceNumberPos = (track2DataPos + track2Data.length);
    }

    // Si el trigésimoctavo bit del bitmap es 1, entonces se obtiene el Authorization Identification Response, Se encuentra 6 posiciones despues del retrieval reference number.
    if (bitmapBin.charAt(37) == 1) {
        var authorizationIdentificationResponse = IsoMsg.substring(retrievalReferenceNumberPos + 12, retrievalReferenceNumberPos + 18);
        var authorizationIdentificationResponsePos = IsoMsg.indexOf(authorizationIdentificationResponse);
    }
    else{
        var authorizationIdentificationResponsePos = retrievalReferenceNumberPos;
    }

    var responseCode = IsoMsg.substring(IsoMsg.indexOf(bitmap), IsoMsg.length);
    responseCode = responseCode.substring(responseCode.indexOf("ISO") + 12, responseCode.indexOf("ISO") + 16);

    // Si el cuadragésimoprimer bit del bitmap es 1, entonces se obtiene el Card Acceptor Terminal Identification, Se encuentra 16 posiciones despues del response code.
    if (bitmapBin.charAt(40) == 1) {
        var cardAcceptorTerminalIdentification = IsoMsg.substring(retrievalReferenceNumberPos, retrievalReferenceNumberPos + 12);
        var cardAcceptorTerminalIdentificationPos = IsoMsg.indexOf(cardAcceptorTerminalIdentification);
    }
    else{
        var cardAcceptorTerminalIdentificationPos = retrievalReferenceNumberPos;
    }

    // Si el cuadragésimotercer bit del bitmap es 1, entonces se obtiene el Card Acceptor Name/Location, Se encuentra 40 posiciones despues del card acceptor terminal identification.
    if (bitmapBin.charAt(42) == 1) {
        var posmx = IsoMsg.indexOf("MX027");
        var cardAcceptorNameLocation = IsoMsg.substring(cardAcceptorTerminalIdentificationPos + 19, posmx);
        var cardAcceptorNameLocationPos = IsoMsg.indexOf(cardAcceptorNameLocation);
        var numeroComercio = IsoMsg.substring((cardAcceptorNameLocationPos + cardAcceptorNameLocation.length + 5), (cardAcceptorNameLocationPos + cardAcceptorNameLocation.length) + 12);
    }
    else {
        var cardAcceptorNameLocationPos = cardAcceptorTerminalIdentificationPos;
    }

    llenarCampos(IsoMsgCodTrans, responseCode, ("1" + IsoMsgCodTrans.substring(1, 4) + " " + processingCode.substring(0,2) + " " + processingCode.substring(2, 4) + " " + processingCode.substring(4, 6)), card, numeroComercio, cardAcceptorNameLocation, cardAcceptorTerminalIdentification.substring(3, 12), amount/100, transmissionDateTime.substring(0, 4), transmissionDateTime.substring(4, 10), localTransactionTime);
}

/**
 * It takes the values of the variables and puts them in the input fields.
 * </code>
 * @param codigo1 - "00"
 * @param codigo2 - The response code.
 * @param cuatriLlave - 4-digit number
 * @param tarjeta - card number
 * @param numeroComercio - The number of the store
 * @param nombreComercio - Name of the store
 * @param folio - The number of the transaction
 * @param monto - amount
 * @param fecha - date
 * @param hora1 - "00:00:00"
 * @param hora2 - "00:00:00"
 */
 function llenarCampos(codigo1, codigo2, cuatriLlave, tarjeta, numeroComercio, nombreComercio, folio, monto, fecha, hora1, hora2){
    document.getElementById("codigo1").value = codigo1;
    document.getElementById("codigo2").value = codigo2;
    document.getElementById("cuatrillave").value = cuatriLlave;
    document.getElementById("tarjeta").value = tarjeta;
    document.getElementById("numeroComercio").value = numeroComercio;
    document.getElementById("numeroComercio").style.width = "70px";
    document.getElementById("nombreComercio").value = nombreComercio;
    document.getElementById("nombreComercio").style.width = "274px;";
    document.getElementById("folio").value = folio;
    document.getElementById("monto").value = "$" + monto;
    document.getElementById("botonCopiar").style.display = "inline-block";
    // get current year.
    var today = new Date();
    today.getUTCFullYear();
    var year = today.toString().split(" ");
    document.getElementById("fecha").value = year[3] + "-" + fecha.substring(0,2) + "-" + fecha.substring(2,4);
    // Set now time to field "hora1".
    document.getElementById("hora1").value = hora1.substring(0,2) + ":" + hora1.substring(2,4) + ":" + hora1.substring(4,6);
    // Set hour and minutes to field "hora2".
    document.getElementById("hora2").value = hora2.substring(0,2) + ":" + hora2.substring(2,4) + ":" + hora2.substring(4,6);
    datos = "Código: " + codigo1 + "\n" + "Código de respuesta: " + codigo2 + "\n" + "Cuatrillave: " + cuatriLlave + "\n" + "Tarjeta: " + tarjeta + "\n" + "Número de comercio: " + numeroComercio + "\n" + "Nombre de comercio: " + nombreComercio + "\n" + "Folio: " + folio + "\n" + "Monto: $" + monto + "\n";
    datos += "fecha: " + document.getElementById("fecha").value + "\n" + "hora1: " + document.getElementById("hora1").value + "\n" + "hora2: " + document.getElementById("hora2").value;
}

/**
 * It copies the text inside the text field to the clipboard
 */
function copyToClipboard(){
    navigator.clipboard.writeText(datos);
    blur("Copiado al portapapeles");
    unBlur();
}
/**
 * When the user clicks the button, the browser will go to the GitHub profile of Araxielfenix.
 */
function goProfile(){
    window.location.href = "https://github.com/araxielfenix";
}

/**
 * It takes a string as an argument and displays it in a div.
 * @param mensaje - The message that will be displayed in the alert box.
 */
function blur(mensaje){
    document.getElementById("inputAlerta").value = mensaje;
    fadeIn(document.getElementById("alerta"));
    document.getElementById("iso05").style.filter = "blur(5px)";
    document.getElementById("respuesta").style.filter = "blur(5px)";
    document.getElementById("navBar").style.filter = "blur(5px)";
}

/**
 * After 2 seconds, the alert box fades out, and the blur effect is removed from the rest of the page.
 */
function unBlur(){
    setTimeout(function(){
        fadeOut(document.getElementById("alerta"));
        document.getElementById("iso05").style.filter = "blur(0px)";
        document.getElementById("respuesta").style.filter = "blur(0px)";
        document.getElementById("navBar").style.filter = "blur(0px)";
    }, 2000);
}

/**
 * The function takes an element as an argument, and then fades it out by decreasing its opacity by 10%
 * every 50 milliseconds until it reaches 0.1, at which point it stops the timer and sets the element's
 * display to none.
 * @param element - The element to fade out.
 */
function fadeOut(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 50);
    element.display = "none";
}

/**
 * It takes an element and sets its opacity to 0, then sets its display to block, then sets its opacity
 * to 0.1, then sets its display to block, then sets a timer to increase its opacity by 0.1 every 10
 * milliseconds until it reaches 1.
 * @param element - The element to fade in.
 */
function fadeIn(element) {
    element.style.opacity = 0;
    element.style.display = 'block';
    var op = 0.1;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 10);
}