var datos = "";
function analizarIso05() {
    // Obtener el texto del textarea "mensajeIso" y guardarlo en la variable "IsoMsg".
    var IsoMsg = document.getElementById("mensajeIso").value;
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
    var folio = IsoMsgSplitStar[20].substring(3, 12);
    var monto = "";
    for(var i = 0; i< 12; i++){
        monto += IsoMsgSplitCh[38 + i];
    }
    //Por cada 23 caracteres, si es un " ", se almacenará en la variable "IsoMsgSplitCom".
    var IsoMsgSplitCom = IsoMsg.match(/.{1,22}/g);
    
    var nombreComercio = IsoMsgSplitCom[12].substring(1, IsoMsgSplitCom[12].length) + IsoMsgSplitCom[13];    
    var numeroComercio = IsoMsgSplitCom[11].substring(7, 16);

    // El valorde la variable "monto" se divide entre 100 para obtener el monto en pesos.
    monto = monto / 100;

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
    datos = "Código: " + codigo1 + "\n" + "Código de respuesta: " + codigo2 + "\n" + "Cuatrillave: " + cuatriLlave + "\n" + "Tarjeta: " + tarjeta + "\n" + "Número de comercio: " + numeroComercio + "\n" + "Nombre de comercio: " + nombreComercio + "\n" + "Folio: " + folio + "\n" + "Monto: " + monto + "\n";
    datos += "fecha: " + fecha + "\n" + "hora1: " + hora1 + "\n" + "hora2: " + hora2;
    // get current year.
    var today = new Date();
    today.getUTCFullYear();
    var year = today.toString().split(" ");
    document.getElementById("fecha").value = year[3] + "-" + fecha.substring(0,2) + "-" + fecha.substring(2,4);
    // Set now time to field "hora1".
    document.getElementById("hora1").value = hora1.substring(0,2) + ":" + hora1.substring(2,4) + ":" + hora1.substring(4,6);
    // Set hour and minutes to field "hora2".
    document.getElementById("hora2").value = hora2.substring(0,2) + ":" + hora2.substring(2,4) + ":" + hora2.substring(4,6);
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
    datos = "Código: " + codigo1 + "\n" + "Código de respuesta: " + codigo2 + "\n" + "Cuatrillave: " + cuatriLlave + "\n" + "Tarjeta: " + tarjeta + "\n" + "Número de comercio: " + numeroComercio + "\n" + "Nombre de comercio: " + nombreComercio + "\n" + "Folio: " + folio + "\n" + "Monto: " + monto + "\n";
    datos += "fecha: " + fecha + "\n" + "hora1: " + hora1 + "\n" + "hora2: " + hora2;
    // get current year.
    var today = new Date();
    today.getUTCFullYear();
    var year = today.toString().split(" ");
    document.getElementById("fecha").value = year[3] + "-" + fecha.substring(0,2) + "-" + fecha.substring(2,4);
    // Set now time to field "hora1".
    document.getElementById("hora1").value = hora1.substring(0,2) + ":" + hora1.substring(2,4) + ":" + hora1.substring(4,6);
    // Set hour and minutes to field "hora2".
    document.getElementById("hora2").value = hora2.substring(0,2) + ":" + hora2.substring(2,4) + ":" + hora2.substring(4,6);
    }
    else{
        // Change display to block to show the error message.
        document.getElementById("inputAlerta").value = "No es posible analizar el mensaje ISO debido a que no cumple con el formato requerido.";
        document.getElementById("inputAlerta").style.color="white";
        document.getElementById("alerta").style.display = "block";
        document.getElementById("iso05").style.filter = "blur(5px)";
        document.getElementById("respuesta").style.filter = "blur(5px)";
        document.getElementById("navBar").style.filter = "blur(5px)";
        // Countdown one second to hide the error message.
        setTimeout(function(){
            document.getElementById("alerta").style.display = "none";
            document.getElementById("iso05").style.filter = "blur(0px)";
            document.getElementById("respuesta").style.filter = "blur(0px)";
            document.getElementById("navBar").style.filter = "blur(0px)";
        }, 2000);
    }
}

function copyToClipboard(){
    // Copy the text inside the text field
    navigator.clipboard.writeText(datos);
    // Change display to block to show the error message.
    document.getElementById("inputAlerta").value = "Copiado al portapapeles";
    document.getElementById("inputAlerta").style.color="white";
    document.getElementById("alerta").style.display = "block";
    document.getElementById("iso05").style.filter = "blur(5px)";
    document.getElementById("respuesta").style.filter = "blur(5px)";
    document.getElementById("navBar").style.filter = "blur(5px)";
    // Countdown one second to hide the error message.
    setTimeout(function(){
        document.getElementById("alerta").style.display = "none";
        document.getElementById("iso05").style.filter = "blur(0px)";
        document.getElementById("respuesta").style.filter = "blur(0px)";
        document.getElementById("navBar").style.filter = "blur(0px)";
    }, 2000);
}