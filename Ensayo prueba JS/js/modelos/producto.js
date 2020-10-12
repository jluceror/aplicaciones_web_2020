class Producto {
    constructor (codigo, nombre, categoria, precio, cantidad) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.cantegoria = categoria;
        this.precio = precio;
        this.cantidad = cantidad
        this.total = (this.cantidad && this.precio) ? this.cantidad * this.precio : 0;
    }
}