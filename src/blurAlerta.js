import { analizarIso05 } from "./analizarIso.js";
import { copiar } from "./copiarTexto.js";
import { datos } from "./llenarInputs.js";

export function blur() {
    var time = 2000;
    // Use switch case to handle multiple events from same element.
    switch (event.target.id) {
        case "copiar":
            if (document.getElementById("numeroComercio").value != "") {
                copiar(datos);
                document.getElementById("textoAlerta").innerHTML = "Copiado al portapapeles";
            }
            alerta(time);
            break;
        case "analizarButton":
            if (document.getElementById("textAreaIso").value == "") {
                document.getElementById("textoAlerta").innerHTML = "No se ha ingresado un mensaje ISO";
                alerta(time);
            } else if (document.getElementById("textAreaIso").value.length <= 700) {
                time = 3600;
                document.getElementById("textoAlerta").innerHTML = "No es posible analizar el mensaje ISO debido a que no cumple con el formato requerido.";
                alerta(time);
            } else {
                console.log(document.getElementById("textAreaIso").value.length);
                analizarIso05();
            }
            break;
    }
}

function alerta(time) {
    blurFields();
    document.getElementById("analizarButton").classList.add("invisible");
    document.getElementById("divAlerta").classList.remove("hidden");
    document.getElementById("divAlerta").classList.add("flex");
    setTimeout(function () {
        document.getElementById("divAlerta").classList.remove("flex");
        document.getElementById("divAlerta").classList.add("hidden");
        document.getElementById("analizarButton").classList.remove("invisible");
        unblurFields();
    }, time);
}

function blurFields() {
    document.getElementById("navBar").classList.add("blur-sm");
    document.getElementById("textAreaIso").classList.add("blur-sm");
    document.getElementById("divInputs").classList.add("blur-sm");
}

function unblurFields() {
    document.getElementById("navBar").classList.remove("blur-sm");
    document.getElementById("textAreaIso").classList.remove("blur-sm");
    document.getElementById("divInputs").classList.remove("blur-sm");
}