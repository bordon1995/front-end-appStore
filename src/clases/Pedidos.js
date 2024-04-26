export class Pedidos {

    token = localStorage.getItem('token');
    cantidadMinima = 10;

    urlAddPedidos = `${import.meta.env.VITE_URL_BACKEND}/api/pedido/agregar`;
    urlgetPedido = `${import.meta.env.VITE_URL_BACKEND}/api/pedido`;
    urlUpDatePedido = `${import.meta.env.VITE_URL_BACKEND}/api/editar/pedido`;
    urlRemovePedido =`${import.meta.env.VITE_URL_BACKEND}/api/eliminar/pedido`
    urlgetAllPedidos =`${import.meta.env.VITE_URL_BACKEND}/api/cliente`

    fecha = new Date();
    opciones = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    fechaActual = this.fecha.toLocaleDateString(this.opciones)


    pedidos = [];

    constructor(args = {}) {
        this.pedido = {
            id_usuario : args.usuario_id ?? '',
            id_producto :  args.id ?? '',
            id_estado :  1,
            cantidad_total :  args.cantidad ?? '',
            precio_total :  (args.cantidad * args.precio) ?? '',
            fecha :  this.fechaActual ?? ''
        }
    }

    setUsuario(usuario) {
        this.usuario.id = usuario.id;
        this.usuario.nombre = usuario.nombre;
        this.usuario.apellido = usuario.apellido;
    }

    setPedidos(pedidos) {
        this.pedidos = [...pedidos];
    }

    getPedidos() {
        return this.pedidos;
    }

    upDateCantidad(producto, tipo) {
        const upProducto = this.pedidos.map(eve => {
            if (eve.id === producto.id) {
                if (tipo === 'left') {
                    if(eve.cantidad_total > 0 ){
                        eve.cantidad_total = parseInt(eve.cantidad_total) - this.cantidadMinima;
                        eve.precio_total = (eve.cantidad_total * eve.precio)
                    }
                } else {
                    eve.cantidad_total = parseInt(eve.cantidad_total) + this.cantidadMinima;
                    eve.precio_total = (eve.cantidad_total * eve.precio)
                }
            }
            return eve;
        })
        this.pedidos = [...upProducto];
    }

    setAtributos(array){

        const pedidos = array.map(element => {
            const objeto = new Pedidos(element);
            return objeto.pedido
        });
        return pedidos;
    }

    async main(idUsuario) {
        await this.FecthPedidosPost(this.urlgetPedido, idUsuario);
    }

    async all() {
        await this.FecthPedidosGet(this.urlgetAllPedidos)
    }

    async add(array) {
        const pedidos = this.setAtributos(array);
        await this.FecthPedidosPost(this.urlAddPedidos, pedidos)
    }

    async upDate(pedido){
        await this.FecthPedidosPost(this.urlUpDatePedido, pedido)
    }

    async remove(pedido){
        await this.FecthPedidosPost(this.urlRemovePedido, pedido)
    }

    async FecthPedidosPost(url, data) {
        console.log(this.usuario)
        const token = localStorage.getItem('token');
        try {
            const config = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(data)
            }
            const req = await fetch(url, config);
            const res = await req.json();

            console.log(res)
            if(res.respuesta.length > 0){
                this.setPedidos(res.respuesta)
            } else {
                console.log(res)
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    async FecthPedidosGet(url) {
        try {
            const config = {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.token}`
                }
            }
            const req = await fetch(url, config);
            const res = await req.json();
                this.setPedidos(res.respuesta)
            
        } catch (error) {
            console.log(error)
        }
    }
}