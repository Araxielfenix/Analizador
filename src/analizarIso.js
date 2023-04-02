import { llenarCampos } from "./llenarInputs.js";

export function analizarIso05() {
    // Obtener el texto del textarea "textAreaIso" y guardarlo en la variable "IsoMsg".
    var IsoMsg = document.getElementById("textAreaIso").value;
    var IsoMsgSplitKey = IsoMsg.split("]");
    var tarjeta = IsoMsgSplitKey[2].substring(7, 23);
    // Busca en "IsoMsg" la palabra "ISO" y guarda la posición en la variable "posicionIso".
    var posicionIso = IsoMsg.indexOf("ISO");
    var tarjeta2 = IsoMsg.substring(posicionIso + 100, IsoMsg.length);
    //Busca la segunda ocurrencia de "tarjeta" en el mensaje ISO a partir de la posición de posicionIso.
    var card = tarjeta2.substring(tarjeta2.indexOf(tarjeta), 20);
    // Guarda la posición de card en la variable "cardPos".
    var cardPos = tarjeta2.indexOf(card);
    // 16 posiciones después de "ISO" se encuentra el bitmap y es de 16 caracteres.
    var bitmap = IsoMsg.substring(posicionIso + 16, posicionIso + 32);

    // Convierte cada caracter del bitmap a binario y lo guarda en la variable "bitmapBin" en formato de 4 bits.
    var bitmapBin = "";
    for (var i = 0; i < bitmap.length; i++) {
        bitmapBin += ("0000" + parseInt(bitmap[i], 16).toString(2)).substr(-4);
    }

    // Busca en "IsoMsg" el bitmap y guarda la posición en la variable "IsoMsgBitMapPos".
    var IsoMsgBitMapPos = IsoMsg.indexOf(bitmap);

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
    else {
        var conversionRateCardholderBillingPos = transmissionDateTimePos;
    }

    // Si el decimoprimer bit del bitmap es 1, entonces se obtiene el System Trace Audit Number, es de 6 caracteres despues del cardholder billing.
    if (bitmapBin.charAt(10) == 1) {
        var systemTraceAuditNumber = IsoMsg.substring(conversionRateCardholderBillingPos + 10, conversionRateCardholderBillingPos + 16);
        var systemTraceAuditNumberPos = IsoMsg.indexOf(systemTraceAuditNumber);
    }
    else {
        var systemTraceAuditNumberPos = conversionRateCardholderBillingPos;
    }

    // Si el duodecimo bit del bitmap es 1, entonces se obtiene el Local Transaction Time, es de 6 caracteres despues del system trace audit number.
    if (bitmapBin.charAt(11) == 1) {
        var localTransactionTime = IsoMsg.substring(systemTraceAuditNumberPos + 6, systemTraceAuditNumberPos + 12);
        var localTransactionTimePos = IsoMsg.indexOf(systemTraceAuditNumber) + 6;
    }
    else {
        var localTransactionTimePos = systemTraceAuditNumberPos;
    }

    // Si el decimotercer bit del bitmap es 1, entonces se obtiene el Local Transaction Date, es de 4 caracteres despues del local transaction time.
    if (bitmapBin.charAt(12) == 1) {
        var localTransactionDate = IsoMsg.substring(localTransactionTimePos + 6, localTransactionTimePos + 10);
        var localTransactionDatePos = IsoMsg.indexOf(systemTraceAuditNumber) + 12;
    }
    else {
        var localTransactionDatePos = localTransactionTimePos;
    }


    // Si el decimoquinto bit del bitmap es 1, entonces se obtiene el Settlement Date, es de 4 caracteres despues del local transaction date.
    if (bitmapBin.charAt(14) == 1) {
        var settlementDate = IsoMsg.substring(localTransactionDatePos + 4, localTransactionDatePos + 8);
        var settlementDatePos = IsoMsg.indexOf(systemTraceAuditNumber) + 16;
    }
    else {
        var settlementDatePos = localTransactionDatePos;
    }

    // Si el decimoseptimo bit del bitmap es 1, entonces se obtiene el Capture Date, es de 4 caracteres despues del settlement date.
    if (bitmapBin.charAt(16) == 1) {
        var captureDate = IsoMsg.substring(settlementDatePos + 4, settlementDatePos + 8);
        var captureDatePos = IsoMsg.indexOf(systemTraceAuditNumber) + 20;
    }
    else {
        var captureDatePos = settlementDatePos;
    }

    // Si el decimooctavo bit del bitmap es 1, entonces se obtiene el Merchant Type, es de 4 caracteres despues del capture date.
    if (bitmapBin.charAt(17) == 1) {
        var merchantType = IsoMsg.substring(captureDatePos, captureDatePos + 4);
        var merchantTypePos = IsoMsg.indexOf(merchantType);
    }
    else {
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
    else {
        var acquiringInstitutionIdentificationCodePos = conditionCodePos;
    }

    // Si el trigésimoquinto bit del bitmap es 1, entonces se obtiene el track 2 Data, Se encuentra 18 posiciones despues del acquiring institution identification code y termina cuando si se encuentra un numero.
    if (bitmapBin.charAt(34) == 1) {
        var track2Data = ""
        for (var i = (acquiringInstitutionIdentificationCodePos + 31); i < IsoMsg.length; i++) {
            if (isNaN(IsoMsg.substring(i, i + 1))) {
                track2Data += IsoMsg.substring(i, i + 1);
            }
            else {
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
    else {
        var retrievalReferenceNumberPos = (track2DataPos + track2Data.length);
    }

    // Si el trigésimoctavo bit del bitmap es 1, entonces se obtiene el Authorization Identification Response, Se encuentra 6 posiciones despues del retrieval reference number.
    if (bitmapBin.charAt(37) == 1) {
        var authorizationIdentificationResponse = IsoMsg.substring(retrievalReferenceNumberPos + 12, retrievalReferenceNumberPos + 18);
        var authorizationIdentificationResponsePos = IsoMsg.indexOf(authorizationIdentificationResponse);
    }
    else {
        var authorizationIdentificationResponsePos = retrievalReferenceNumberPos;
    }

    var responseCode = IsoMsg.substring(IsoMsg.indexOf(bitmap), IsoMsg.length);
    responseCode = responseCode.substring(responseCode.indexOf("ISO") + 12, responseCode.indexOf("ISO") + 16);

    // Si el cuadragésimoprimer bit del bitmap es 1, entonces se obtiene el Card Acceptor Terminal Identification, Se encuentra 16 posiciones despues del response code.
    if (bitmapBin.charAt(40) == 1) {
        var cardAcceptorTerminalIdentification = IsoMsg.substring(retrievalReferenceNumberPos, retrievalReferenceNumberPos + 12);
        var cardAcceptorTerminalIdentificationPos = IsoMsg.indexOf(cardAcceptorTerminalIdentification);
    }
    else {
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

    // Imprime en consola las variables obtenidas.
    console.log("Bitmap: " + bitmap);
    console.log("Bitmap Binario: " + bitmapBin);
    console.log("Processing Code: " + processingCode);
    console.log("System Trace Audit Number: " + systemTraceAuditNumber);
    console.log("Settlement Date: " + settlementDate);
    console.log("Capture Date: " + captureDate);
    console.log("Merchant Type: " + merchantType);
    console.log("Entry Mode: " + entryMode);
    console.log("Condition Code: " + conditionCode);
    console.log("Acquiring Institution Identification Code: " + acquiringInstitutionIdentificationCode);
    console.log("Track 2 Data: " + track2Data);
    console.log("Retrieval Reference Number: " + retrievalReferenceNumber);
    console.log("Authorization Identification Response: " + authorizationIdentificationResponse);
    console.log("Response Code: " + responseCode);
    console.log("Card Acceptor Terminal Identification: " + cardAcceptorTerminalIdentification);
    console.log("Card Acceptor Name/Location: " + cardAcceptorNameLocation);
    console.log("Numero Comercio: " + numeroComercio);
    
    llenarCampos(IsoMsgCodTrans, responseCode, ("1" + IsoMsgCodTrans.substring(1, 4) + " " + processingCode.substring(0, 2) + " " + processingCode.substring(2, 4) + " " + processingCode.substring(4, 6)), card, numeroComercio, cardAcceptorNameLocation, cardAcceptorTerminalIdentification.substring(3, 12), amount / 100, IsoMsg.substring(settlementAmountPos + 34, settlementAmountPos + 38), transmissionDateTime.substring(4, 10), localTransactionTime);
}