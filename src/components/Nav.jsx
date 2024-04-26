import useAuth from "../Hooks/useAuth";
import { Link } from "react-router-dom";
// import { useLogin} from "../Hooks/useHook";
// import { pedidos } from "../context/AuthProvaider";

export default function Nav({ usuarioPedidos }) {

  const {addPedido,cart,vaciarCart,addCart} = usuarioPedidos;
  const {auth} = useAuth();
  // const {logoAuth} = useLogin();

  const isEmty = () => cart.length === 0;

  const sendPedidos = async () =>{
    await addPedido(cart);
    vaciarCart();
  }

  const logoAuth = () => {
    localStorage.removeItem('token');
}

  return (
    <div className=" w-full flex justify-between items-center">
      <div className="flex items-center">
        <Link className=" font-black p-2 text-white" to="/home">
          <div className="mx-auto w-8 h-8">
            <img
              className=" w-full h-full"
              src="/img/house-solid.svg"
              alt="imagen"
            />
          </div>
        </Link>
        {auth.respuesta?.administrador === "0" ?
        <Link className=" font-black p-2 text-white" to="/home/mis-pedidos">
          Mis Pedidos
        </Link>
        :
        <Link className=" font-black p-2 text-white" to="/home">
          Mis Productos
        </Link>
        }
        <Link to={"/"}>
        <button
          onClick={() => logoAuth()}
          className=" font-black p-2 text-white"
        >
          Cerrar Sesion
        </button>
        </Link>
        <p className=" underline m-0 p-2 text-white">
          Contacto :{" "}
          <span className=" font-bold text-white">Ciudadela1995@gmail.com</span>
        </p>
      </div>
      
      <dir className="flex">
      {auth.respuesta?.administrador === "1" &&
      <Link to={"/home/mis-clientes"}>
        <button
          onClick={() => vaciarCart()}
          className=" font-black p-2 text-white"
        >
          Mis Clientes
        </button>
        </Link>
      }
      <div className="submenu h-11 w-11 mx-10 ">
        <img
          className=" w-full h-full"
          src="/img/cart2.png"
          alt="imagen"
        />

        <div
          id="carrito"
          className=" hidden bg-white p-1 rounded-xl absolute right-5"
        >
          <div className=" w-96 md:w-[350px]">
            <ul className="list-none">
              <li>
              {isEmty() ? <h1 className="text-center font-bold">El carrito esta vacio</h1> : 
              <>
               <table id="lista-carrito" className=" px-1 w-full">
                  <thead className="w-full text-center">
                    <tr className="">
                      <th>Imagen</th>
                      <th>Nombre</th>
                      <th>Precio</th>
                      <th>Cantidad</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody className="w-full text-center">
                    {cart.map(ele => ( 
                        <tr key={ele.id} className=" border-b border-slate-500">
                          <td>
                            <img
                              className=" h-16 w-16"
                              src={`/img/${ele.imagen}`}
                              alt="imagen"
                            />
                          </td>
                          <td>
                            <p>
                              {ele.nombre}
                            </p>
                          </td>
                          <td>
                            <p>
                              {ele.precio}
                            </p>
                          </td>
                          <td>
                            <div>
                              <p>
                                <button
                                  onClick={() => addCart(ele)}
                                  className="m-1 px-1 border"
                                >
                                  +
                                </button>
                                {ele.cantidad}
                                <button
                                  onClick={() => addCart(ele, "left")}
                                  className="m-1 px-1 border"
                                >
                                  -
                                </button>
                              </p>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <div className="flex justify-between p-2">
                  <button onClick={() => vaciarCart()} className=" bg-gray-400 p-1 px-5 rounded-xl text-white font-bold">
                    Vaciar Carrito
                  </button>
                  <Link to={"/home/mis-pedidos"}>
                  <button onClick={() => sendPedidos(cart)} className=" bg-[#741d51] p-1 px-5 rounded-xl text-white font-bold">
                    Enviar Pedido
                  </button>
                  </Link>
                </div>
                </>
              }
              </li>
            </ul>
          </div>
        </div>
      </div>
      </dir>
    </div>
  );
}
