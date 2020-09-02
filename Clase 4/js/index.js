document.addEventListener("DOMContentLoaded", function() {
    mostarMenu();
});

function mostarMenu () {
    let miMenu = document.getElementById('mi_menu');
    let items = [
    {
        enlace: 'bienvenida.html',
        texto: 'BIENVENIDA'
    }, 
    {
        enlace: 'perritos.html',
        texto: 'PERRITOS'
    },
    {
        enlace: 'gatitos.html',
        texto: 'GATITOS'
    },
    {
        enlace: 'contactenos.html',
        texto: 'CONTACTENOS'
    },
    {
        enlace: 'preguntas.html',
        texto: 'PREGUNTAS FRECUENTES'
    }];
    let contenidoHtml = "";

    for (let item of items) {
        contenidoHtml += `<li><a href="${item.enlace}">${item.texto}</a></li>`;
    }
    miMenu.innerHTML = contenidoHtml;
}