$(document).ready( function () {
    let marcas = [
        {nombre: 'Honda'},
        {nombre: 'Ford'},
        {nombre: 'Hyundai'},
        {nombre: 'Kia'}
    ]
    let vehiculos = [];
    dibujarVehiculos();
    let htmlTexto = `<option value=''>Seleccione una marca</option>`;

    for(let marca of marcas) {
       htmlTexto += `<option value='${marca.nombre}'>${marca.nombre}</option>`;
    }
    $('#cboMarca').html(htmlTexto);


    $(document).on('click', '#btnGuardar',  () => {
        let patente = $('#txtPatente').val();
        let marca = $('#cboMarca').val();
        let ano = $('#txtAno').val();
        if (patente && marca && ano) {
            let consultaPatente = vehiculos.find(x => x.patente == patente);
            if (consultaPatente) {
                consultaPatente.marca = marca;
                consultaPatente.ano = ano;
                dibujarVehiculos();
                limpiarFormulario();
                return;
            } 
            let vehiculo = new Vehiculo(patente, marca, ano);
            vehiculos.push(vehiculo);
            limpiarFormulario();
            dibujarVehiculos();
        }
    });

    $(document).on('click', '.btnModificar', function () {
        let patente = $(this).data('patente');
        let vehiculo = vehiculos.find(x => x.patente == patente);
        $('#txtPatente').val(vehiculo.patente);
        $('#cboMarca').val(vehiculo.marca);
        $('#txtAno').val(vehiculo.ano);

    });

    $(document).on('change', '#txtPatente', function() {
        let patente = $(this).val();
        let vehiculo = vehiculos.find(x => x.patente == patente);
        if (vehiculo) {
            $('#btnGuardar').text('Actualizar')
            $('#btnGuardar').removeClass('btn-primary')
            $('#btnGuardar').addClass('btn-success')
        } else {
            $('#btnGuardar').text('Guardar')
            $('#btnGuardar').removeClass('btn-success')
            $('#btnGuardar').addClass('btn-primary')
        }
    })

    $(document).on('click', '.btnEliminar', function() {
        let patente = $(this).data('patente');
        vehiculos = vehiculos.filter(x => x.patente != patente);
        dibujarVehiculos();
    });


    function dibujarVehiculos() {
        let textHtml = '';
        if (vehiculos.length == 0) {
            textHtml = `<tr>
                            <td colspan='4'>
                                <div class="alert alert-warning" role="alert">
                                    No se han registrado Vehiculos
                                </div>
                            <td/>
                        </tr>`;
            $('#listaVehiculos').html(textHtml);
            return;
        } 

        for(let vehiculo of vehiculos) {
            textHtml += `<tr>
                            <td>${vehiculo.patente}</td>
                            <td>${vehiculo.marca}</td>
                            <td>${vehiculo.ano}</td>
                            <td>
                                <button class='btn btn-info btnModificar' data-patente='${vehiculo.patente}'>Modificar</button>
                                <button class='btn btn-danger btnEliminar' data-patente='${vehiculo.patente}'>Eliminar</button>
                            </td>
                        </tr>`;
        }

        $('#listaVehiculos').html(textHtml);
    }

    function limpiarFormulario() {
        $('#txtPatente').val('');
        $('#cboMarca').val('');
        $('#txtAno').val('');
    }

    

})