let pregunta = prompt('Ingresa tu opción: piedra, papel o tijera')
let opUsuario = pregunta.toLowerCase()

let opciones = ['piedra', 'papel', 'tijera'];
let buscarOpcion = opciones.find(x => x == opUsuario);

if (!buscarOpcion) {
    alert('No ha ingresado una alternativa correcta')
    location.reload(1)
}

let opcionMaquina = opciones[Math.floor(Math.random() * 3)]; // 2.5 3

switch (true) {
    case (opUsuario == opcionMaquina):
        console.log('Esto es un empate');
        break;
    case (opcionMaquina === 'piedra' && opUsuario === 'papel'):
        console.log('Ganaste!!')
        break;
    case (opcionMaquina === 'papel' && opUsuario === 'tijera'):
        console.log('Ganaste!!')
        break;
    case (opcionMaquina === 'tijera' && opUsuario === 'piedra'):
        console.log('Ganaste!!')
        break;
    default:
        console.log('Perdiste!!')
}
