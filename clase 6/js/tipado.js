const { isNumeric } = require("jquery");

function suma(numero1, numero2) {
    if (isNumeric(numero1) && isNumeric(numero2))
        return numero1 + numero2;
    return null
}

console.log(suma('Hola', 'Mundo'))