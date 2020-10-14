$(function() {
    var categorias = [
        new Categoria('Procesadores', 'img/procesadores.png'),
        new Categoria('Memorias computador', 'img/ram.svg'), 
        new Categoria('Discos Duros','img/hdd.png'), 
        new Categoria('SSD', 'img/ssd.png')
    ];

    var productos = [
        new Producto('1111','Procesador Ryzen 3600', categorias[0], 220000, 10),
        new Producto('2222','Ram DDR4 3000 mhz', categorias[1], 70000, 15),
    ];

    cargarCategorias();
    cargarProductos();

    let usuarioConectado = localStorage.getItem('UsuarioConectado');


    if (!usuarioConectado) {
        location.replace('index.html');
        return;
    }

    $(document).on('click', '#btn-buscar', function () {
        let cod = $('#txt-cod').val();
        let producto = productos.find(x => x.codigo == cod);

        if (producto) {
            $('#txt-nombre').val(producto.nombre);
            $('#cbo-categoria').val(producto.categoria.nombre);
            $('#txt-precio').val(producto.precio);
            $('#txt-cantidad').val(producto.cantidad);
            $('#txt-total').val(parseInt($('#txt-precio').val()) * parseInt($('#txt-cantidad').val()));

            $('#btn-modificar').attr('disabled', false);
            $('#btn-eliminar').attr('disabled', false);
            $('#btn-registrar').attr('disabled', true);
            $('#cbo-categoria').attr('disabled', true);
            $('#txt-nombre').attr('disabled', true);
            $('#txt-cod').attr('disabled', true);
        }
    });

    $(document).on('click', '#btn-modificar', function () {
        let cod = $('#txt-cod').val();
        let producto = productos.find(x => x.codigo == cod);
        if (!producto) {
            alert('El producto a modificar no se encuentra registrado');
            return;
        }

        producto.precio = $('#txt-precio').val();
        producto.cantidad = $('#txt-cantidad').val();
        producto.total = producto.precio * producto.cantidad;
        cargarProductos();
        limpiarFormulario();
    });

    $(document).on('change', '#txt-precio,#txt-cantidad', function () {
        let precio = $('#txt-precio').val();
        let cantidad = $('#txt-cantidad').val();

        if (precio && cantidad) {
            $('#txt-total').val(precio * cantidad);
            return;
        }

        $('#txt-total').val('');
    });

    $(document).on('click', '#btn-eliminar', function () {
        let cod = $('#txt-cod').val();
        let producto = productos.find(x => x.codigo == cod);
        if (!producto) {
            alert('El producto a eliminar no se encuentra registrado');
            return;
        }

        productos = productos.filter(x => x.codigo != cod);
        alert('Producto eliminado correctamente');
        cargarProductos();
        limpiarFormulario();

    });

    $(document).on('click', '#btn-registrar', function() {
        let precio = $('#txt-precio').val();
        let cantidad = $('#txt-cantidad').val();
        let nombre = $('#txt-nombre').val();
        let cod = $('#txt-cod').val();
        let cat = $('#cbo-categoria').val()
        let categoria = categorias.find(x => x.nombre == cat);
        if (!categoria) {
            alert('La categoría ingresada no existe');
            return;
        }
        let producto = productos.find(x => x.codigo == cod);
        if (producto) {
            alert(`El producto ${cod} ya se encuentra registrado`);
            return;
        }

        if (precio && cantidad  && nombre) {
            producto = new Producto(cod, nombre, categoria,precio, cantidad);
            productos.push(producto);
            cargarProductos();
            limpiarFormulario();
        }
    });

    function limpiarFormulario() {
        $('#txt-precio').val('');
        $('#txt-cantidad').val('');
        $('#txt-nombre').val('');
        $('#txt-cod').val('');
        $('#txt-total').val('');
        $('#cbo-categoria').val('')
        $('#btn-modificar').attr('disabled', true);
        $('#btn-eliminar').attr('disabled', true);
        $('#btn-registrar').attr('disabled', false);
        $('#txt-cod').attr('disabled', false);
        $('#txt-nombre').attr('disabled', false);
        $('#cbo-categoria').attr('disabled', false);
    }

    usuarioConectado = JSON.parse(usuarioConectado);

    $('#mensaje-bienvenida').text(`Bienvenido ${usuarioConectado.nombre}`);




    function cargarCategorias() {
        let html = `<option value=''>Seleccione una opción</option>`;
        for (let categoria of categorias) {
            html += `<option value='${categoria.nombre}'>${categoria.nombre}</option>`;
        }
        $('#cbo-categoria').html(html);
    }

    function cargarProductos() {
        if (productos.length > 0) {
            let total = 0;
            let html = '';
            for (producto of productos) {
                html += `
                    <tr>
                        <td>
                            <img width='40' src='${producto.categoria.logo}' />
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
            $('#lista-productos').html(html);
            $('#cantidad-productos').text(`CANTIDAD: ${productos.length}`);
            $('#total-productos').text(`TOTAL: ${total}`);
        }
    }

});