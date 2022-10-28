var datos = "";
function analizarIso05() {
    // Obtener el texto del textarea "mensajeIso" y guardarlo en la variable "IsoMsg".
    var IsoMsg = document.getElementById("mensajeIso").value;

    // Analiza el IsoMsg y cambia todas las X por *.
    var IsoMsg = IsoMsg.replace(/x/g, "*");

    // Get the length of the string
    var IsoMsgLen = IsoMsg.length;
    if(IsoMsgLen >= 1267){
    // Split the IsoMsg by the character " " and save it in the variable "IsoMsgSplit".
    var IsoMsgSplit = IsoMsg.split(" ");
    var IsoMsgSplitKey = IsoMsg.split("]");
    var IsoMsgSplitStar = IsoMsg.split("*");
    var IsoMsgSplitCh = IsoMsgSplitKey[7].split("");
    var IsoMsgSplitCh2 = IsoMsgSplitKey[14].split("");

    // Delete spaces in the array "IsoMsgSplitch".
    for(var i = 0; i < IsoMsgSplitCh.length; i++){
        if(IsoMsgSplitCh[i] == " "){
            IsoMsgSplitCh.splice(i, 1);
        }
    }
    var codigo1 = "";
    var codigo2 = "";
    for(var i = 0; i < 4; i++){
        codigo1 += IsoMsgSplitCh[12 + i];
        codigo2 += IsoMsgSplitCh2[12 + i];
    }
    var cuatriLlave;
    if(codigo1.substring(0,1) == 0){
        cuatriLlave = 1 + codigo1.substring(1,4) + " " + IsoMsgSplitCh[32] + IsoMsgSplitCh[33] + " " + IsoMsgSplitCh[34] + IsoMsgSplitCh[35] + " " + IsoMsgSplitCh[36] + IsoMsgSplitCh[37];
    }
    var fecha = IsoMsgSplit[17].substring(54, 58);
    for(var i = 0; i < 4; i++){
        fecha += IsoMsgSplitCh[50 + i];
    }
    var hora1 = IsoMsgSplit[17].substring(58, 64);
    for (var i = 0; i < 6; i++){
        hora1 += IsoMsgSplitCh[54 + i];
    }
    var hora2 = IsoMsgSplit[17].substring(70, 76);
    for (var i = 0; i < 6; i++){
        hora2 += IsoMsgSplitCh[66 + i];
    }
    var tarjeta = IsoMsgSplitKey[2].substring(7, 23);
    var folio = IsoMsgSplitStar[32].substring(3, 12);
    var monto = "";
    for(var i = 0; i< 12; i++){
        monto += IsoMsgSplitCh[38 + i];
    }
    //Por cada 23 caracteres, si es un " ", se almacenará en la variable "IsoMsgSplitCom".
    var IsoMsgSplitCom = IsoMsg.match(/.{1,22}/g);
    var numeroComercio = IsoMsgSplitCom[14];
    // Analiza el numeroComercio y eliminara los espacios en blanco.
    var numeroComercio = numeroComercio.replace(/ /g, "");
    // Get the lenght and save the last 7 characters in the variable "numeroComercio".
    var numeroComercio = numeroComercio.substring(numeroComercio.length - 7, numeroComercio.length);
    var nombreComercio = IsoMsgSplitCom[12].substring(1, IsoMsgSplitCom[12].length) + IsoMsgSplitCom[13];    
    nombreComercio = nombreComercio.split("0");
    nombreComercio = nombreComercio[0];

    // El valorde la variable "monto" se divide entre 100 para obtener el monto en pesos.
    monto = monto / 100;
    llenarCampos(codigo1, codigo2, cuatriLlave, tarjeta, numeroComercio, nombreComercio, folio, monto, fecha, hora1, hora2);
    }
    else if(IsoMsgLen >= 949){
        // Split the IsoMsg by the character " " and save it in the variable "IsoMsgSplit".
    var IsoMsgSplit = IsoMsg.split(" ");
    var IsoMsgSplitKey = IsoMsg.split("]");
    var IsoMsgSplitStar = IsoMsg.split("*");
    var IsoMsgSplitCh = IsoMsgSplitKey[7].split("");
    var IsoMsgSplitCh2 = IsoMsgSplitKey[14].split("");
    var IsoMsgSplitCh3 = IsoMsgSplitStar[16].split("");
    // Delete spaces in the array "IsoMsgSplitch".
    for(var i = 0; i < IsoMsgSplitCh.length; i++){
        if(IsoMsgSplitCh[i] == " "){
            IsoMsgSplitCh.splice(i, 1);
        }
    }
    var codigo1 = "";
    var codigo2 = "";
    for(var i = 0; i < 4; i++){
        codigo1 += IsoMsgSplitCh[12 + i];
        codigo2 += IsoMsgSplitCh2[12 + i];
    }
    var codigo1 = IsoMsgSplit[16].substring(16, 20);
    var codigo2 = IsoMsgSplit[99].substring(16, 20);
    var cuatriLlave;
    if(codigo1.substring(0,1) == 0){
        cuatriLlave = 1 + codigo1.substring(1,4) + " " + IsoMsgSplitCh[32] + IsoMsgSplitCh[33] + " " + IsoMsgSplitCh[34] + IsoMsgSplitCh[35] + " " + IsoMsgSplitCh[36] + IsoMsgSplitCh[37];
    }
    var fecha = IsoMsgSplit[17].substring(54, 58);
    for(var i = 0; i < 4; i++){
        fecha += IsoMsgSplitCh[50 + i];
    }
    var hora1 = IsoMsgSplit[17].substring(58, 64);
    for (var i = 0; i < 6; i++){
        hora1 += IsoMsgSplitCh[54 + i];
    }
    var hora2 = IsoMsgSplit[17].substring(70, 76);
    for (var i = 0; i < 6; i++){
        hora2 += IsoMsgSplitCh[66 + i];
    }
    var tarjeta = IsoMsgSplitKey[2].substring(7, 23);
    var monto = "";
    for(var i = 0; i< 12; i++){
        monto += IsoMsgSplitCh[38 + i];
    }
    
    var folio = IsoMsgSplitStar[16].substring(3, 12);

    // Por cada caracter que se encuentre en el arreglo "IsoMsgSplitCh3" se verifica si es una letra, si lo es se guarda en la variable "nombreComercio", si encuentra un numero, no hace nada, si encuentra la combinación "MX" se detiene.
    var nombreComercio = "";
    for(var i = 0; i < IsoMsgSplitCh3.length; i++){
        if(IsoMsgSplitStar[16].substring(i, i+2).toString().match(/[A-Z]/i)){
            nombreComercio += IsoMsgSplitCh3[i];
        }
    }
    
    // Se busca en la variable IsoMsgSplitStar[16] la posición en la que se encuentra la palabra "MX" y se guargan los 7 caracteres siguientes en la variable numero de comercio.
    var numeroComercio = IsoMsgSplitStar[16].substring(IsoMsgSplitStar[16].indexOf("MX") + 5, IsoMsgSplitStar[16].indexOf("MX") + 12);

    nombreComercio = nombreComercio.split("0");
    nombreComercio = nombreComercio[0];
    
    // El valorde la variable "monto" se divide entre 100 para obtener el monto en pesos.
    monto = monto / 100;
    llenarCampos(codigo1, codigo2, cuatriLlave, tarjeta, numeroComercio, nombreComercio, folio, monto, fecha, hora1, hora2);
    }
    /* Checking if the input field is empty. */
    else if (document.getElementById("mensajeIso").value == ""){
        blur("No se ha ingresado ningún mensaje ISO.");
        unBlur();
    }
    /* Checking if the message is in the correct format. */
    else{
        blur("No es posible analizar el mensaje ISO debido a que no cumple con el formato requerido.");
        unBlur();
    }
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
    datos += "fecha: " + fecha + "\n" + "hora1: " + hora1 + "\n" + "hora2: " + hora2;
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