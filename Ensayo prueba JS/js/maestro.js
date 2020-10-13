$(function() {
    let usuarioConectado = localStorage.getItem('UsuarioConectado');
    if (!usuarioConectado) location.replace('index.html');
    usuarioConectado = JSON.parse(usuarioConectado);
    $('#texto-bienvenida').text(`Bienvenido ${usuarioConectado.nombre}`);
    console.log(usuarioConectado);

    var categorias = [
        new Categoria('Procesadores', 'img/procesadores.png'),
        new Categoria('Memorias computador', 'img/ram.svg'), 
        new Categoria('Discos Duros','img/hdd.png'), 
        new Categoria('SSD', 'img/ssd.png')
    ];
    var productos = [
        new Producto('1111', 'Xeon E5', categorias[0], 180000, 3),
        new Producto('2222', 'Amd Athlon', categorias[0], 100000, 6),
    ];

    cargarCategorias();
    cargarProductos();

    $(document).on('change', '#txt-precio, #txt-cantidad', function() {
        let precio = $('#txt-precio').val();
        let cantidad = $('#txt-cantidad').val();
        
        if (precio && cantidad) {
            let total = parseInt(precio) * parseInt(cantidad);
            $('#txt-total').val(total);
        }
    });

    $(document).on('click', '#btn-registrar', function () {
        let cod = $('#txt-cod').val();
        let nombre = $('#txt-nombre').val();
        let cat = $('#cbo-categoria').val();
        let precio = $('#txt-precio').val();
        let cantidad = $('#txt-cantidad').val();

        if (cod && nombre && cat && precio && cantidad) {
            // trabajaremos en el ingreso del producto
            let producto = productos.find(x => x.codigo == cod);
            if (producto) {
                alert('El producto se encuentra registrado con anterioridad');
                return;
            }

            let categoria = categorias.find(x => x.nombre == cat);
            
            if (!categoria) {
                alert('No se ha encontrado la categoría');
                return;
            }

            producto = new Producto(cod, nombre, categoria, precio, cantidad);
            productos.push(producto);
            cargarProductos();
            return;
        }

        alert('Todos los campos son requeridos');
    });

    $(document).on('click', '#btn-buscar', function () {
        let cod = $('#txt-cod').val();
        let producto = productos.find(x => x.codigo == cod);
        if (!producto) {
            alert('El producto no fue encontrado');
            $('#txt-cod').focus();
            return;
        }
        $('#txt-nombre').val(producto.nombre);
        $('#cbo-categoria').val(producto.categoria.nombre);
        $('#txt-precio').val(producto.precio);
        $('#txt-cantidad').val(producto.cantidad);
        $('#txt-total').val(producto.total);
        $('#cbo-categoria').attr('disabled', true);
        $('#txt-nombre').attr('disabled', true);
        $('#txt-cod').attr('disabled', true);
        $('#btn-modificar').attr('disabled', false);
        $('#btn-eliminar').attr('disabled', false);
    });

    $(document).on('click', '#btn-modificar', function () {
        let cod = $('#txt-cod').val();
        let producto = productos.find(x => x.codigo == cod);

        if (!producto) {
            alert('Producto no encontrado');
            return;
        }

        producto.precio = $('#txt-precio').val();
        producto.cantidad = $('#txt-cantidad').val();
        producto.total = parseInt($('#txt-precio').val()) * parseInt($('#txt-cantidad').val());
        alert('Producto actualizado correctamente');
        restablecerFormulario();
        cargarProductos();
    });

    $(document).on('click', '#btn-eliminar', function () {
        let cod = $('#txt-cod').val();
        let producto = productos.find(x => x.codigo == cod);

        if (!producto) {
            alert('Producto no encontrado');
            return;
        }

        productos = productos.filter(x => x.codigo != cod);
        alert('Producto eliminado correctamente');
        restablecerFormulario();
        cargarProductos();
    });

    function restablecerFormulario() {
        $('#btn-modificar').attr('disabled', true);
        $('#btn-eliminar').attr('disabled', true);
        $('#txt-cod').val('');
        $('#txt-nombre').val('');
        $('#cbo-categoria').val('');
        $('#txt-precio').val('');
        $('#txt-cantidad').val('');
        $('#txt-total').val('');
        $('#cbo-categoria').attr('disabled', false);
        $('#txt-nombre').attr('disabled', false);
        $('#txt-cod').attr('disabled', false);
    }


    function cargarCategorias() {
        let html = `<option value=''>Seleccione una opción</option>`;
        for (let categoria of categorias) {
            html += `<option value='${categoria.nombre}'>${categoria.nombre}</option>`;
        }
        $('#cbo-categoria').html(html);
    }

    function cargarProductos() {
        if (productos.length > 0) {
            let html = '';
            let total = 0;
            for (producto of productos) {
                html += `
                    <tr>
                        <td>
                            <img width='50' src='${producto.categoria.logo}' />                
                        </td>
                        <td>${producto.codigo}</td>
                        <td>${producto.nombre}</td>
                        <td>${producto.precio}</td>
                        <td>${producto.cantidad}</td>
                        <td>${producto.total}</td>
                    </tr>
                `;
                total += producto.total;
            }

            $('#productos').html(html);
            $('#cantidad-productos').text(`CANTIDAD: ${productos.length}`);
            $('#total-productos').text(`TOTAL: ${total}`);
        }
    }

});