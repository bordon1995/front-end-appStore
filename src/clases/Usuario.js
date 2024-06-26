export class Usuario {

    cantidadMinima = 10;

    urlRegistro = `${import.meta.env.VITE_URL_BACKEND}/api/registro`;
    urlgetProductos = `${import.meta.env.VITE_URL_BACKEND}/api/home`

    cart = JSON.parse(localStorage.getItem('carrito')) ?? [];
    productos = [];

    constructor(args = {}) {
        this.usuario = {
            nombre: args.nombre ?? '',
            apellido: args.apellido ?? '',
            correo : args.correo ?? '',
            password : args.password ?? ''
        };
    }

    getUsuario() {
        return this.usuario;
    }

    setUsuario(usuario) {
        this.usuario.id = usuario.id;
        this.usuario.nombre = usuario.nombre;
        this.usuario.apellido = usuario.apellido;
    }

    getCarts() {
        return this.cart;
    }

    setProductos(productos) {
        productos.forEach(ele => {
            ele.cantidad = 0;
        })
        this.productos = [...productos];
    }

    upDateProductos() {
        this.cart.forEach(ele => {
            const upProductos = this.productos.filter(eve => {
                return eve.id !== ele.id

            });
            this.productos = [...upProductos, ele]
        });
    }

    addCart(producto, tipo) {

        if (this.cart.some(ele => ele.id === producto.id)) {
            const upProducto = this.cart.map(eve => {
                if (eve.id === producto.id) {
                    if (tipo === 'left') {
                        eve.disponibilidad = eve.disponibilidad + this.cantidadMinima;
                        eve.cantidad = eve.cantidad - this.cantidadMinima;
                    } else {
                        eve.cantidad = eve.cantidad + this.cantidadMinima;
                        eve.disponibilidad = eve.disponibilidad - this.cantidadMinima;
                    }
                }
                return eve;
            })
            this.cart = [...upProducto];
        } else {
            producto.cantidad = this.cantidadMinima;
            producto.disponibilidad = producto.disponibilidad - this.cantidadMinima;
            producto.usuario_id = this.usuario.id;
            this.cart = [...this.cart, producto];
        
        }
        localStorage.setItem('carrito', JSON.stringify(this.cart));
        return this.cart;
    }

    async main() {
        await this.fetchProductosGET(this.urlgetProductos);
    }

    async add(){
        const respuesta = this.fetchProductosPOST(this.urlRegistro,this.usuario);
        return respuesta;
    }

    async fetchProductosPOST(uri,data){
        try {
            const config = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            }
            const req = await fetch(uri, config);
            const res = await req.json();
            console.log(res)
            return res.respuesta
        } catch (error) {
            console.log(error)
        }
    }

    async fetchProductosGET(uri) {
        const token = localStorage.getItem('token');
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const req = await fetch(uri, config);
            const res = await req.json();
            if(res.respuesta !== null){
                this.setProductos(res.respuesta);
            }
        } catch (error) {
            console.log(error);
        }
    }
}