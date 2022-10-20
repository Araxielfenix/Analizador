function analizarIso05() {
    // Obtener el texto del textarea "mensajeIso" y guardarlo en la variable "IsoMsg".
    var IsoMsg = document.getElementById("mensajeIso").value;
    // Split the IsoMsg by the character " " and save it in the variable "IsoMsgSplit".
    var IsoMsgSplit = IsoMsg.split(" ");
    var codigo1 = IsoMsgSplit[17].substring(16, 20);
    var codigo2 = IsoMsgSplit[17].substring(16, 20);
    var cuatriLlave;
    var long1 = IsoMsgSplit[17].substring(20, 22);
    var long2 = IsoMsgSplit[17].substring(22, 24);
    if(codigo1.substring(0,1) == 0){
        cuatriLlave = 1 + codigo1.substring(1,4) + " " + IsoMsgSplit[17].substring(36, 38) + " " + IsoMsgSplit[17].substring(38, 40) + " " + IsoMsgSplit[17].substring(40, 42);
    }
    var fecha = IsoMsgSplit[17].substring(54, 58);
    var hora1 = IsoMsgSplit[17].substring(58, 64);
    var hora2 = IsoMsgSplit[17].substring(70, 76);
    var tarjeta = IsoMsgSplit[17].substring(106, 124);
    var numeroComercio = IsoMsgSplit[36].substring(8, 15);
    var nombreComercio = IsoMsgSplit[26] + " " + IsoMsgSplit[27] + " " + IsoMsgSplit[30];

    document.getElementById("codigo1").value = codigo1;
    document.getElementById("codigo2").value = codigo2;
    document.getElementById("cuatrillave").value = cuatriLlave;
    document.getElementById("tarjeta").value = tarjeta;
    document.getElementById("numeroComercio").value = numeroComercio;
    document.getElementById("nombreComercio").value = nombreComercio;
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