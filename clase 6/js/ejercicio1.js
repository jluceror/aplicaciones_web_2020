$(document).ready(function () {
    $(document).on('click', '.imagen-a-seleccionar', function () {
        let rutaImagen = $(this).attr('src'); // .img-thumbnail span -> undefined || null
        $('#imagen-grande').attr('src', rutaImagen)
    })
});