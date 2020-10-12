$(function() {
    var categorias = [
        'Procesadores', 'Memorias computador', 'Discos Duros', 'SSD'
    ];

    cargarCategorias();




    function cargarCategorias() {
        let html = `<option value=''>Seleccione una opción</option>`;
        for (let categoria of categorias) {
            html += `<option value='${categoria}'>${categoria}</option>`;
        }
        $('#cbo-categoria').html(html);
    }

});