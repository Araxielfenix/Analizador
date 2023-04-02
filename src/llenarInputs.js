export let datos = "";
export function llenarCampos(codigo1, codigo2, cuatriLlave, tarjeta, numeroComercio, nombreComercio, folio, monto, fecha, hora1, hora2) {
    document.getElementById("codigo1").value = codigo1;
    document.getElementById("codigo2").value = codigo2;
    document.getElementById("cuatrillave").value = cuatriLlave;
    document.getElementById("tarjeta").value = tarjeta;
    document.getElementById("numeroComercio").value = numeroComercio;
    document.getElementById("nombreComercio").value = nombreComercio;
    document.getElementById("folio").value = folio;
    document.getElementById("monto").value = "$" + monto;
    // get current year.
    var today = new Date();
    var year = today.getUTCFullYear();
    document.getElementById("fecha").value = year + "-" + fecha.substring(0, 2) + "-" + fecha.substring(2, 4);
    // Set now time to field "hora1".
    document.getElementById("hora1").value = hora1.substring(0, 2) + ":" + hora1.substring(2, 4) + ":" + hora1.substring(4, 6);
    // Set hour and minutes to field "hora2".
    document.getElementById("hora2").value = hora2.substring(0, 2) + ":" + hora2.substring(2, 4) + ":" + hora2.substring(4, 6);
    // Show button "copiar".
    document.getElementById("copiar").classList.remove("hidden");
    document.getElementById("copiar").classList.add("inline-block");
    // Store data in variable "datos".
    datos = "Código: " + codigo1 + "\n" + "Código de respuesta: " + codigo2 + "\n" + "Cuatrillave: " + cuatriLlave + "\n" + "Tarjeta: " + tarjeta + "\n" + "Número de comercio: " + numeroComercio + "\n" + "Nombre de comercio: " + nombreComercio + "\n" + "Folio: " + folio + "\n" + "Monto: $" + monto + "\n";
    datos += "fecha: " + document.getElementById("fecha").value + "\n" + "hora1: " + document.getElementById("hora1").value + "\n" + "hora2: " + document.getElementById("hora2").value;
}