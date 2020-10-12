$(function () {

    var usuarios = [
        new Usuario('Juan Perez','jperez@gmail.com', '123456'),
        new Usuario('Jhon Doe','jdoe@gmail.com', '12345678')
    ];


    $(document).on('focusout', '#txt-email', function() {
        let email = $(this).val();

        if (!validarEmail(email)) {
            $(this).focus();
            $('#txt-valida-email').text(`El Email ${email} no es válido`)
            return;
        }
        $('#txt-valida-email').text('')

    });

    $(document).on('click', '#btn-login', function () {
        let email = $('#txt-email').val();
        let contrasena = $('#txt-contrasena').val();

        if (email && contrasena) {
            let usuario = usuarios.find(x => x.email == email && x.contrasena == contrasena);
            if (!usuario) {
                alert('Las credenciales ingresada no son correctas');
                return;
            }

            localStorage.setItem('UsuarioConectado', JSON.stringify(usuario));
            location.replace('maestro.html');
            return;
        } 

        alert('El campo Email y Contraseña son requeridos');
    });

    function validarEmail(email) {
        return /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(email)
    }
   
});