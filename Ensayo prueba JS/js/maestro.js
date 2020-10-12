$(function() {
    var categorias = [
        new Categoria('Procesadores', 'img/procesadores.png'),
        new Categoria('Memorias computador', 'img/ram.svg'), 
        new Categoria('Discos Duros','img/hdd.png'), 
        new Categoria('SSD', 'img/ssd.png')
    ];

    cargarCategorias();




    function cargarCategorias() {
        let html = `<option value=''>Seleccione una opción</option>`;
        for (let categoria of categorias) {
            html += `<option value='${categoria.nombre}'>${categoria.nombre}</option>`;
        }
        $('#cbo-categoria').html(html);
    }

});