import { useState } from "react";
import {Usuario} from "../clases/Usuario.js";
import { Pedidos } from "../clases/Pedidos.js";

export const usuario = new Usuario();
const pedidos = new Pedidos();

const urlConfirmarToken = `${import.meta.env.VITE_URL_BACKEND}/api/confirmar-cuenta/`;
const urlLogin = `${import.meta.env.VITE_URL_BACKEND}/api`;

export function useRegistro() {

    const [useUsuario, setUsuario] = useState({
        nombre: '',
        apellido: '',
        correo: '',
        password: '',
        resetPassword: ''
    });

    const [msg, setMsg] = useState({});

    const handleChange = (e) => {
        setUsuario({
            ...useUsuario,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = async e => {

        e.preventDefault();

        const { nombre, apellido, correo, password, resetPassword } = useUsuario;

        setMsg({});

        const isemty = [nombre, apellido, correo, password, resetPassword];

        if (isemty.includes('')) {
            setMsg({ mensaje: 'Todos los campos son obligatorios', typo: true });
            return
        }
        if (password.length < 6) {
            setMsg({ mensaje: 'El password debe contener minimo 6 caracteres', typo: true });
            return
        }
        if (password !== resetPassword) {
            setMsg({ mensaje: 'El password es incorrecto', typo: true });
            return
        }

        const newUser = new Usuario(useUsuario);
        const respuesta = await newUser.add();
        setMsg({ mensaje: `${respuesta}`, typo: false });

    }

    return {
        handleChange,
        handleSubmit,
        msg,
        useUsuario,
    }
}

//-------------------------------------------

export function useConfirmarCuenta() {

    const [msg, setMsg] = useState({});
    const [cargando, setCargando] = useState(true);

    const request = async (params) => {
        try {
            cargando
            const res = await requestFetch(urlConfirmarToken + params.token)

            setMsg({ mensaje: res.respuesta, typo: false })
        } catch (error) {
            setMsg({ mensaje: 'Hubo un error al intenter confirmar su cuenta intentelo nueva mente', typo: true })
        }
        setCargando(false);
    }

    return {
        request,
        msg,
        cargando,
    }
}

//------------------------------------------------

export function useLogin() {

    const [useUsuario, setUsuario] = useState({
        password: '',
        correo: ''
    });

    const [msg, setMsg] = useState({});

    const handleChange = (e) => {
        setUsuario({
            ...useUsuario,
            [e.target.id]: e.target.value
        });
    }

    const handleSubmit = async () => {

        const { correo, password } = useUsuario;

        const isEmty = [correo, password];

        if (isEmty.includes('')) {
            setMsg({ mensaje: 'Todos los campos son obligatorios', typo: true });
            return false
        }

        if (password.length < 6) {
            setMsg({ mensaje: 'El password debe contener minimo 6 caracteres', typo: true });
            return false
        }

        try {

            const object = new FormData();
            object.append('correo', correo);
            object.append('password', password);

            const req = await fetch(urlLogin, {
                method: 'POST',
                body: object
            })
            const res = await req.json()
            localStorage.setItem('token', res.token);
            usuario.usuario.id = res.respuesta.id;
            console.log(usuario);
            return res;
        } catch (error) {
            setMsg({ mensaje: 'Error al intentar registrar la cuenta' })
        }
    }

    return {
        handleChange,
        useUsuario,
        handleSubmit,
        msg,
    }
}

//------------------------------------------------------------

export function useCart() {

    const [productos, setProductos] = useState([]);
    const [cart, setCart] = useState([]);

    const appInit = async () => {
        await usuario.main();
        if (JSON.parse(localStorage.getItem('carrito')) !== null) {
            setCart([...usuario.getCarts()]);
            usuario.upDateProductos()
        }
        setProductos([...usuario.productos])
    }

    const addCart = (producto, tipo = 'suma') => {
        setCart([...usuario.addCart(producto, tipo)]);
    }


    const vaciarCart = () => {
        productos.forEach(ele => {
            ele.disponibilidad = ele.disponibilidad + ele.cantidad
            ele.cantidad = 0
        })
        usuario.cart = [];
        setCart([]);
        setProductos([...productos]);
        localStorage.removeItem('carrito');
    }

    return {
        appInit,
        addCart,
        cart,
        productos,
        vaciarCart,
    }
}

//--------------------------------------------------

export function usePedidos() {

    const [pedido, setPedido] = useState([]);
    const [change, setChange] = useState([]);

    const getPedidos = async () => {
        console.log(usuario.usuario)
        await pedidos.main(usuario.usuario);
        setPedido([...pedidos.getPedidos()])
    }

    const upCantidad = (producto, tipo) => {
        pedidos.upDateCantidad(producto, tipo);
        setPedido([...pedidos.pedidos])
    }

    const setData = (objeto) => {
        if (!change.includes(objeto)) {
            setChange([...change, objeto]);
        } else {
            const array = change.filter(ele => ele !== objeto)
            console.log(array)
            setChange([...array]);
        }
    }
    const addPedido = (cart) => {
        pedidos.add(cart);
    }

    const fetchUpPedido = (pedido) => {
        pedidos.upDate(pedido);
        setData(pedido.id);
    }

    const deletePedido = (objeto) => {
        const upArray = pedido.filter(ele => ele.id !== objeto.id);
        pedidos.remove(objeto);
        setPedido([...upArray]);
    }

    return {
        getPedidos,
        pedido,
        upCantidad,
        fetchUpPedido,
        setData,
        change,
        addPedido,
        deletePedido,
    }
}

export function useClientes() {

    const [clientes, setClientes] = useState([]);
    const [change, setChange] = useState([]);
    const [id, setId] = useState([]);
    const [remove, setRemove] = useState([]);
    const options =
        [
            { label: "En espera", value: "1" },
            { label: "En proceso de fabricacion", value: "2" },
            { label: "En proceso de envio", value: "3" },
            { label: "Finalizado", value: "4" }
        ]

    const init = async () => {
        await pedidos.all();
        setClientes([...pedidos.getPedidos()])
    }

    const handelChange = (eve, objeto) => {
        const isset =() => change.some(val => val.id_pedido === objeto.id);

        if(eve.target.value === objeto.id_estado){
            const upId = id.filter(val => val !== objeto.id);
            setId([...upId]);
        } else if(!id.includes(objeto.id)) {
            setId([...id,objeto.id]);
        }

        if(isset()){
            const upArray = change.map(ele => {
                if(ele.id_pedido === objeto.id){
                    ele.id_estado = eve.target.value;
                };
                return ele;
            });
            setChange([...upArray])
        } else {
            setChange([...change,{id_estado:eve.target.value,id_pedido:objeto.id}]);
        }

        if (eve.target.value === "4") {
            setRemove([...remove,objeto.id]);
        } else {
            const upRemove = remove.filter(val => val !== objeto.id);
            setRemove([...upRemove]);
        };

        options.map(ele => {
            if (ele.value === eve.target.value) {
                objeto.estado = ele.label;
            };
        });
    }

    const upDatePedido = async (pedido) => {
        const upPedido = change.map(ele => {
            if(ele.id_pedido === pedido.id){
                pedido.id_estado = ele.id_estado;
            };
            return ele;
        });

        await pedidos.upDate(pedido);
        const upId = id.filter(val => val !== pedido.id);
        setId([...upId]);
        setChange([...upPedido])
    }

    const removePedido = (objeto) => {
        console.log('eliminando' + ' ' + objeto.id);
    }

    return {
        init,
        clientes,
        handelChange,
        change,
        options,
        remove,
        removePedido,
        upDatePedido,
        id,
    }
}

//FUNCIONES HELPPERS---------------------

async function requestFetch(uri) {
    try {
        const req = await fetch(uri);
        const res = await req.json();
        return res;
    } catch (error) {
        console.log(error);
    };
}