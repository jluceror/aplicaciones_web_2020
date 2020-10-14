$(function () {
    var usuarios = [
        new Usuario('jperez@gmail.com', 'Juan Perez', '123456'),
        new Usuario('jdoe@gmail.com', 'Jhon Doe', '12345678'),
    ];

    $(document).on('click', '#btn-login', function () {
        let email = $('#txt-email').val();
        let contrasena = $('#txt-contrasena').val();

        if (email && contrasena) {
            // se procede con el login
            let usuario = usuarios.find(x => x.email == email && x.contrasena == contrasena);
            if (!usuario) {
                alert('Las credenciales ingresadas no son válidas');
                return;
            }

            localStorage.setItem('UsuarioConectado', JSON.stringify(usuario));
            location.replace('maestro.html');
            return;
        }
        alert('El email y la contraseña son requeridos');

    });

    $(document).on('focusout', '#txt-email', function () {
        let email = $('#txt-email').val();
        if (!validarEmail(email)) {
            $(this).focus();
            $('#validacion-email').text(`El email ${email} no es correcto.`);
            return;
        }
        $('#validacion-email').text(``);
    });

    function validarEmail (email) {
        return /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(email)
    }
});