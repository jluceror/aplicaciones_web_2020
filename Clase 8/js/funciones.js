
$(document).ready(function () {
    var sexo = '';

    //mostrarResultado('','','','','','');

    $(document).on('change', '.op-sex',   function ()  {
        sexo = $(this).val()
    })

    $(document).on('click', '#btn-registrar',  () => {
        registrar();
    })

    $(document).on('keypress', '#txt-rut', function() {
        if ($(this).val().length == 3)
                $(this).val($(this).val()+'.')
    });


    function registrar() {
        let rut = $('#txt-rut').val();
        let nombre = $('#txt-nombre').val();
        let nacimiento = $('#txt-fnacimiento').val();
        let carrera = $('#cbo-carrera').val();
        let promedio = $('#txt-prom').val();

        if (rut && nombre && nacimiento && carrera && promedio && sexo) {
            mostrarResultado(rut, nombre, nacimiento, carrera, promedio, sexo)
        }

        
    }

    function mostrarResultado(rut, nombre, nacimiento, carrera, promedio, sexo){
        let textoHtml = `<tr>
                            <th>RUT:</th>
                            <td>${rut}</td>
                        </tr>
                        <tr>
                            <th>NOMBRE:</th>
                            <td>${nombre}</td>
                        </tr>
                        <tr>
                            <th>SEXO:</th>
                            <td>${sexo}</td>
                        </tr>
                        <tr>
                            <th>FECHA NACIMIENTO:</th>
                            <td>${nacimiento}</td>
                        </tr>
                        <tr>
                            <th>CARRERA:</th>
                            <td>${carrera}</td>
                        </tr>
                        <tr>
                            <th>PROMEDIO:</th>
                            <td>${promedio}</td>
                        </tr>`;
            $('#tabla-resultado').html(textoHtml)
    }

   
});

