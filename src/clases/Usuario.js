export class Usuario {

    token = localStorage.getItem('token');
    cantidadMinima = 10;

    urlRegistro = `${import.meta.env.VITE_URL_BACKEND}/api/registro`;
    urlgetProductos = `${import.meta.env.VITE_URL_BACKEND}/api/home`

    cart = JSON.parse(localStorage.getItem('carrito')) ?? [];
    productos = [];
    prueva = '';

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
            this.cart = [...this.cart, producto];
        
        }
        localStorage.setItem('carrito', JSON.stringify(this.cart));
        return this.cart;
    }

    async main() {
        await this.fetchProductosGET(this.urlgetProductos);
    }

    async add(usuario){
        const newUsuario = new Usuario(usuario);
        const respuesta = this.fetchProductosPOST(this.urlRegistro,newUsuario.usuario);
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
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.token}`
                }
            }

            const req = await fetch(uri, config);
            const res = await req.json();
            console.log(res);
            if(res.respuesta !== null){
                this.setProductos(res.respuesta);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async pruevaget() {
        try {
            const req = await fetch(`${import.meta.env.VITE_URL_BACKEND}/api`);
            const res = await req.json();
            console.log(res);
            this.prueva = res;
        } catch (error) {
            console.log(error);
        }
    }
}