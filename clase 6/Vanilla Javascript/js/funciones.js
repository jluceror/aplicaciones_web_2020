document.addEventListener('DOMContentLoaded', function() {

    let imagenes = document.getElementsByClassName('img-thumbnail');
    if (imagenes.length > 0) {
        for (let imagen of imagenes) {
            imagen.addEventListener('click', function () {
                let source = imagen.getAttribute('src');
                document.getElementById('imagen-grande').setAttribute('src', source);
            })
        }
    }
    
    
});